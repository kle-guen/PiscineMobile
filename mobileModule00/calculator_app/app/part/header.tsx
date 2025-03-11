import {View, Text} from "react-native";

export default function Header() {
	  return (
	<View
	  style={{
		height: 50,
		backgroundColor: "#1851ad",
		justifyContent: "center",
		alignItems: "center",
	  }}
	>
	  <Text style={{color: "#fff"}}>Calculator</Text>
	</View>
  );
}