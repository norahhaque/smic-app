import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View className='bg-white flex-1'>

                        {!imageLoaded && (<ActivityIndicator size="large" color="#1F4D9D" className='flex-1 items-center justify-center mt-60' />)}

                        <Image className='w-full h-[270px] mt-[-20]' source={require('../assets/images/test-2-arch.png')} onLoad={() => setImageLoaded(true)} />

                        {imageLoaded && (
                            <>
                                <Text className='font-dmserif text-3xl text-gray-almostBlack text-center mt-4'>Welcome Back</Text>

                                {/* Google Button */}
                                <TouchableOpacity onPress={() => router.replace("/prayer")} className="flex-row items-center justify-center bg-white border border-gray-extralight px-4 py-4 mx-10 mt-6 rounded-full">
                                    <Image source={require('../assets/images/google-logo.webp')} className="w-5 h-5 mr-3" />
                                    <Text className="text-gray-dark font-lato tracking-wider">CONTINUE WITH GOOGLE</Text>
                                </TouchableOpacity>

                                <Text className='text-gray-main text-sm font-lato-bold tracking-wider text-center mt-9 mb-3'>OR LOG IN WITH EMAIL</Text>

                                {/* Email Input */}
                                <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCorrect={true} autoCapitalize="none" spellCheck={true} className="bg-gray-100 px-4 py-4 mx-10 mb-4 mt-10 rounded-lg border border-gray-extralight font-lato" />

                                {/* Password Input */}
                                <View className='flex-row items-center bg-gray-100 px-4 py-4 mx-10 mb-6 rounded-lg border border-gray-extralight'>
                                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} className="flex-1 font-lato" />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color='#3F414E'/>
                                    </TouchableOpacity>
                                </View>

                                {/* Login Button */}
                                <TouchableOpacity onPress={() => router.replace("/prayer")} className="bg-green-main px-4 py-3 mx-10 mt-6 rounded-full items-center">
                                    <Text className="text-white font-lato text-lg tracking-wider">LOG IN</Text>
                                </TouchableOpacity>

                                <Text className='text-gray-dark font-lato text-center mt-5 mb-4'>Forgot Password?</Text>

                                <View className="flex-row justify-center mt-24">
                                    <Text className="font-lato-light text-gray-main">DON'T HAVE AN ACCOUNT?{"  "}</Text>
                                    <TouchableOpacity onPress={() => router.replace("/login")}>
                                        <Text className="font-lato text-blue-main">SIGN UP</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}