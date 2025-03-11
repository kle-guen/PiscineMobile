import {FlatList, StyleSheet, TouchableOpacity, View, Text, Keyboard} from "react-native";

export default function CityList({cities, onPress, searchText, isKeyboardFocused}) {

	if (!cities || cities.length < 1 || !isKeyboardFocused) return null;

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.listWrapper}
				keyboardShouldPersistTaps={"handled"}
				data={cities}
				ItemSeparatorComponent={() => <View style={styles.separator}/>}
				keyExtractor={(item, index) => `${item.name}-${index}`}
				renderItem={({item}) => (
					<TouchableOpacity style={styles.city} onPress={() => {
						Keyboard.dismiss();
						onPress(item);
					}}>
						<Text>{item.name} {item.admin1 ? `${item.admin1},` : ""} {item.country}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		elevation: 5,
	},
	city: {
		margin: 10,
		padding: 10,
		flex: 1,
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
	},
	listWrapper: {
		flex: 1,
	},
	separator: {
		height: 1,
		backgroundColor: "black",
		opacity: 0.5,
	},
});