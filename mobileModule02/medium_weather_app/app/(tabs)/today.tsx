import {ScrollView, StyleSheet, Text, View} from "react-native";
import codeToDescription from "@/app/utils/weather-data-utils";

export default function TodayScreen({location, status, errorMessage, weatherData}) {

	if (status === false) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>{errorMessage}</Text>
			</View>
		);
	}

	const weather = weatherData[0];

	if (weatherData === null || weatherData.length != 2 || weather.hourly === null || weather.hourly.time.length === 0 ||
		weather.hourly.temperature_2m === null || weather.hourly.temperature_2m.length === 0 ||
		weather.hourly.wind_speed_10m === null || weather.hourly.wind_speed_10m.length === 0 ||
		weather.hourly.weather_code === null || weather.hourly.weather_code.length === 0
	) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>Could not find any result for the supplied address or coordinates</Text>
			</View>
		);
	}


	return (
		<ScrollView style={styles.container}>
			{location ? <Text style={styles.text}>{location}</Text> : <Text style={styles.text}>Your position</Text>}
			{weather.hourly.time.map((data, index) => (
				<Text key={index} style={styles.text}>
					{data.split("T")[1]} {weather.hourly.temperature_2m[index]}°C {codeToDescription(weather.hourly.weather_code[index])} {weather.hourly.wind_speed_10m[index]} km/h
				</Text>

			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
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
		color: "red",
		textAlign: "center",
	},
});