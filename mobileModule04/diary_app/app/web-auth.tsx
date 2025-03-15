import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { signInWithCredential, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from './conf/firebase';
import {useRouter} from "expo-router";
import AuthService from "@/app/services/authService";

WebBrowser.maybeCompleteAuthSession();

const WebAuth = () => {
	const navigation = useRouter();

	const authService = new AuthService();

	const [googleAuthRequest, googleAuthResult, googleAuthPromptAsync] = authService.googleAuth();
	const [githubAuthRequest, githubAuthResult, githubAuthPromptAsync] = authService.githubAuth();

	const handleGoogleLogin = async () => {
		try {
			const result = await googleAuthPromptAsync();

			if (result.type === 'success') {
				const { id_token } = result.params;
				const credential = GoogleAuthProvider.credential(id_token);
				signInWithCredential(auth, credential)
					.then(() => navigation.push('/diary'))
					.catch((error) => Alert.alert('Error', error.message));
			}
		}
		catch (error) {
			Alert.alert('Error', error.message);
		}
	}

	const handleGitHubLogin = async () => {
		try {
			const result = await githubAuthPromptAsync();

			if (result.type === 'success') {
				const { code } = result.params;
				const credential = GithubAuthProvider.credential(code);
				signInWithCredential(auth, credential)
					.then(() => navigation.push('/diary'))
					.catch((error) => Alert.alert('Error', error.message));
			}
		}
		catch (error) {
			Alert.alert('Error', error.message);
		}
	}

	return (
		<View style={styles.container}>
			<Button title="Login with Google" onPress={handleGoogleLogin} />
			<Button title="Login with GitHub" onPress={handleGitHubLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default WebAuth;
