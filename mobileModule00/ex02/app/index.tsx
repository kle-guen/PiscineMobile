import {StyleSheet, Text, View} from "react-native";
import MyKeyboard from "@/app/components/MyKeyboard";

export default function Index() {

	return (
		<View style={styles.container}>
			<View style={styles.textWrapper}>
				<Text style={styles.text}>0</Text>
				<Text style={styles.text}>0</Text>
			</View>
			<MyKeyboard style={styles.keyboard}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		minHeight: 200,
	},
	textWrapper: {
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-end",
	},
	text: {
		display: "flex",
		textAlign: "right",
		fontSize: 30,
		color: "#000",
	},
	keyboard: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
	},
});
