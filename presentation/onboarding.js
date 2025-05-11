import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../styles/style';
import {
  getBookRoomData,
  getIsLoggedIn,
  getUserData,
  saveHotelData,
} from '../DataStore/DataStore';
import AppContext from '../Context/AppContext';
import {
  UPDATE_CURRENT_HOTEL,
  UPDATE_ROOM_DATA,
  UPDATE_USER_DATA,
} from '../Context/actionType';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const {Context, dispatch} = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to hold login status

  const handleButtonPress = async () => {
    const loggedInStatus = await getIsLoggedIn();
    if (loggedInStatus) {
      navigation.navigate('DashBoard');
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await getIsLoggedIn();
      const userData = await getUserData();
      const hotelData = await saveHotelData();
      const roomData = await getBookRoomData();
      setIsLoggedIn(loggedInStatus);
      if (userData) {
        dispatch({
          type: UPDATE_USER_DATA,
          currentUserData: userData,
        });
      }
      if (hotelData) {
        dispatch({
          type: UPDATE_CURRENT_HOTEL,
          currentHotelData: hotelData,
        });
      }
      if (roomData) {
        dispatch({
          type: UPDATE_ROOM_DATA,
          currentRoomData: roomData,
        });
      }
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
        Welcome! Take control of your stay with easy room adjustments,meal
        orders ,staff chats, and service request--all at your fingertips. Let's
        make your experience exceptional.
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
      <View style={{height: 20}} />
    </View>
  );
};

export default OnBoardingScreen;
