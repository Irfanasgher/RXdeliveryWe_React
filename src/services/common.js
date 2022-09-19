import axios from 'axios';

import { USERS_BASE_URL, FRONTEND, STREAMNAME_API_FRONTEND } from '../constants/config/index';
import { apiWrapper, errorInterceptor, requestInterceptor } from './interceptors';
import { logErrors } from '../modules/common/utils';

const request = axios.create({ baseURL: USERS_BASE_URL });
request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);

const api = {
  getConfiguration: () => {
    return new Promise((resolve, reject) => {
      request
        .get('/configuration')
        .then((res) => {
          const { data } = res;
          resolve({ data });
        })
        .catch((error) => {
          logErrors(FRONTEND, 'getConfiguration_failiure', error, STREAMNAME_API_FRONTEND);
          reject(error);
        });
    });
  },
  checkHead: (payload) => {
    const { url } = payload;
    return new Promise((resolve, reject) => {
      request
        .head(url)
        .then(() => {
          resolve();
        })
        .catch(() => {
          logErrors(FRONTEND, 'checkHead_success_failiure', 'error', STREAMNAME_API_FRONTEND);
          reject();
        });
    });
  },
};

export default apiWrapper(api);
