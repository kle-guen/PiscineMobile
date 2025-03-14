import React, {useEffect, useState} from "react";
import {ImageBackground, Keyboard, StatusBar, StyleSheet, TextInput} from "react-native";
import {Appbar, BottomNavigation} from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Location from "expo-location"
import ApiService from "../services/api";
import CurrentlyScreen from "./index";
import TodayScreen from "./today";
import WeeklyScreen from "./weekly";
import CityList from "../components/CityList";
import palette from "@/app/theme/palette";

export default function TabLayout() {
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [weather, setWeather] = useState([]);
	const [status, setStatus] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [location, setLocation] = useState(null);
	const [cityList, setCityList] = useState([]);
	const [isSwipeEnabled, setIsSwipeEnabled] = useState(true);
	const apiService = new ApiService();
	const [isKeyboardFocused, setKeyboardFocused] = useState(false);

	const [routes] = useState([
		{key: "currently", title: "Currently", focusedIcon: "clock"},
		{key: "today", title: "Today", focusedIcon: "calendar-today"},
		{key: "weekly", title: "Weekly", focusedIcon: "calendar-week"},
	]);

	useEffect(() => {
		(async () => {
			await handleGeolocation();
		})();
	}, []);

	useEffect(() => {
		const keyboardFocusedListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardFocused(true));
		const keyboardUnfocusedListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardFocused(false));
		return () => {
			keyboardFocusedListener.remove();
			keyboardUnfocusedListener.remove();
		};
	}, []);

	const handleGeolocation = async () => {
		try {
			const {status} = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setStatus(false);
				setErrorMessage("Geolocation is not available, please enable it in your App settings.");
				return;
			}
			const location = await Location.getLastKnownPositionAsync({});
			const weatherData = await getWeatherData(location.coords.latitude, location.coords.longitude);
			setWeather(weatherData);
			setLocation('Your position');
		} catch (error) {
			setStatus(false);
			setErrorMessage("Geolocation is not available, please enable it in your App settings.");
		}
	};

	const handleSearch = async (text) => {
		try {
			setSearchText(text);
			if (text.length > 1) {
				let data = await apiService.getSearchResults(text);
				setCityList(data.results ?? []);
			} else {
				setCityList([]);
			}
		} catch (error) {
			setStatus(false);
			setErrorMessage("The service connexion is lost, please check your internet connexion or try again later.");
		}
	}

	const handleSelectCity = async (city) => {
		try {
			if (searchText.length < 1) return;
			if (cityList.length < 1) {
				if (status) {
					setStatus(false);
					setErrorMessage("Could not find any result for the supplied address");
				}
				return;
			}
			if (city == null) {
				city = cityList[0];
			}
			const text = city.admin1 ? city.name + "\n" + city.admin1 + "\n" + city.country :
				city.country ? city.name + "\n" + city.country : city.name;
			setLocation(text);
			const weatherData = await getWeatherData(city.latitude, city.longitude);
			setWeather(weatherData);
			setKeyboardFocused(false);
			Keyboard.dismiss();
		} catch (error) {
			setStatus(false);
			setErrorMessage("The service connexion is lost, please check your internet connexion or try again later.");
		}
	}

	const getWeatherData = async (lat, lon) => {
		try {
			const dataToday = await apiService.getTodayWeather(lat, lon);
			const dataWeekly = await apiService.getWeeklyWeather(lat, lon);
			setStatus(true);
			return [dataToday, dataWeekly];
		} catch (error) {
			setStatus(false);
			setErrorMessage("The service connexion is lost, please check your internet connexion or try again later.");
		}
	}

	const renderScene = ({route}) => {
		switch (route.key) {
			case "today":
				return <TodayScreen location={location} status={status} errorMessage={errorMessage}
									weatherData={weather} setIsSwipeEnabled={setIsSwipeEnabled}/>;
			case "weekly":
				return <WeeklyScreen location={location} status={status} errorMessage={errorMessage}
									 weatherData={weather} setIsSwipeEnabled={setIsSwipeEnabled}/>;
			default:
				return <CurrentlyScreen location={location} status={status} errorMessage={errorMessage}
										weatherData={weather}/>;
		}
	};

	return (
		<ImageBackground source={require("../../assets/images/weather-app-bg.jpg")} style={styles.fullScreen}>
			<StatusBar hidden={true}/>
			<Appbar.Header style={styles.appBar}>
				<Appbar.Action disabled={searchText == null || searchText.length < 1} color={"white"} icon="magnify"
							   size={30}
							   onPress={() => {
								   handleSelectCity(null);
								   Keyboard.dismiss();
							   }}/>
				<TextInput
					style={styles.input}
					placeholder="Search location"
					onSubmitEditing={() => handleSelectCity(null)}
					onChangeText={(text) => handleSearch(text)}
					cursorColor={palette.white}
					placeholderTextColor={palette.light}
				/>
				<Appbar.Action icon="crosshairs-gps" onPress={handleGeolocation} color={palette.primary} size={30}/>
			</Appbar.Header>

			{searchText.length >= 1 &&
				<CityList cities={cityList} isKeyboardFocused={isKeyboardFocused} searchText={searchText}
						  onPress={handleSelectCity}/>}

			{(!isKeyboardFocused || searchText.length < 1) &&
				<GestureRecognizer
					onSwipeLeft={() => isSwipeEnabled && setIndex((index + 1) % routes.length)}
					onSwipeRight={() => isSwipeEnabled && setIndex((index + routes.length - 1) % routes.length)}
					style={styles.flexContainer}
					onTouchEnd={() => setIsSwipeEnabled(true)}
				>
					{renderScene({route: routes[index]})}
				</GestureRecognizer>
			}

			<BottomNavigation
				navigationState={{index, routes}}
				onIndexChange={setIndex}
				renderScene={() => null}
				barStyle={{backgroundColor: palette.transparent}}
				style={styles.barStyle}
				activeColor={palette.secondary}
				inactiveColor={palette.lightGrey}
				theme={{colors: {secondaryContainer: palette.transparent}}}
			/>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	appBar: {
		backgroundColor: palette.transparent,
	},
	input: {
		flex: 1,
		backgroundColor: palette.transparent,
		borderRadius: 5,
		height: 40,
		color: palette.white,
		fontSize: 18,
		borderBottomWidth: 1,
		borderBottomColor: palette.light,
	},
	fullScreen: {
		flex: 1,
		backgroundColor: palette.transparent,
	},
	flexContainer: {
		flex: 1,
		backgroundColor: palette.transparent,
	},
	barStyle: {
		flex: 0
	},
	cityList: {
		flex: 1
	},
});
