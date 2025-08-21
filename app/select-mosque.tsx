import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function SelectMosque() {
    const router = useRouter();
    const [mosque, setMosque] = useState('');
    const data = [
        { label: 'South Metro Islamic Center', value: 'South Metro Islamic Center' }
    ]
    const [archLoaded, setArchLoaded] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const imagesLoaded = archLoaded && logoLoaded;

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View className='bg-white flex-1'>

                        {!imagesLoaded && (
                            <View className='absolute inset-0 items-center justify-center bg-white z-10'>
                                <ActivityIndicator size="large" color="#1F4D9D" />
                            </View>
                        )}

                        <Image className='w-full h-[270px] mt-[-20]' source={require('../assets/images/test-2-arch.png')} onLoad={() => setArchLoaded(true)} />

                        <View className="items-center mt-12">
                            <Image className='w-full h-40 mt-50' resizeMode='contain' source={require('../assets/images/mas-mosque-logo.png')} onLoad={() => setLogoLoaded(true)} />
                        </View>

                        {imagesLoaded && (
                            <>
                                <Text className='font-dmserif text-3xl text-gray-almostBlack text-center mt-10'>Select Your Mosque</Text>

                                <View className="mx-10 mt-10">
                                    <Dropdown
                                        data={data}
                                        labelField="label"
                                        valueField="value"
                                        value={mosque}
                                        placeholder="Select location"
                                        onChange={item => setMosque(item.value)}
                                        style={{
                                            backgroundColor: '#F4F9FE',
                                            height: 56,
                                            paddingHorizontal: 16,
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: '#E5E7EB',
                                        }}
                                        placeholderStyle={{ color: "#9ca3af", fontFamily: "Lato" }}
                                        selectedTextStyle={{ color: "#2c323b", fontFamily: "Lato" }}
                                        itemTextStyle={{
                                            fontFamily: "Lato",
                                        }}
                                        containerStyle={{
                                            backgroundColor: 'white',
                                            height: 56,
                                            paddingHorizontal: 16,
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: '#E5E7EB',
                                            overflow: 'hidden',
                                            shadowColor: 'transparent',
                                            elevation: 0,
                                        }}
                                        renderItem={(item) => (
                                            <View style={{
                                                backgroundColor: 'white',
                                                paddingHorizontal: 16,
                                                paddingVertical: 18,
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                            }}>
                                                <Text style={{ fontFamily: "Lato", color: "#2c323b", textAlign: 'center', fontSize: 15,}}>
                                                    {item.label}
                                                </Text>
                                            </View>
                                        )}


                                    />
                                </View>

                                <TouchableOpacity onPress={() => {
                                    router.replace("/select-user-type");
                                }}
                                    className={`bg-green-main px-4 py-3 mx-10 mt-6 rounded-full items-center ${!mosque ? 'opacity-50' : ''}`} disabled={!mosque}>
                                    <Text className="text-white font-lato text-lg tracking-wider">CONTINUE</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}