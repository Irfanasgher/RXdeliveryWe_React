import axios from 'axios';

import { ORIGIN } from '../constants/config/index';
import { apiWrapper, errorInterceptor, requestInterceptor } from './interceptors';

const request = axios.create({
  baseURL: ORIGIN,
  timeout: 30 * 1000,
});

request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);

const api = {
  getCompany: (data) => {
    return new Promise((resolve, reject) => {
      request
        .post('/company')
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },

  createCompany: (data) => {
    return new Promise((resolve, reject) => {
      request
        .post('/company', data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },

  updateCompany: (data) => {
    return new Promise((resolve, reject) => {
      request
        .put('/company', data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },
};

export default apiWrapper(api);
