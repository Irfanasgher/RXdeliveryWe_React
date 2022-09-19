import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { store } from '../index';

import { authApi } from './auth';
import {
  setLastAuthCallTimeStamp,
  setIdToken,
  setRefreshToken,
  setAccessToken,
  setSessionCookies,
} from '../modules/common/utils';

const host = window.location.origin;

export const requestInterceptor = async (config) => {
  try {
    const utcDate = (moment().unix() + 60).toString();
    if (utcDate >= window.localStorage[`${host}_refreshTokenExpireTime`]) {
      await authApi.refreshToken().then(({ data }) => {
        setSessionCookies(data);
        config.headers.common.Authorization = `Bearer ${window.localStorage[`${host}_idToken`]}`;
        config.headers.common['X-Access-Token'] = window.localStorage[`${host}_accessToken`];
      });
    } else {
      config.headers.common.Authorization = window.localStorage[`${host}_idToken`];
      config.headers.common['X-Access-Token'] = window.localStorage[`${host}_accessToken`];
    }
  } catch (e) {
    console.log(e);
  }

  return config;
};

export const errorInterceptor = (error) => {
  if (error.message === 'Network Error') {
    return Promise.reject({
      message: 'Something went wrong.  Please try again.',
      code: 500,
    });
  }
  if (error.response) {
    if (
      error.response.status === 401 &&
      error.response.config &&
      !error.response.config.__isRetryRequest // eslint-disable-line no-underscore-dangle
    ) {
      authApi
        .refreshToken()
        .then(({ data }) => {
          setLastAuthCallTimeStamp(moment().valueOf());
          setAccessToken(data.data.access_token);
          setIdToken(data.data.id_token);
          setRefreshToken(data.data.refresh_token);
          // update the error config with new token
          error.response.config.__isRetryRequest = true; // eslint-disable-line no-underscore-dangle
          error.response.config.headers.Authorization = data.data.id_token; // getIdToken();
          error.response.config.headers.AccessToken = data.data.access_token; // getAccessToken();

          const request = axios.create();

          request.interceptors.response.use(null, errorInterceptor);
          request.interceptors.request.use(requestInterceptor);

          return request(error.response.config);
        })
        .catch(() => {
          if (store) {
            store.dispatch({
              type: 'SIGNOUT_REQUEST',
              payload: {},
            });
          }
          return Promise.reject({
            message: 'Something went wrong.  Please try again.',
            code: 500,
          });
        });
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

/**
 * Custom Api Wrapper to handle unhandled exceptions/error
 * @param {object} api - api object containing all api functions e.g. { login: (data) => {}, logout: () => {}}
 * @param {array} exclude - Array of function names in api which we don't want to add this error handling
 */
export const apiWrapper = (api, exclude = []) => {
  const newApi = {};
  _.keys(api).forEach((func) => {
    if (_.includes(exclude, func)) {
      newApi[func] = api[func];
      return;
    }
    newApi[func] = (...args) => {
      return new Promise((resolve, reject) => {
        api[func](...args)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error && error.response && error.response.data && error.response.data.message) {
              return reject({ message: error.response.data.message });
            }
            if (error && error.message) {
              return reject(error);
            }
            return reject({
              message: 'Something went wrong.  Please try again.',
              code: 500,
            });
          });
      });
    };
  });
  return newApi;
};
