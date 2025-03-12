import {ScrollView, StyleSheet, Text, View} from "react-native";
import codeToDescription from "@/app/utils/weather-data-utils";
import {Icon} from "react-native-paper";
import palette from "@/app/theme/palette";

const TodayWeatherList = ({weatherData}) => {

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal={true}
				contentContainerStyle={{flexGrow: 1}}
				persistentScrollbar={true}
				showsHorizontalScrollIndicator={true}
				nestedScrollEnabled={true}
			>
				{weatherData.hourly.time.map((data, index) => (
					<View key={index} style={styles.flexCol}>
						<Text style={styles.text}>{data.split("T")[1]}</Text>
						<Icon source={codeToDescription(weatherData.hourly.weather_code[index]).icon} size={30}
							  color={palette.primary}/>
						<Text style={styles.temperatureText}>{weatherData.hourly.temperature_2m[index]}°C</Text>
						<View style={styles.flexRow}>
							<Icon source={"weather-windy"} size={20} color={palette.white}/>
							<Text style={styles.text}>{weatherData.hourly.wind_speed_10m[index]}km/h</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		backgroundColor: palette.secondaryLight,
	},
	text: {
		fontSize: 18,
		color: palette.white,
	},
	flexRow: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	flexCol: {
		flex: 0,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		gap: 20,
	},
	temperatureText: {
		fontSize: 20,
		color: palette.secondary,
	},
});

export default TodayWeatherList;