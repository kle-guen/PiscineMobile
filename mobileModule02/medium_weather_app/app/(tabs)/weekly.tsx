import {StyleSheet, Text, View} from 'react-native';
import codeToDescription from "@/app/utils/weather-data-utils";


export default function WeeklyScreen({location, status, errorMessage, weatherData}) {

	if (status === false) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>{errorMessage}</Text>
			</View>
		);
	}

	const weather = weatherData[1];

	if (weatherData === null || weatherData.length != 2 || weather.daily === null || weather.daily.time.length === 0 ||
		weather.daily.temperature_2m_min === null || weather.daily.temperature_2m_min.length === 0 ||
		weather.daily.temperature_2m_max === null || weather.daily.temperature_2m_max.length === 0 ||
		weather.daily.weather_code === null || weather.daily.weather_code.length === 0) {
		return (
			<View style={styles.containerCenter}>
				<Text style={styles.textDanger}>Could not find any result for the supplied address or coordinates</Text>
			</View>
		);
	}


	return (
		<View style={styles.container}>
			{location && <Text style={styles.text}>{location}</Text>}
			{weather.daily.time.map((data, index) => (
				<Text key={index} style={styles.text}>
					{data} {weather.daily.temperature_2m_min[index]}°C {weather.daily.temperature_2m_max[index]}°C {codeToDescription(weather.daily.weather_code[index])}
				</Text>
			))}
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
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
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