import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
};

export const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    return false;
  }
};

export const saveUserData = async data => {
  try {
    await storeData('user_data', JSON.stringify(data));
    return true;
  } catch (e) {}
};

export const getUserData = async () => {
  try {
    const data = await getData('user_data');
    if (data) {
      return JSON.parse(data);
    }
    return data;
  } catch (e) {}
};

export const saveHotelData = async data => {
  try {
    await storeData('hotel_data', JSON.stringify(data));
    return true;
  } catch (e) {}
};

export const getHotelData = async () => {
  try {
    const data = await getData('hotel_data');
    if (data) {
      return JSON.parse(data);
    }
    return data;
  } catch (e) {}
};

export const saveBookRoomData = async data => {
  try {
    await storeData('room_data', JSON.stringify(data));
    return true;
  } catch (e) {}
};

export const getBookRoomData = async () => {
  try {
    const data = await getData('room_data');
    if (data) {
      return JSON.parse(data);
    }
    return data;
  } catch (e) {}
};

export const setIsLoggedIn = async value => {
  try {
    if (value) {
      await storeData('is_loggedin', 'true');
    } else {
      await storeData('is_loggedin', 'false');
    }
  } catch (e) {}
};

export const getIsLoggedIn = async () => {
  try {
    const data = await getData('is_loggedin');
    if (data === 'true') {
      return true;
    } else {
      return false;
    }
  } catch (e) {}
};
