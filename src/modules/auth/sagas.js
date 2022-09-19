import { call, take, put, select, delay } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as _ from 'lodash';
import { message as antMessage } from 'antd';
import jwt_decode from 'jwt-decode';
import authActions, { SIGNIN, SIGNOUT, FORGOT_PASSWORD, FORGOT_PASSWORD_SUBMIT, CHANGE_PASSWORD } from './actions';
import { REQUEST } from '../common/actions';
import { authApi, signout, forgotPassword, forgotPasswordSubmit, changePassword } from '../../services/auth';
import pharmacistApi from '../../services/pharmacist';
import pharmacistActions from '../pharmacist/actions';
import { roles } from '../../constants/strings';
import { setSessionCookies, unSetSessionCookies } from '../common/utils';
import deliveryActions from '../delivery/actions';
import { openStatusSocket, getWS } from '../../web-socket';

import pharmacyApi from '../../services/pharmacy';
import pharmacyActions from '../pharmacy/actions';

const client = getWS();

export function* handleSigninSubmit() {
  while (true) {
    try {
      const { payload } = yield take(SIGNIN[REQUEST]);
      const user = yield call(authApi.signin, payload);

      setSessionCookies(user.data);
      let decodedToken = jwt_decode(user.data.data.id_token);
      yield call(openStatusSocket, decodedToken['custom:tenant_id']);

      if (decodedToken['custom:role'] === roles.tenantUser) {
        const { data } = yield call(pharmacistApi.getPharmacist, decodedToken['cognito:username']);
        yield put(pharmacistActions.getPharmacist.success(data));

        const pharmacyData = yield call(pharmacyApi.getPharmacy, data.activePharmacy);
        yield put(pharmacyActions.getPharmacy.success(pharmacyData.data));
      }

      !_.isNil(client) &&
        (client.onmessage = ({ data }) => {
          console.log('on message called');
          let parsedData = JSON.parse(data);
          deliveryActions.getStatistics.success(parsedData.Statuses);
        });

      // TODO: For next phase
      // const { data } = yield call(UserApi.getProfile, getUserId());
      // yield put(userActions.getProfile.success(data));
      // yield put(authActions.signin.success(user));
      yield put(push('/dashboard'));

      // }
    } catch (error) {
      antMessage.error(error.message);
      yield put(authActions.signin.failure(error));
    }
  }
}

export function* handleSignout() {
  while (true) {
    try {
      const { payload } = yield take(SIGNOUT[REQUEST]);
      yield call(signout, payload);

      unSetSessionCookies();
      yield put(authActions.signout.success());
      !_.isNil(client) && client.close();
      yield put(push('/'));
      // window.location.href = '/';
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.signout.success({ code, message }));
    }
  }
}

export function* handleForgotPassword() {
  while (true) {
    try {
      const { payload } = yield take(FORGOT_PASSWORD[REQUEST]);
      const data = yield call(forgotPassword, payload);
      yield put(authActions.forgotPassword.success(data));
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.forgotPassword.failure({ code, message }));
      antMessage.error(message, 5);
    }
  }
}

export function* handleForgotPasswordSubmit() {
  while (true) {
    try {
      const { payload } = yield take(FORGOT_PASSWORD_SUBMIT[REQUEST]);
      const username = yield select((state) => state.authReducer.username);
      const params = {
        password: payload.password,
        code: payload.code,
        username,
      };
      const data = yield call(forgotPasswordSubmit, params);
      // yield put(authActions.openLogin('signin'));
      yield put(authActions.signin.request(params));
      yield put(authActions.forgotPasswordSubmit.success(data));
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.forgotPasswordSubmit.failure({ code, message }));
      antMessage.error(message, 5);
    }
  }
}

export function* handleChangePassword() {
  while (true) {
    try {
      const { payload } = yield take(CHANGE_PASSWORD[REQUEST]);
      const data = yield call(changePassword, payload);
      yield put(authActions.changePassword.success(data));
      antMessage.success('Your password is changed!', 3);
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.changePassword.failure({ code, message }));
      antMessage.error(message, 5);
    }
  }
}

// TODO: to be used later

// export function* handleAttributeVerification() {
//   while (true) {
//     try {
//       const { payload } = yield take(VERIFY_ATTRIBUTE[REQUEST]);
//       const data = yield call(verifyCognitoAttribute, payload);
//       yield put(authActions.verifyAttribute.success(data));
//       if (payload.attribute === 'email') {
//         antMessage.success('Verification code sent to your email');
//       } else if (payload.attribute === 'phone_number') {
//         antMessage.success('Verification code sent to your phone');
//       }
//     } catch (error) {
//       const { code, message } = error;
//       yield put(authActions.verifyAttribute.failure({ code, message }));
//       antMessage.error(message, 3);
//     }
//   }
// }

// export function* handleAttributeVerificationSubmit() {
//   while (true) {
//     try {
//       const { payload } = yield take(VERIFY_ATTRIBUTE_SUBMIT[REQUEST]);
//       const verifyData = yield call(verifyCognitoAttributeSubmit, payload);
//       yield put(authActions.verifyAttributeSubmit.success(verifyData));
//       const { data } = yield call(UserApi.getProfile, getUserId());
//       yield put(userActions.getProfile.success(data));
//       if (payload.attribute === 'email') {
//         antMessage.success('Your email is verified now!');
//       } else if (payload.attribute === 'phone_number') {
//         antMessage.success('Your phone is verified now!');
//       }
//     } catch (error) {
//       const { code, message } = error;
//       yield put(authActions.verifyAttributeSubmit.failure({ code, message }));
//       antMessage.error(message, 3);
//     }
//   }
// }

export function* refreshTokenonInterval() {
  yield delay(10 * 1000);
  // while (true) {
  //   console.log('Refreshing token', Date.now());
  //   try {
  //     const data = yield call(Auth.currentSession);
  //     console.log('Token');
  //   } catch (e) {
  //     console.log('Unable to refresh Token', e);
  //   } finally {
  //     yield call(delay, 10 * 1000);
  //   }
  // }
}
