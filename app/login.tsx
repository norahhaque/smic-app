import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Page</Text>
      <Button
        title="Logged in!"
        onPress={() => router.replace("/prayer")}
      />
      <Button
        title="Sign up instead!"
        onPress={() => router.replace("/signup")}
      />
    </View>
  );
}
