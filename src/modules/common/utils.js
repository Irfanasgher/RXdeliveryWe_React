/* global window */
import { useMemo } from 'react';
import jwt_decode from 'jwt-decode';
import Geocode from 'react-geocode';
import tzlookup from 'tz-lookup';
import moment from 'moment';
import momentTz from 'moment-timezone';
import * as _ from 'lodash';

import { GOOGLE_MAPS_API_KEY } from '../../constants/config';

const host = window.location.origin;

export const getUserId = () => {
  return localStorage.getItem(`${host}_accessToken`);
};

export const setAccessToken = (token) => {
  localStorage.setItem(`${host}_accessToken`, token);
};

export const setIdToken = (token) => {
  localStorage.setItem(`${host}_idToken`, token);
};

export const setLastAuthCallTimeStamp = (value) => {
  localStorage.setItem(`${host}_lastAuthCallTimeStamp`, value);
};

export const setRefreshToken = (value) => {
  localStorage.setItem(`${host}_refreshToken`, value);
};

export const setSessionCookies = (user) => {
  const decodedToken = jwt_decode(user.data.id_token);
  window.localStorage[`${host}_role`] = decodedToken[`custom:role`];
  window.localStorage[`${host}_refreshToken`] = user.data.refresh_token;
  window.localStorage[`${host}_idToken`] = user.data.id_token;
  window.localStorage[`${host}_accessToken`] = user.data.access_token;
  window.localStorage[`${host}_username`] = decodedToken[`cognito:username`];
  window.localStorage[`${host}_lastAuthCallTimeStamp`] = decodedToken['auth_time'];
  window.localStorage[`${host}_refreshTokenExpireTime`] = decodedToken['exp'];
};

export const unSetSessionCookies = () => {
  localStorage.removeItem(`${host}_lastAuthCallTimeStamp`);
  localStorage.removeItem(`${host}_refreshTokenExpireTime`);
  localStorage.removeItem(`${host}_refreshToken`);
  localStorage.removeItem(`${host}_idToken`);
  localStorage.removeItem(`${host}_accessToken`);
  localStorage.removeItem(`${host}_role`);
  localStorage.removeItem(`${host}_username`);
};

//Adding Google Map functionality
Geocode.setApiKey(GOOGLE_MAPS_API_KEY);

//Get Coordinates function from google maps
export const getCoordinates = async (address) => {
  return Geocode.fromAddress(address).then(
    (response) => {
      const result = response.results[0].geometry.location;
      return result;
    },
    (error) => {
      console.error(error);
    }
  );
};

//Get Coordinates function from google maps
export const getAddress = async (coordinates) => {
  return Geocode.fromLatLng(coordinates).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
};

// hardcoded user roles
export const SCOPE = {
  ADMIN: 'aws.cognito.signin.user.admin',
  PHARMACIST: 'aws.cognito.signin.user.pharmacist',
};

//decode access token
export const getUserRole = () => {
  return localStorage.getItem(`${host}_role`);
};

export const USER_ROLE = localStorage.getItem(`${host}_role`);
export const getUser = () => getUserId() && jwt_decode(localStorage.getItem(`${host}_idToken`));

export const getTenantId = (user) => {
  if (!_.isNil(user)) {
    let decodedToken = jwt_decode(user.data.id_token);
    return decodedToken['custom:tenant_id'];
  } else {
    let decodedToken = jwt_decode(localStorage.getItem(`${host}_idToken`));
    return decodedToken['custom:tenant_id'];
  }
};

export const useComponentWillMount = (func) => {
  useMemo(func, []);
};

/**
 * Get the city and return the city
 *
 * @param addressArray
 * @return {string}
 */
export const getCity = (addressArray) => {
  let city = '';
  let length = addressArray.length;
  for (let i = 0; i < length; i++) {
    if (addressArray[i]?.types[0] === 'locality') {
      city = addressArray[i].long_name;
      return city;
    }
  }
  return city;
};

/**
 * Get the Address Array and return the streetAddress
 *
 * @param addressArray
 * @return {string}
 */
export const getStreetAddress = (addressArray) => {
  let address = '';
  let length = addressArray.length;
  for (let i = 0; i < length; i++) {
    if (addressArray[i]?.types[0] === 'street_number') {
      address = address + ' ' + addressArray[i].long_name;
    } else if (addressArray[i]?.types[0] === 'route') {
      address = address + ' ' + addressArray[i].long_name;
    }
  }
  return address.trim();
};

/**
 * Get the area and set the zipCode
 *
 * @param addressArray
 * @return {string}
 */

export const getZipCode = (addressArray) => {
  let zipCode = '';
  let length = addressArray.length;
  for (let i = 0; i < length; i++) {
    if (addressArray[i]?.types[0] === 'postal_code') {
      zipCode = addressArray[i].long_name;
      return zipCode;
    }
  }
  return zipCode;
};

/**
 * Get the address and return the state
 * @param addressArray
 * @return {string}
 */
export const getState = (addressArray) => {
  let state = '';
  let length = addressArray.length;
  for (let i = 0; i < length; i++) {
    if (addressArray[i]?.types[0] === 'administrative_area_level_1') {
      state = addressArray[i].long_name;
      return state;
    }
  }
  return state;
};

//Convert UTC time to local Pharmacy Time
export const getLocalTime = (time, pharmacy) => {
  let localTime = undefined;
  if (!_.isNil(time) && !_.isEmpty(pharmacy)) {
    let dateString = moment(time);
    let timezone = tzlookup(pharmacy.latitude, pharmacy.longitude);
    let res = momentTz(dateString).tz(timezone);
    localTime = moment(res);
  }
  return localTime;
};

export const getStartUnix = (value) => {
  let start;
  switch (value) {
    case 'today':
      start = moment().startOf('day').valueOf();
      break;
    case '7days':
      start = moment().subtract(7, 'd').startOf('day').valueOf();
      break;
    case '30days':
      start = moment().subtract(30, 'd').valueOf();
      break;
    default:
      break;
  }
  return start;
};
