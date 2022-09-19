import { Auth } from 'aws-amplify';
import axios from 'axios';

import { DEV_BASE_URL } from '../constants/config/index';

const host = window.location.origin;

export const signin = (payload) => {
  const { email, password } = payload;
  return new Promise((resolve, reject) => {
    Auth.signIn(email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const request = axios.create({
  baseURL: DEV_BASE_URL,
  timeout: 30 * 1000,
});

export const authApi = {
  signin: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .post(`/user/authentication`, payload)
        .then((res) => {
          if (!res.data.data) {
            return Promise.reject({
              message: res.data.message,
            });
          }
          resolve({ data: res.data });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  refreshToken: () => {
    return new Promise((resolve, reject) => {
      const payload = {
        email: localStorage.getItem(`${host}_username`),
        refreshToken: localStorage.getItem(`${host}_refreshToken`),
      };
      request
        .post(`/user/renew-tokens`, payload)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  requestForgotPassword: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .post(`/user/request-forgot-password`, payload)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  confirmForgotPassword: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .post(`/user/confirm-forgot-password`, payload)
        .then((res) => {
          resolve({ data: res.data });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export const changePassword = (payload) => {
  const { oldPassword, newPassword } = payload;
  return new Promise((resolve, reject) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const forgotPassword = (payload) => {
  const { email } = payload;
  return new Promise((resolve, reject) => {
    Auth.forgotPassword(email)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const forgotPasswordSubmit = (payload) => {
  const { email, code, password } = payload;
  return new Promise((resolve, reject) => {
    Auth.forgotPasswordSubmit(email, code, password)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      cognitoUser.refreshSession(currentSession.refreshToken, async (err, session) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    } catch (e) {
      console.log('Unable to refresh Token', e);
      reject(e);
    }
  });
};

export const signout = () => {
  return new Promise((resolve, reject) => {
    Auth.signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyCognitoAttribute = (payload) => {
  const { attribute } = payload;
  return new Promise((resolve, reject) => {
    Auth.verifyCurrentUserAttribute(attribute)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyCognitoAttributeSubmit = (payload) => {
  const { attribute, code } = payload;
  return new Promise((resolve, reject) => {
    Auth.verifyCurrentUserAttributeSubmit(attribute, code)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
