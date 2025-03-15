import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from './conf/firebase';
import {useRouter} from "expo-router";

const Diary = () => {
	const navigation = useRouter();

	const handleLogout = async () => {
		await auth.signOut();
		navigation.push('Login');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to Your Diary</Text>
			<Button title="Logout" onPress={handleLogout} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});

export default Diary;