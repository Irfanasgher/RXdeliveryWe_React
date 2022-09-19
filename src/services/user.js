import axios from 'axios';

import { USERS_BASE_URL } from '../constants/config/index';
import { apiWrapper, errorInterceptor, requestInterceptor } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL, timeout: 30 * 1000 });
request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);

const api = {
  getProfile: (payload) => {
    return new Promise((resolve, reject) => {
      request
        // .get(`/user/${payload}`)
        .get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          const { data } = res;
          const tempData = data[0];
          resolve({ data: tempData });
        })
        .catch(() => {
          reject();
        });
    });
  },
  updateProfile: (data) => {
    const newData = { [data.name]: data.value };
    return new Promise((resolve, reject) => {
      request
        .patch('/user/', newData)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch(() => {
          reject();
        });
    });
  },
};

export default apiWrapper(api);
