import { useRouter } from "expo-router";
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
    const router = useRouter();
    
    // Animation values
    const logoFade = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const textSlide = useRef(new Animated.Value(50)).current;
    const textFade = useRef(new Animated.Value(0)).current;
    const buttonSlide = useRef(new Animated.Value(30)).current;
    const buttonFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Staggered animation sequence
        const animationSequence = Animated.sequence([
            // Logo appears first
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
            
            // Text slides in after logo
            Animated.parallel([
                Animated.timing(textSlide, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(textFade, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            
            // Button appears last
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
        ]);

        // Start the animation sequence
        animationSequence.start();
    }, []);

    return (
        <View className="flex-1 bg-white justify-start">
            <View className="w-full h-72 relative">
                <Image source={require('../assets/images/blue-splash.png')} resizeMode="contain"/>
                <Animated.View
                    className="absolute"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: [
                            { translateX: -110 },
                            { translateY: -50 },
                            { scale: logoScale }
                        ],
                        opacity: logoFade,
                    }}
                >
                    <Image 
                        source={require('../assets/images/mas-full-logoo.png')} 
                        resizeMode="contain" 
                        className="w-[220px] h-[100px] mt-32"
                    />
                </Animated.View>
            </View>

            <View className="px-10">
                <Animated.View
                    style={{
                        opacity: textFade,
                        transform: [{ translateY: textSlide }],
                    }}
                >
                    <Text className="font-dmserif text-[2rem] text-gray-almostBlack mt-[310px]">
                        Assalamualaikum!
                    </Text>
                    <Text className="font-lato-light text-lg text-gray-main mt-2">
                        Welcome to our community.
                    </Text>
                </Animated.View>

                <Animated.View
                    style={{
                        opacity: buttonFade,
                        transform: [{ translateY: buttonSlide }],
                    }}
                >
                    <TouchableOpacity 
                        onPress={() => router.replace("/prayer")} 
                        className="bg-green-main rounded-full mt-20 py-3 items-center justify-center"
                    >
                        <Text className="text-white font-lato text-lg text-center tracking-[1.1px]">
                            GET STARTED
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}