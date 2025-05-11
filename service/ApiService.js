import axios from 'axios';
// import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {BusinessData} from '../utils/AppConstant';
import {version} from '../package.json';
import {getUserData} from '../DataStore/DataStore';

const CancelToken = axios.CancelToken;
const axiosSource = CancelToken.source();

const API_CALL_TYPE = {
  GET_CALL: 'GET',
  POST_CALL: 'POST',
  PUT_CALL: 'PUT',
};

const getGenericHeaders = async passToken => {
  let token = '';
  try {
    const userData = await getUserData();
    if (userData && userData.token) {
      token = userData.token;
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'user-agent': `HotelApp-${Platform.OS}-(${version})`,
    token: token,
  };
  if (token) {
    headers['Authorization'] = token;
  }
  return headers;
};

const makeGetApiCall = async (
  url,
  callback,
  errorCallBack,
  passToken = false,
  headers,
) => {
  // console.log("makeGetApiCall url - ", url);
  let tempHeaders = await getGenericHeaders(passToken);
  if (headers) {
    tempHeaders = {...tempHeaders, ...headers};
  }
  // console.log("makeGetApiCall headers - ", tempHeaders);
  axios
    .get(url, {
      cancelToken: axiosSource.token,
      headers: tempHeaders,
    })
    .then(result => {
      if (callback && typeof callback === 'function') {
        callback(result.data);
      }
    })
    .catch(error => {
      if (errorCallBack && typeof errorCallBack === 'function') {
        errorCallBack(error);
      } else {
        console.error('Error in makeGetApiCall  error callback:', error);
      }
    });
};

const makePostApiCall = async (
  url,
  callback,
  errorCallBack,
  body,
  formData,
  isUrlEncoded = false,
  headers,
  isMultiPart = false,
) => {
  console.log('makePostApiCall url - ', url);
  console.log('makePostApiCall headers - ', headers);
  let tempHeaders = await getGenericHeaders();

  // Set the appropriate Content-Type based on the provided headers or defaults
  if (headers && headers['Content-Type']) {
    tempHeaders['Content-Type'] = headers['Content-Type'];
  } else {
    tempHeaders['Content-Type'] = isMultiPart
      ? 'multipart/form-data'
      : isUrlEncoded
      ? 'application/x-www-form-urlencoded'
      : 'application/json'; // Default to JSON instead of multipart/form-data
    tempHeaders['Authorization'] = tempHeaders.token;
  }

  if (headers) {
    // Merge other headers
    Object.keys(headers).forEach(key => {
      if (key !== 'Content-Type') {
        // Skip Content-Type as we've already handled it
        tempHeaders[key] = headers[key];
      }
    });
  }

  // console.log('makePostApiCall tempHeaders - ', tempHeaders);

  // Use the appropriate data format based on Content-Type
  const data =
    tempHeaders['Content-Type'] === 'application/json' &&
    typeof body === 'object'
      ? body
      : isUrlEncoded
      ? body
      : formData;

  console.log('axiopost DAta-', data);
  console.log('axiosSource.token-', axiosSource.token);

  axios
    .post(url, data, {
      cancelToken: axiosSource.token,
      headers: tempHeaders,
    })
    .then(result => {
      // console.log('makePostApiCall result - ', result);
      if (callback && typeof callback === 'function') {
        callback(result.data);
      }
    })
    .catch(error => {
      // console.log('makePostApiCall error - ', error);

      if (errorCallBack && typeof errorCallBack === 'function') {
        errorCallBack(error);
      } else {
        console.error('Error in makePostApiCall error callback:', error);
      }
    });
};

export const makeApiCall = (
  apiCallType,
  urlPath,
  callback,
  errorCallBack,
  formData,
  body = {},
  headers,
  isUrlEncoded = false,
  isMultiPart = false,
) => {
  // console.log('makeApiCall urlPath - ', urlPath);
  // console.log('makeApiCall headers - ', headers);
  if (apiCallType === API_CALL_TYPE.GET_CALL) {
    makeGetApiCall(urlPath, callback, errorCallBack, true, headers);
  } else if (apiCallType === API_CALL_TYPE.POST_CALL) {
    makePostApiCall(
      urlPath,
      callback,
      errorCallBack,
      body,
      formData,
      isUrlEncoded,
      headers,
      isMultiPart,
    );
  }
};
