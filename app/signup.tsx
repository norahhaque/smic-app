import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
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
                <Text className='font-dmserif text-3xl text-gray-almostBlack text-center mt-4'>Create Your Account</Text>

                {/* Google Button */}
                <TouchableOpacity onPress={() => router.replace("/select-mosque")} className="flex-row items-center justify-center bg-white border border-gray-extralight px-4 py-4 mx-10 mt-6 rounded-full">
                  <Image source={require('../assets/images/google-logo.webp')} className="w-5 h-5 mr-3" />
                  <Text className="text-gray-dark font-lato tracking-wider">CONTINUE WITH GOOGLE</Text>
                </TouchableOpacity>

                <Text className='text-gray-main text-sm font-lato-bold tracking-wider text-center mt-9 mb-3'>OR SIGN UP WITH EMAIL</Text>

                {/* Email Input */}
                <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" className="bg-gray-100 px-4 py-4 mx-10 mb-4 mt-10 rounded-lg border border-gray-extralight font-lato" />

                {/* Password Input */}
                <View className='flex-row items-center justify-between bg-gray-100 px-4 py-4 mx-10 mb-6 rounded-lg border border-gray-extralight'>
                  <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} className="flex-1 font-lato" />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color='#3F414E' />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View className='flex-row items-center justify-between bg-gray-100 px-4 py-4 mx-10 mb-6 rounded-lg border border-gray-extralight'>
                  <TextInput placeholder="Confirm Password" value={confirmPassword} secureTextEntry={!showPassword} className="flex-1 font-lato" onChangeText={text => {
                    setConfirmPassword(text);
                    if (password && text !== password) {
                      setPasswordError(true);
                    } else {
                      setPasswordError(false);
                    }
                  }} />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color='#3F414E' />
                  </TouchableOpacity>
                </View>


                {/* Sign Up Button */}
                <TouchableOpacity onPress={() => {
                  router.replace("/select-mosque");
                }}
                  className={`bg-green-main px-4 py-3 mx-10 mt-6 rounded-full items-center ${passwordError || !email || !password || ! confirmPassword ? 'opacity-50' : ''}`} disabled={passwordError || !email || !password || ! confirmPassword}>
                  <Text className="text-white font-lato text-lg tracking-wider">CONTINUE</Text>
                </TouchableOpacity>

                {confirmPassword.length > 0 && passwordError && (<Text className="font-lato-light text-accent-red text-center mt-4 mb-[-28]">Passwords do not match.</Text>)}


                {/* Log in Redirect */}
                <View className="flex-row justify-center mt-24">
                  <Text className="font-lato-light text-[13px] text-gray-main">ALREADY HAVE AN ACCOUNT?{"  "}</Text>
                  <TouchableOpacity onPress={() => router.replace("/login")}>
                    <Text className="font-lato text-[13px] text-blue-main">LOG IN</Text>
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