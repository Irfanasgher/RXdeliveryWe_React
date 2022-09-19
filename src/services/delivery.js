import axios from 'axios';

import { DELIVERY_BASE_URL, ORIGIN } from '../constants/config/index';
import { apiWrapper, errorInterceptor, requestInterceptor } from './interceptors';

const request = axios.create({
  baseURL: DELIVERY_BASE_URL,
  timeout: 30 * 1000,
});
request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);

const api = {
  getDeliveries: (params) => {
    return new Promise((resolve, reject) => {
      request
        .get('/delivery', { params })
        .then((res) => {
          const { data } = res;
          const tempData = data.data.rows;
          resolve({ data: tempData });
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  },
  getDeliveryById: (params) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/delivery/${params.id}/${params.prescriptionReferenceNumber}`)
        .then((res) => {
          const { data } = res.data;
          resolve({ data });
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  },
  getDeliveriesBySearch: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .get(`${ORIGIN}/mockData/recentDeliveries.json`)
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
  getRecentDeliveries: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .get('/delivery', { params: { status: 'delivered' } })
        .then((res) => {
          const { data } = res;
          const tempData = data.data.rows;
          resolve({ data: tempData });
        })
        .catch(() => {
          reject();
        });
    });
  },

  getPendingDeliveriesByRange: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .get(`${ORIGIN}/mockData/pendingDeliveries.json`)
        .then((res) => {
          const { data } = res;
          const tempData = data;
          resolve({ data: tempData });
        })
        .catch(() => {
          reject();
        });
    });
  },

  getPendingDeliveriesByDate: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .get(`${ORIGIN}/mockData/pendingDeliveries.json`)
        .then((res) => {
          const { data } = res;
          const tempData = data;
          resolve({ data: tempData });
        })
        .catch(() => {
          reject();
        });
    });
  },

  getPendingDeliveriesByWeek: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .get(`${ORIGIN}/mockData/pendingDeliveries.json`)
        .then((res) => {
          const { data } = res;
          const tempData = data;
          resolve({ data: tempData });
        })
        .catch(() => {
          reject();
        });
    });
  },

  getPendingDeliveriesByMonth: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .get(`${ORIGIN}/mockData/pendingDeliveries.json`)
        .then((res) => {
          const { data } = res;
          const tempData = data;
          resolve({ data: tempData });
        })
        .catch(() => {
          reject();
        });
    });
  },
  createDelivery: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .post(`/delivery`, payload)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch(() => {
          reject();
        });
    });
  },
  updateDelivery: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .put(`delivery/${payload.id}/${payload.prescriptionReferenceNumber}`, payload)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch(() => {
          reject();
        });
    });
  },
  cancelDelivery: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .delete(`delivery/${payload.id}/${payload.prescriptionReferenceNumber}`)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default apiWrapper(api);
