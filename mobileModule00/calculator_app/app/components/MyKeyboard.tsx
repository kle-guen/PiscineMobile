import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import handleInput from "../utils/keyboardUtils";

export default function MyKeyboard({value, setValue, setResult}: any) {
	const keyboardButtons = ["7", "8", "9", "C", "AC", "4", "5", "6", "+", "-", "1", "2", "3", "x", "/", "0", ".", "="];

	return (
		<View style={styles.container}>
			<View style={styles.numberButtonContainer}>
				{keyboardButtons.map((number) => (
					<View key={number} style={styles.numberButtonWrapper}>
						<TouchableOpacity onPress={() => handleInput(number, value, setValue, setResult)}
										  style={styles.numberButton}>
							<Text>{number}</Text>
						</TouchableOpacity>
					</View>
				))}
				<View style={styles.numberButtonWrapper}>
					<View style={styles.numberButton}/>
				</View>
				<View style={styles.numberButtonWrapper}>
					<View style={styles.numberButton}/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	numberButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxHeight: 400,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderColor: '#85c1e9',
	},
	numberButtonWrapper: {
		display: 'flex',
		height: "25%",
		width: '20%',
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#85c1e9',
	},
	numberButton: {
		backgroundColor: '#3498db',
		justifyContent: "center",
		alignItems: "center",
		height: '100%',
		width: '100%',
	}
});