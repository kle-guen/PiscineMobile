import {LineChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import palette from "@/app/theme/palette";

const WeeklyWeatherGraph = ({weatherData}) => {

	const {width} = Dimensions.get('window');

	const xData = weatherData.daily.time.map((data) => data.split('-')[2] + '/' + data.split('-')[1]);
	const yDataMin = weatherData.daily.temperature_2m_min;
	const yDataMax = weatherData.daily.temperature_2m_max;


	const data = {
		labels: xData,
		datasets: [
			{
				data: yDataMin,
				color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`, // Line color
				strokeWidth: 2,
			},
			{
				data: yDataMax,
				color: (opacity = 3) => `rgba(202, 38, 2, ${opacity})`, // Line color
				strokeWidth: 2,
			}
		]
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Weekly Temperatures</Text>
			<LineChart
				data={data}
				fromZero
				width={width - 20} // Chart width
				height={300} // Chart height
				yAxisSuffix={"°C"} // Add temperature symbol to the Y-axis
				chartConfig={{
					backgroundColor: palette.transparent,
					backgroundGradientFrom: palette.transparent,
					backgroundGradientTo: palette.transparent,
					backgroundGradientFromOpacity: 0,
					backgroundGradientToOpacity: 0,
					decimalPlaces: 0,
					color: (opacity = 3) => `rgba(202, 38, 2, ${opacity})`, // Line color
					propsForBackgroundLines: {
						strokeWidth: 1,
						stroke: palette.white,
						strokeDasharray: "0",
					},
					style: {
						paddingLeft: 0,
						flex: 1,
					},
					propsForDots: {
						r: "4", // Dot radius
						strokeWidth: "2",
						stroke: palette.secondary, // Dot border color
					},
					propsForHorizontalLabels: {
						disabled: true,
					},
					propsForVerticalLabels: {}
				}}
				bezier // Smooth curve for the line
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		color: palette.white,
		marginBottom: 20,
	}
});


export default WeeklyWeatherGraph;