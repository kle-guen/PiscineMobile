import {ScrollView, StyleSheet, Text, View} from "react-native";
import palette from "@/app/theme/palette";
import TodayWeatherList from "@/app/components/TodayWeatherList";
import TodayWeatherGraph from "@/app/components/TodayWeatherGraph";

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
			<TodayWeatherGraph weatherData={weather}/>
			<TodayWeatherList weatherData={weather}/>
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