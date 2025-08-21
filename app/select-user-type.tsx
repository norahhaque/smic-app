import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function SelectUserType() {
  const router = useRouter();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [user, setUser] = useState('');

  const data = [
    { label: 'User', value: 'User' },
    { label: 'Admin', value: 'Admin' },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className='bg-white flex-1'>

            {/* Loading Indicator */}
            {!imagesLoaded && (
              <ActivityIndicator
                size="large"
                color="#1F4D9D"
                className='flex-1 items-center justify-center mt-60'
              />
            )}

            {/* Header Image */}
            <Image
              className='w-full h-[270px] mt-[-20]'
              source={require('../assets/images/test-2-arch.png')}
            />

            {/* User/Admin Icons */}
            <View className="items-center mt-12">
              <Image
                className='w-full h-28 mt-50'
                resizeMode='contain'
                source={require('../assets/images/user-admin-icons.png')}
                onLoad={() => setImagesLoaded(true)}
              />
            </View>

            {imagesLoaded && (
              <>
                <Text className='font-dmserif text-3xl text-gray-almostBlack text-center mt-10'>
                  I Am A...
                </Text>

                {/* User Type Dropdown */}
                {/* User Type Dropdown */}
                <View className="mx-10 mt-10">
                  <Dropdown
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder="Select user type"
                    value={user}
                    onChange={item => setUser(item.value)}
                    dropdownPosition="bottom"
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
                    containerStyle={{
                      backgroundColor: 'white',
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
                        <Text style={{
                          fontFamily: "Lato",
                          color: "#2c323b",
                          textAlign: 'center',
                          fontSize: 15
                        }}>
                          {item.label}
                        </Text>
                      </View>
                    )}
                  />
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                  disabled={!user}
                  onPress={() => router.replace("/welcome")}
                  className={`bg-green-main px-4 py-3 mx-10 mt-6 rounded-full items-center ${!user ? 'opacity-50' : ''}`}
                >
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
