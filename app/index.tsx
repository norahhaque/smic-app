import { Asset } from 'expo-asset';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleSlide = useRef(new Animated.Value(50)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(40)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const loginTextSlide = useRef(new Animated.Value(20)).current;
  const loginTextFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Asset.loadAsync([
      require('../assets/images/test-2-arch.png'),
    ]);
  }, []);
  
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

  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      const animationSequence = Animated.sequence([
        Animated.parallel([
          Animated.timing(logoFade, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(logoScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
        
        Animated.parallel([
          Animated.timing(titleSlide, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(titleFade, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      
        
        // Button slides in
        Animated.parallel([
          Animated.timing(buttonSlide, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonFade, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        
        Animated.parallel([
          Animated.timing(loginTextSlide, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(loginTextFade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]);

      animationSequence.start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View className="flex-1 bg-white items-center justify-start">
      <View className="w-full h-72 relative">
        <Image source={require('../assets/images/blue-splash.png')} resizeMode="contain" />
        <Animated.View
          className="absolute w-[120px] h-[120px]"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 120,
            height: 120,
            marginTop: 28,
            opacity: logoFade,
            transform: [
              { translateX: -60 },
              { translateY: -60 },
              { scale: logoScale }
            ],
          }}
        >
          <Image source={require('../assets/images/mas-logo.png')} resizeMode="contain"  className="absolute w-[120px] h-[120px] mt-28" style={{ top: '50%', left: '50%', transform: [{ translateX: -60 }, { translateY: -60 }] }} />
        </Animated.View>
      </View>

      <View className="px-10">
        <Animated.View
          style={{
            opacity: titleFade,
            transform: [{ translateY: titleSlide }],
          }}
        >
          <Text className="font-dmserif text-[2rem] text-gray-almostBlack text-center mt-[310px]">
            Join our Community.
          </Text>
          <Text className="font-lato-light text-lg text-gray-main text-center mt-2">
            Sign in or create an account to access prayer times, events, and more.
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: buttonFade,
            transform: [{ translateY: buttonSlide }],
          }}
        >
          <TouchableOpacity onPress={() => router.replace("/signup")} className="bg-blue-main rounded-full mt-20 py-3 items-center justify-center">
            <Text className="text-white font-lato text-lg text-center tracking-[1.2px]">SIGN UP</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            opacity: loginTextFade,
            transform: [{ translateY: loginTextSlide }],
          }}
        >
          <View className="flex-row justify-center mt-5">
            <Text className="font-lato-light text-lg text-gray-main">Already have an account?{" "}</Text>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text className="font-lato-light text-lg text-green-main">Log in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </View>

    </View>
  );
}