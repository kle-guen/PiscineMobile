import {LineChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import palette from "@/app/theme/palette";

const TodayWeatherGraph = ({weatherData}) => {

	const {width} = Dimensions.get('window');

	const xData = ['00.00', '03.00', '06.00', '09.00', '12.00', '15.00', '18.00', '21.00'];
	const yData = weatherData.hourly.temperature_2m;

	const data = {
		labels: xData,
		datasets: [
			{
				data: yData,
			}
		]
	};

	return (
		<View style={styles.container} pointerEvents="none">
			<Text style={styles.title}>Today Temperatures</Text>
			<LineChart
				data={data}
				fromZero
				width={width - 20}
				height={300}
				yAxisSuffix={"°C"}
				chartConfig={{
					backgroundColor: palette.transparent,
					backgroundGradientFrom: palette.transparent,
					backgroundGradientTo: palette.transparent,
					backgroundGradientFromOpacity: 0,
					backgroundGradientToOpacity: 0,
					decimalPlaces: 0,
					color: () => palette.secondary,
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
						r: "3",
						strokeWidth: "2",
						stroke: palette.secondary,
					},
					propsForHorizontalLabels: {
						disabled: true,
					},
					propsForVerticalLabels: {}
				}}
				bezier
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		color: palette.white,
		marginBottom: 20,
		textAlign: "center",
	}
});


export default TodayWeatherGraph;