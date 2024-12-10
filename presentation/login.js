import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/style';
import {apiPost} from '../service/client';
import CustomSnackbar from '../components/snackbar';
import fontFamily from '../components/fontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local_storage from '../constants/local_storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState(true);

  const onSubmit = async data => {
    console.log(phoneNumber);
    setLoading(true);
    const data1 = {phoneNumber};
    try {
      const res = await apiPost('v1/customer/login', data1);
      console.log(res.data);
      if (res.status == 200) {
        await AsyncStorage.setItem(local_storage.Token, res.data.data.token);
        await AsyncStorage.setItem('Otp' , res.data.data.otp);
        console.log('token', res.data.data.token);
        setLoading(false);
        navigation.navigate('OtpScreen',{mobile : phoneNumber});
      } else {
        setSnackbarVisible(true);
        setLoading(false);
        setSnackbarMessage(res.data.message);
        setSnackbarStatus(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please enter your phone number to access your account
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[
                styles.input,
                styles.fontStyle,
                errors.phoneNumber && {borderColor: 'red'},
              ]}
              placeholder="Mobile Number"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
            />
          )}
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
        )}

        <TouchableOpacity>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Button is outside of KeyboardAvoidingView */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}>
        <Text style={globalStyles.buttonText}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>

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
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: fontFamily.SemiBold,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 8,
    fontFamily: fontFamily.Light,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    borderWidth: 0.4,
    borderColor: '#444',
  },
  fontStyle: {
    fontSize: 18,
    color: '#fff',
  },
  signUpText: {
    textAlign: 'start',
    color: '#bbb',
    marginTop: 20,
    fontSize: 16,
    fontFamily: fontFamily.Regular,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#BD8C2A',
    paddingVertical: 15,
    margin: 'auto',
    marginTop: 40,
    width: '100%',
    borderRadius: 30,
    fontFamily: fontFamily.SemiBold,
  },
});

export default LoginScreen;
