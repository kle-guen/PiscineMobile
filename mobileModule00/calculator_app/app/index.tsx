import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useRef, useState} from "react";
import MyKeyboard from "@/app/components/MyKeyboard";

export default function Index() {

	const [value, setValue] = useState("0");
	const [result, setResult] = useState("0");


	const scrollViewRefExp = useRef<ScrollView | null>(null);
	const scrollViewRefRes = useRef<ScrollView | null>(null);

	return (
		<View style={styles.container}>
			<View style={styles.textWrapper}>
				<ScrollView horizontal={true} ref={scrollViewRefExp}
							onContentSizeChange={() => {scrollViewRefExp.current?.scrollToEnd({animated: true})}}
							contentContainerStyle={{flexGrow: 1}}
				>
					<Text style={styles.text} numberOfLines={1}>{value}</Text>
				</ScrollView>
				<ScrollView horizontal={true} ref={scrollViewRefRes}
							onContentSizeChange={() => {scrollViewRefRes.current?.scrollToEnd({animated: true})}}
							contentContainerStyle={{flexGrow: 1}}
				>
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
});
