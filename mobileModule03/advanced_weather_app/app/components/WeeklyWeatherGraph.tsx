import {LineChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import palette from "@/app/theme/palette";
import {Icon} from "react-native-paper";

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
				color: () => palette.primary,
				strokeWidth: 2,
				propsForDots: {
					r: "3",
					strokeWidth: "2",
					stroke: palette.primary,
				}
			},
			{
				data: yDataMax,
				color: () => palette.accent,
				strokeWidth: 2,
				propsForDots: {
					r: "3",
					strokeWidth: "2",
					stroke: palette.accent,
				}
			}
		],
	};

	return (
		<View style={styles.container} pointerEvents="none">
			<Text style={styles.title}>Weekly Temperatures</Text>
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
				}}
				bezier
			/>
			<Text style={styles.legend}>
				<Text><Icon size={10} source={'circle'} color={palette.primary}/> Min temperature</Text>
				<Text> <Icon size={10} source={'circle'} color={palette.accent}/> Max temperature</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 20,
		color: palette.white,
		marginBottom: 20,
		textAlign: 'center',
	},
	legend: {
		fontSize: 12,
		color: palette.white,
		textAlign: 'center',
		paddingTop: 2,
		gap: 10,
	}
});


export default WeeklyWeatherGraph;