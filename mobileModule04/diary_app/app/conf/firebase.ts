import { initializeApp } from "firebase/app";
import { initializeAuth, signInWithCredential, getReactNativePersistence, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: "AIzaSyAy1c1TygD-Que6mRnicqEpYPkmH2WNAzI",
	authDomain: "diary-app-49eca.firebaseapp.com",
	projectId: "diary-app-49eca",
	storageBucket: "diary-app-49eca.firebasestorage.app",
	messagingSenderId: "610019444373",
	appId: "1:610019444373:web:f1ddcbca2792f768c53d9c",
	measurementId: "G-BPXKT36RKQ"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);

export default { auth, firestore, signInWithCredential, GoogleAuthProvider, GithubAuthProvider };