import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useRef, useState} from "react";
import MyKeyboard from "@/app/components/MyKeyboard";

export default function Index() {

	const [value, setValue] = useState("0");
	const [result, setResult] = useState("0");


	const scrollViewRef = useRef<ScrollView | null>(null);
	return (
		<View style={styles.container}>
			<View style={styles.textWrapper}>
				<ScrollView horizontal={true} style={styles.scrollView} ref={scrollViewRef}
							onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd({animated: true})}}>
					<Text style={styles.text} numberOfLines={1}>{value}</Text>
				</ScrollView>
				<ScrollView horizontal={true} style={styles.scrollView}>
					<Text style={styles.text} numberOfLines={1}>{result}</Text>
				</ScrollView>
			</View>
			<MyKeyboard value={value} setValue={setValue} setResult={setResult} style={styles.keyboard}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: 200,
	},
	textWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		width: "100%",
	},
	text: {
		flex: 1,
		textAlign: "right",
		fontSize: 30,
		color: "#000",
	},
	keyboard: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
	},
	scrollView: {
		flexDirection: "row",
	}
});
