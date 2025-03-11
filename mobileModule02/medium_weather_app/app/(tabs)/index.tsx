import {StyleSheet, Text, View} from "react-native";
import codeToDescription from "@/app/utils/weather-data-utils";

export default function CurrentlyScreen({location, status, errorMessage, weatherData}) {
	if (status === false) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>{errorMessage}</Text>
			</View>
		);
	}

	const weather = weatherData[1];

	if (weatherData === null || weatherData.length != 2 || weather.current === null ||
		weather.current.temperature_2m === null || weather.current.weather_code === null ||
		weather.current.wind_speed_10m === null
	) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>Could not find any result for the supplied address or coordinates</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{location ? <Text style={styles.text}>{location}</Text> : <Text style={styles.text}>Your position</Text>}
			<Text style={styles.text}>
				{weather.current.temperature_2m}°C{'\n'}{codeToDescription(weather.current.weather_code)}{'\n'}{weather.current.wind_speed_10m} km/h
			</Text>
		</View>
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
		textAlign: "center",
	},

	textDanger: {
		fontSize: 18,
		fontWeight: "bold",
		color: "red",
		textAlign: "center",
	},
});