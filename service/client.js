import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local_storage from '../constants/local_storage';

const BASE_URL = 'https://dev-hotel-api.wattinventive.com/';

export const apiPost = async (url, data) => {
  try {
    const token = await AsyncStorage.getItem(local_storage.Token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    const response = await axios.post(BASE_URL + url, data);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
        
      await AsyncStorage.removeItem(local_storage.Token);
    }
    return error.response || error;
  }
};

export const apiGet = async (url) => {
  try {
    const token = await AsyncStorage.getItem(local_storage.Token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    const response = await axios.get(BASE_URL + url);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem(local_storage.Token);
    }
    return error.response || error;
  }
};

export const apiDel = async (url) => {
  try {
    const token = await AsyncStorage.getItem(local_storage.Token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    const response = await axios.delete(BASE_URL + url);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem(local_storage.Token);
    }
    return error.response || error;
  }
};
