import {ScrollView, StyleSheet, Text, View} from 'react-native';
import palette from "@/app/theme/palette";
import WeeklyWeatherGraph from "@/app/components/WeeklyWeatherGraph";
import WeeklyWeatherList from "@/app/components/WeeklyWeatherList";
import React from "react";


export default function WeeklyScreen({location, status, errorMessage, weatherData, setIsSwipeEnabled}) {

	if (status === false) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>{errorMessage}</Text>
			</View>
		);
	}

	if (weatherData === null || weatherData?.length != 2 || weatherData?.[0] === null) {
		return (
			<View style={styles.containerCenter} pointerEvents="none">
				{!status && <Text style={styles.textDanger}>Could not find any result for the supplied address</Text>}
			</View>
		);
	}

	const weather = weatherData[1];

	if (weather.daily === null || weather.daily?.time?.length === 0 ||
		weather.daily?.temperature_2m_min === null || weather.daily?.temperature_2m_min?.length === 0 ||
		weather.daily?.temperature_2m_max === null || weather.daily?.temperature_2m_max?.length === 0 ||
		weather.daily?.weather_code === null || weather.daily?.weather_code.length === 0) {
		return (
			<View style={styles.containerCenter} pointerEvents="none">
				<Text style={styles.textDanger}>Could not find any result for the supplied address</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled={true}>
			<View style={styles.container}>
				{location ?
					<View style={styles.flexCol}>
						<Text style={styles.cityText}>{location.split('\n')[0]}</Text>
						<Text
							style={styles.regionText}>{location.split('\n').length > 1 && location.split('\n')[1]}</Text>
					</View>
					: <Text style={styles.cityText}>Your position</Text>
				}
			</View>
			<WeeklyWeatherGraph weatherData={weather}/>
			<WeeklyWeatherList weatherData={weather} setIsSwipeEnabled={setIsSwipeEnabled}/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
	},
	containerCenter: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		flex: 1,
		textAlign: "center",
	},

	textDanger: {
		fontSize: 18,
		fontWeight: "bold",
		color: palette.danger,
		textAlign: "center",
	},
	cityText: {
		fontSize: 22,
		fontWeight: 500,
		color: palette.primary,
	},
	regionText: {
		fontSize: 22,
		color: palette.white,
	},
	flexCol: {
		flex: 0,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
});