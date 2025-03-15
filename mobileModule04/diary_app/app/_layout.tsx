import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Login" }} />
			<Stack.Screen name="diary" options={{ title: "Diary" }} />
			<Stack.Screen name="web-auth" options={{ title: "Web Authentication" }} />
		</Stack>
	);
}
