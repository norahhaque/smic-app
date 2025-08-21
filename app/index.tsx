import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function LoginScreen() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    'Raleway-Thin': require('../assets/fonts/Raleway-Thin.ttf'),
    'Raleway-Light': require('../assets/fonts/Raleway-Light.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
    'Raleway-SemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Italic': require('../assets/fonts/Raleway-Italic.ttf'),
  });

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null; // Or a splash/loading component
  }

  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-start">
      <View className="w-full h-72 relative">
        <Image source={require('../assets/images/blue-splash.png')} resizeMode="contain" />
        <Image source={require('../assets/images/mas-logo.png')} resizeMode="contain" className="absolute w-[120px] h-[120px] mt-28" style={{ top: '50%', left: '50%', transform: [{ translateX: -60 }, { translateY: -60 }] }} />
      </View>

      <View className="px-10">
        <Text className="font-dmserif text-[2rem] text-gray-almostBlack text-center mt-[310px]">Join our Community.</Text>
        <Text className="font-lato-light text-lg text-gray-main text-center mt-2">Sign in or create an account to access prayer times, events, and more.</Text>

        <TouchableOpacity onPress={() => router.replace("/signup")} className="bg-blue-main rounded-full mt-20 py-3 items-center justify-center">
          <Text className="text-white font-lato text-lg text-center tracking-[1.2px]">SIGN UP</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text className="font-lato-light text-lg text-gray-main">Already have an account?{" "}</Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="font-lato-light text-lg text-green-main">Log in</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}
