import axios from 'axios';

import { PHARMACIST_BASE_URL } from '../constants/config/index';
import { apiWrapper, errorInterceptor, requestInterceptor } from './interceptors';

const request = axios.create({
  baseURL: PHARMACIST_BASE_URL,
  timeout: 30 * 1000,
});
request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);

const api = {
  registerPharmacist: (data) => {
    return new Promise((resolve, reject) => {
      request
        .post('/pharmacist', data)
        .then((res) => {
          // console.log(res);
          resolve(res);
        })
        .catch((err) => {
          if (err?.response?.data) {
            reject(err.response.data);
          } else {
            reject(err);
          }
        });
    });
  },
  getPharmacist: (params) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/pharmacist/${params}`)
        .then((res) => {
          const { data } = res;
          const tempData = data.data;
          resolve({ data: tempData });
        })
        .catch((err) => {
          if (err?.response?.data) {
            reject(err.response.data);
          } else {
            reject(err);
          }
        });
    });
  },
  switchPharmacy: (params) => {
    return new Promise((resolve, reject) => {
      request
        .put(`/switch-pharmacy/${params.id}`, params.data)
        .then((res) => {
          const { data } = res;
          const tempData = data.data;
          resolve({ data: tempData });
        })
        .catch((err) => {
          if (err?.response?.data) {
            reject(err.response.data);
          } else {
            reject(err);
          }
        });
    });
  },
};

export default apiWrapper(api);
