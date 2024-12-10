import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/button'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import local_storage from '../constants/local_storage';
import { apiPost } from '../service/client';
import CustomSnackbar from '../components/snackbar';

const OtpScreen = () => {
  const navigation = useNavigation();
  const route =  useRoute();
  const {mobile} = route.params;
  const [otp, setOtp] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState(true);
  const inputs = useRef([]);

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const storedOtp = await AsyncStorage.getItem('Otp');
        if (storedOtp) {
          setOtp(storedOtp); 
        }
      } catch (error) {
        console.error('Error fetching OTP from AsyncStorage:', error);
      }
    };
    fetchOtp();
  }, []);

  const handleInputChange = (value, index) => {
    const otpArray = otp.split('');
    otpArray[index] = value; 
    setOtp(otpArray.join('')); 
    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async() => {
    setIsLoading(true);
    console.log(otp);
    const data = {otp};
    try {
      const res = await apiPost('customers/verify-otp', data);
      console.log(res.data);
      if (res.status == 200) {
        const hotelId = res.data.data.hotelData._id;
        const userName = res.data.data.user.name;
        const roomNo = res.data.data.bookRoomData[0].roomData.roomNumber;
        const category = res.data.data.bookRoomData[0].roomData.category;
        console.log('htid',hotelId);
        console.log('booking',category);
        await AsyncStorage.setItem(local_storage.Token, res.data.data.token);
        await AsyncStorage.setItem(local_storage.HotelId, hotelId);
        await AsyncStorage.setItem(local_storage.UserName, userName);
        await AsyncStorage.setItem(local_storage.PhoneNo, mobile);
        await AsyncStorage.setItem(local_storage.RoomNo, JSON.stringify(roomNo));
        await AsyncStorage.setItem(local_storage.RoomType, category);
        setIsLoading(false);
        navigation.navigate('DashBoard');
      } else {
        setSnackbarVisible(true);
        setIsLoading(false);
        setSnackbarMessage(res.data.message);
        setSnackbarStatus(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/images/arrow_back.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>6-digit code</Text>

      <Text style={styles.subtitle}>
        Code sent to +91 {mobile} unless you already have an account
      </Text>
      <View style={styles.otpContainer}>
      {otp.split('').map((digit, index) => (
        <TextInput
          key={index}
          value={digit}
          onChangeText={(value) => handleInputChange(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          ref={(input) => (inputs.current[index] = input)}
          style={styles.otpInput}
        />
      ))}
    </View>

      <Text style={styles.resendText}>Resend code in 00:18</Text>
      <Text style={styles.loginText}>Already have an account? Log in</Text>

      <Button
        title="Verify"
        style={styles.button}
        onPress={handleVerify}
        loading={isLoading}
      />
       <CustomSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        status={snackbarStatus}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop : 20
  },
  backButton: {
    width: 25,
    height: 25,
    marginRight: 16,
  },
  backIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#9E9E9E',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 55,
    height: 55,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  resendText: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 10,
    textAlign: 'start',
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'start',
  },
  button: {
    backgroundColor: '#BD8C2A', 
    margin : "auto",
    width: '100%',
    borderRadius: 30,
  },
});

export default OtpScreen;
