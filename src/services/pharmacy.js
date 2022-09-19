import axios from 'axios';

import { CREATE_PHARMACY_BASE_URL } from '../constants/config/index';
import { apiWrapper, errorInterceptor, requestInterceptor } from './interceptors';
import { notification } from 'antd';

const request = axios.create({
  baseURL: CREATE_PHARMACY_BASE_URL,
  timeout: 30 * 1000,
});
request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);

const api = {
  getAllPharmacies: (data) => {
    return new Promise((resolve, reject) => {
      request
        .get('/pharmacy')
        .then((res) => {
          const { data } = res;
          const tempData = data.data.rows;
          resolve({ data: tempData });
        })
        .catch((err) => {
          if (err?.response?.data) {
            reject(err.response.data);
          } else {
            notification.warning(err);
            reject(err);
          }
        });
    });
  },
  getPharmacy: (data) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/pharmacy/${data.id}/${data.name}`)
        .then((res) => {
          const { data } = res;
          const tempData = data.data;
          resolve({ data: tempData });
        })
        .catch((err) => {
          if (err?.response?.data) {
            reject(err.response.data);
          } else {
            notification.warning(err);
            reject(err);
          }
        });
    });
  },
  registerPharmacy: (data) => {
    return new Promise((resolve, reject) => {
      request
        .post('/pharmacy', data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err.response.data);
        });
    });
  },
};

export default apiWrapper(api);
