import {ScrollView, StyleSheet, Text, View} from "react-native";
import codeToDescription from "@/app/utils/weather-data-utils";
import {Icon} from "react-native-paper";
import palette from "@/app/theme/palette";

const WeeklyWeatherList = ({weatherData}) => {

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal={true}
				contentContainerStyle={{flexGrow: 1}}
				persistentScrollbar={true}
				showsHorizontalScrollIndicator={true}
				nestedScrollEnabled={true}
			>
				{weatherData.daily.time.map((data, index) => (
					<View key={index} style={styles.flexCol}>
						<Text style={styles.text}>{data.split('-')[2]}/{data.split('-')[1]}</Text>
						<Icon source={codeToDescription(weatherData.daily.weather_code[index]).icon} size={30}
							  color={palette.primary}/>
						<Text style={styles.temperatureTextMax}>{weatherData.daily.temperature_2m_max[index]}°C max</Text>
						<Text style={styles.temperatureTextMin}>{weatherData.daily.temperature_2m_min[index]}°C min</Text>
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
	temperatureTextMax: {
		fontSize: 20,
		color: palette.danger,
	},
	temperatureTextMin: {
		fontSize: 20,
		color: palette.primary,
	},
});

export default WeeklyWeatherList;