import {FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import palette from "@/app/theme/palette";
import {Ionicons} from "@expo/vector-icons";
import {Icon} from "react-native-paper";

export default function CityList({cities, onPress, searchText, isKeyboardFocused}) {

	if (!cities || cities?.length < 1 || !isKeyboardFocused) return null;

	return (
		<View style={styles.container} pointerEvents="none">
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
						<Icon source={"map-marker-outline"} size={30} color={palette.light}/>
						<Text>
							<Text style={styles.cityName}>{item.name}</Text>
							<Text
								style={styles.cityDetails}> {item.admin1 ? `${item.admin1},` : ""} {item.country}</Text>
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: palette.bgLight,
	},
	city: {
		margin: 10,
		flex: 1,
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
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
		backgroundColor: palette.dark,
		opacity: 0.5,
	},
	cityName: {
		fontWeight: "bold",
		fontSize: 18,
		color: palette.dark,
	},
	cityDetails: {
		color: palette.light,
		fontSize: 14,
	},
});