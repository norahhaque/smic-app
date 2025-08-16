import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/colors/colors";


export default function TabsLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.blue.main,
      tabBarInactiveTintColor: colors.gray.main,
      tabBarStyle: {
        backgroundColor: colors.blue.extralight,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "help-circle";
        if (route.name === "prayer") iconName = "time-outline";
        else if (route.name === "engage") iconName = "people-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tabs.Screen name="prayer" options={{ title: "Prayer" }} />
      <Tabs.Screen name="engage" options={{ title: "Engage" }} />
    </Tabs>
  );
}
