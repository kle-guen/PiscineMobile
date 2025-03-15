import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useRouter} from "expo-router";

const Login = () => {
    const navigation = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My Diary</Text>
            <Button title="Login" onPress={() => navigation.push("/web-auth")} />
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

export default Login;
