import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local_storage from '../constants/local_storage';
import {apiPost} from '../service/client';
import CustomSnackbar from '../components/snackbar';
import {
  getIsLoggedIn,
  getUserData,
  saveBookRoomData,
  saveHotelData,
  saveUserData,
  setIsLoggedIn,
} from '../DataStore/DataStore';
import {makeApiCall} from '../service/ApiService';
import {API_CALL_TYPE} from '../utils/AppConstant';
import {OTP_VERIFY_API} from '../service/Api';
import AppContext from '../Context/AppContext';
import {
  UPDATE_CURRENT_HOTEL,
  UPDATE_ROOM_DATA,
  UPDATE_USER_DATA,
} from '../Context/actionType';

const OtpScreen = () => {
  const {Context, dispatch} = useContext(AppContext);
  const navigation = useNavigation();
  const route = useRoute();
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

  const handleVerify = async () => {
    setIsLoading(true);
    console.log(otp);
    const data = {
      otp: parseInt(otp, 10), // Convert OTP to integer
      mobile,
    };
    console.log('data', data);

    makeApiCall(
      API_CALL_TYPE.POST_CALL,
      OTP_VERIFY_API(),
      response => {
        console.log('otp screen response', JSON.stringify(response));
        setIsLoading(false);

        if (response.status && response.data) {
          // Save the token and user data
          const userData = {
            ...response.data.user,
            token: response.data.token,
          };

          // Save all required data
          setIsLoggedIn(true).then(() => {
            dispatch({
              type: UPDATE_USER_DATA,
              currentUserData: userData,
            });
            saveUserData(userData);

            if (response.data.hotel) {
              dispatch({
                type: UPDATE_CURRENT_HOTEL,
                currentHotelData: response.data.hotel,
              });
              saveHotelData(response.data.hotel);
            }

            if (response.data.bookRoomData) {
              dispatch({
                type: UPDATE_ROOM_DATA,
                currentRoomData: response.data.bookRoomData,
              });
              saveBookRoomData(response.data.bookRoomData);
            }

            // Also save to AsyncStorage for backward compatibility
            if (response.data.token) {
              AsyncStorage.setItem(local_storage.Token, response.data.token);
            }

            // Navigate to dashboard
            navigation.navigate('DashBoard');
          });
        } else {
          // Handle unsuccessful but not error response
          setSnackbarVisible(true);
          setSnackbarMessage(response.message || 'Verification failed');
          setSnackbarStatus(false);
        }
      },
      error => {
        console.log('onError', error);
        setSnackbarVisible(true);
        setIsLoading(false);
        setSnackbarMessage(
          error.response?.data?.message || 'Verification failed',
        );
        setSnackbarStatus(false);
      },
      null, // formData parameter (not needed for JSON)
      data, // body parameter - this is your JSON data with integer OTP
      {'Content-Type': 'application/json'}, // Explicitly set content type to JSON
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../assets/images/arrow_back.png')}
            style={styles.backIcon}
          />
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
            onChangeText={value => handleInputChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={input => (inputs.current[index] = input)}
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
    marginTop: 20,
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
    margin: 'auto',
    width: '100%',
    borderRadius: 30,
  },
});

export default OtpScreen;
