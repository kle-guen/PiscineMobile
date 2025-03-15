import * as AuthSession from 'expo-auth-session';
import {AuthRequestConfig, DiscoveryDocument} from 'expo-auth-session';

export default class AuthService {

	public googleAuth() {
		const config: AuthRequestConfig = {
			clientId: process.env.GOOGLE_ANDROID_CLIENT_ID ?? '',
			redirectUri: AuthSession.makeRedirectUri({useProxy: true, path: process.env.GOOGLE_REDIRECT_URI}),
		};

		const discovery: DiscoveryDocument = {
			authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
			tokenEndpoint: 'https://oauth2.googleapis.com/token',
			revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
		};

		return AuthSession.useAuthRequest(config, discovery);
	}

	public githubAuth() {
		const config: AuthRequestConfig = {
			clientId: process.env.GITHUB_CLIENT_ID ?? '',
			redirectUri: AuthSession.makeRedirectUri({useProxy: true, path: process.env.GITHUB_REDIRECT_URI}),
		};

		const discovery: DiscoveryDocument = {
			authorizationEndpoint: 'https://github.com/login/oauth/authorize',
			tokenEndpoint: 'https://github.com/login/oauth/access_token',
		};

		return AuthSession.useAuthRequest(config, discovery);
	}
}