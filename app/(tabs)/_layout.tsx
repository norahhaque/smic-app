import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from "../../assets/colors/colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function TabsLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.blue.main,
      tabBarInactiveTintColor: colors.gray.main,
      tabBarStyle: {
        backgroundColor: colors.blue.extralight,
        paddingTop: 10, 
        height: 80,
      },
      tabBarIcon: ({ color, size }) => {
        if (route.name === "prayer") return <FontAwesome5 name="pray" size={size} color={color} />
        else if (route.name === "engage") return <MaterialIcons name="event" size={size} color={color} />
        return null;
      },
    })}>
      <Tabs.Screen name="prayer" options={{ title: "" }} />
      <Tabs.Screen name="engage" options={{ title: "" }} />
    </Tabs>
  );
}
