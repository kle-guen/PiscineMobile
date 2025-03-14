import {StyleSheet, Text, View} from "react-native";
import codeToDescription from "@/app/utils/weather-data-utils";
import palette from "@/app/theme/palette";
import {Icon} from "react-native-paper";

export default function CurrentlyScreen({location, status, errorMessage, weatherData}) {
	if (status === false) {
		return (
			<View style={styles.containerCenter} pointerEvents="none">
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

	if (weather.current === null || weather.current?.temperature_2m === null || weather.current?.weather_code === null ||
		weather.current?.wind_speed_10m === null
	) {
		return (
			<View style={styles.containerCenter} pointerEvents="none">
				<Text style={styles.textDanger}>Could not find any result for the supplied address</Text>
			</View>
		);
	}

	return (
		<View style={styles.container} pointerEvents="none">
			{location ?
				<View style={styles.flexCol}>
					<Text style={styles.cityText}>{location.split('\n')[0]}</Text>
					<Text style={styles.regionText}>{location.split('\n').length > 1 && location.split('\n')[1]}</Text>
				</View>
				: <Text style={styles.cityText}>Your position</Text>
			}
			<Text style={styles.temperatureText}>{weather.current.temperature_2m}°C</Text>
			<View style={styles.flexCol}>
				<Text style={styles.text}>{codeToDescription(weather.current.weather_code).description}</Text>
				<Icon source={codeToDescription(weather.current.weather_code).icon} size={100} color={palette.primary}/>
			</View>
			<View style={styles.flexRow}>
				<Icon source={"weather-windy"} size={30} color={palette.primary}/>
				<Text style={styles.text}>{weather.current.wind_speed_10m} km/h</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 50,
		paddingHorizontal: 20,
		justifyContent: "space-around",
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
		textAlign: "center",
		color: palette.white,
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
	flexRow: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	temperatureText: {
		fontSize: 50,
		fontWeight: 600,
		color: palette.secondary,
		textAlign: "center",
	}
});