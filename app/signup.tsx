import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signup Page</Text>
      <Button
              title="Signed Up!"
              onPress={() => router.replace("/prayer")}
            />
    </View>
  );
}
