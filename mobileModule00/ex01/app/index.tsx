import {Button, Text, View} from "react-native";
import {useState} from "react";

export default function Index() {

	const [text, setText] = useState("A simple text");
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>{text}</Text>
			<Button title={"Click me"} onPress={() => text == 'A simple text' ? setText('Hello World!') : setText('A simple text')}/>
		</View>
	);
}
