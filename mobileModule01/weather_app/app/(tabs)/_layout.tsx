import React, {useState} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {Appbar, BottomNavigation} from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Location from "expo-location"

// Import Screens
import CurrentlyScreen from "./index";
import TodayScreen from "./today";
import WeeklyScreen from "./weekly";

export default function TabLayout() {
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [routes] = useState([
		{key: "currently", title: "Currently", focusedIcon: "clock"},
		{key: "today", title: "Today", focusedIcon: "calendar-today"},
		{key: "weekly", title: "Weekly", focusedIcon: "calendar-week"},
	]);

	// Function to get geolocation
	const handleLocation = async () => {
		let {status} = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setSearchText("Permission Denied");
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		console.log(location);
		setSearchText("Geolocation");
	};

	// Render the selected tab's screens
	const renderScene = ({route}) => {
		switch (route.key) {
			case "today":
				return <TodayScreen searchText={searchText}/>;
			case "weekly":
				return <WeeklyScreen searchText={searchText}/>;
			default:
				return <CurrentlyScreen searchText={searchText}/>;
		}
	};

	return (
		<View style={styles.fullScreen}>
			<Appbar.Header style={styles.appBar}>
				<TextInput
					style={styles.input}
					placeholder="Search..."
					onChangeText={(text) => setSearchText(text)}
				/>
				<Appbar.Action icon="crosshairs-gps" onPress={handleLocation}/>
			</Appbar.Header>

			{/* Gesture-based tab navigation */}
			<GestureRecognizer
				onSwipeLeft={() => setIndex((index + 1) % routes.length)}
				onSwipeRight={() => setIndex((index + routes.length - 1) % routes.length)}
				style={styles.flexContainer}
			>
				{renderScene({route: routes[index]})}
			</GestureRecognizer>

			{/* Bottom Navigation */}
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
	appBar: {backgroundColor: "#686b7a", elevation: 4},
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
});
