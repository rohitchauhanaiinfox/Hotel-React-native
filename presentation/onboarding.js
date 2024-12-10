import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../styles/style';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to hold login status

  const handleButtonPress = async () => {
    await AsyncStorage.setItem('onBoarding', 'true');
    if (isLoggedIn) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await AsyncStorage.getItem('isLogin');
      setIsLoggedIn(loggedInStatus === 'true');
    };

    checkLoginStatus();
  }, []); 

  if (isLoggedIn === null) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* Top Image */}
      <Image
        source={require('../assets/images/onboarding.png')}
        resizeMode="cover"
        style={globalStyles.image} 
      />

      {/* Title Text */}
      <Text style={globalStyles.titleText}>
      Welcome! Take control of your stay with easy room adjustments,meal orders ,staff chats, and service request--all at your fingertips. Let's make your experience exceptional.
      </Text>

      {/* Spacer */}
      <View style={globalStyles.spacer} />

      {/* Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleButtonPress}>
        <Text style={globalStyles.buttonText}>
          {isLoggedIn ? "Let's Get Started" : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Bottom Spacer */}
      <View style={{ height: 20 }} />
    </View>
  );
};

export default OnBoardingScreen;
