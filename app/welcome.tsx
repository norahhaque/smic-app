import { useRouter } from "expo-router";
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
    const router = useRouter();


    return (
        <View className="flex-1 bg-white justify-start">
            <View className="w-full h-72 relative">
                <Image source={require('../assets/images/blue-splash.png')} resizeMode="contain" />
                <Image source={require('../assets/images/mas-full-logoo.png')} resizeMode="contain" className="absolute w-[300px] h-[180px] mt-28" style={{ top: '50%', left: '50%', transform: [{ translateX: -150 }, { translateY: -90 }] }} />
            </View>

            <View className="px-10">
                <Text className="font-dmserif text-[2rem] text-gray-almostBlack mt-[310px]">Assalamualaikum!</Text>
                <Text className="font-lato-light text-lg text-gray-main mt-2">Welcome to our community.</Text>

                <TouchableOpacity onPress={() => router.replace("/signup")} className="bg-green-main rounded-full mt-20 py-3 items-center justify-center">
                    <Text className="text-white font-lato text-lg text-center tracking-[1.1px]">GET STARTED</Text>
                </TouchableOpacity>

    

            </View>

        </View>
    );
}
