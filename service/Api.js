const API_URL = 'https://dev-hotel-api.wattinventive.com/';
export const LOGIN_API = () => {
  //   console.log(API_URL + `v1/customer/login`);
  return API_URL + `v1/customer/login`;
};
export const OTP_VERIFY_API = () => {
  //   console.log(API_URL + `customers/verify-otp`);
  return API_URL + `customers/verify-otp`;
};
