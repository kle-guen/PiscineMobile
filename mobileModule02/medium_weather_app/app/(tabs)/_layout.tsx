import React, {useEffect, useState} from "react";
import {Keyboard, StyleSheet, TextInput, View} from "react-native";
import {Appbar, BottomNavigation} from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Location from "expo-location"
import ApiService from "../services/api";
import CurrentlyScreen from "./index";
import TodayScreen from "./today";
import WeeklyScreen from "./weekly";
import CityList from "../components/CityList";

export default function TabLayout() {
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [weather, setWeather] = useState([]);
	const [status, setStatus] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [location, setLocation] = useState(null);
	const [cityList, setCityList] = useState([]);
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
			const location = await Location.getCurrentPositionAsync({});
			const weatherData = await getWeatherData(location.coords.latitude, location.coords.longitude);
			setWeather(weatherData);
			setStatus(true);
		} catch (error) {
			setStatus(false);
			setErrorMessage("Geolocation is not available, please enable it in your App settings.");
		}
	};

	const handleSearch = async (text) => {
		try {
			setSearchText(text);
			if (text.length > 2) {
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
			if (cityList.length < 1) {
				setStatus(false);
				setErrorMessage("The service connexion is lost, please check your internet connexion or try again later.");
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
				return <TodayScreen location={location} status={status} errorMessage={errorMessage} weatherData={weather}/>;
			case "weekly":
				return <WeeklyScreen location={location} status={status} errorMessage={errorMessage} weatherData={weather}/>;
			default:
				return <CurrentlyScreen location={location} status={status} errorMessage={errorMessage} weatherData={weather}/>;
		}
	};

	return (
		<View style={styles.fullScreen}>
			<Appbar.Header style={styles.appBar}>
				<Appbar.Action disabled={searchText == null || searchText.length < 3} color={"white"} icon="magnify"
							   onPress={() => handleSelectCity(null)}/>
				<TextInput
					style={styles.input}
					placeholder="Search..."
					onChangeText={(text) => handleSearch(text)}
				/>
				<Appbar.Action icon="crosshairs-gps" onPress={handleGeolocation}/>
			</Appbar.Header>

			<CityList cities={cityList} isKeyboardFocused={isKeyboardFocused} searchText={searchText}
					  onPress={handleSelectCity}/>

			{(!isKeyboardFocused || searchText.length < 3) && <GestureRecognizer
				onSwipeLeft={() => setIndex((index + 1) % routes.length)}
				onSwipeRight={() => setIndex((index + routes.length - 1) % routes.length)}
				style={styles.flexContainer}
			>
				{renderScene({route: routes[index]})}
			</GestureRecognizer>}

			<BottomNavigation
				navigationState={{index, routes}}
				onIndexChange={setIndex}
				renderScene={() => null}
				style={styles.barStyle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	appBar: {backgroundColor: "#686b7a"},
	input: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: 5,
		marginLeft: 10,
		paddingHorizontal: 10,
		height: 40,
	},
	fullScreen: {flex: 1},
	flexContainer: {flex: 1},
	barStyle: {backgroundColor: "white", flex: 0},
	cityList: {flex: 1},
});
