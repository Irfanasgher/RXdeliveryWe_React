import { call, take, put, takeLatest } from 'redux-saga/effects';

import userActions, { GET_PROFILE, UPDATE_PROFILE } from './actions';

import UserApi from '../../services/user';

export function* handleGetProfile() {
  while (true) {
    try {
      const { payload } = yield take(GET_PROFILE.REQUEST);
      const { data } = yield call(UserApi.getProfile, payload);
      yield put(userActions.getProfile.success(data));
    } catch (error) {
      yield put(userActions.getProfile.failure(error));
    }
  }
}

export function* updateProfile({ payload }) {
  try {
    // const { payload } = yield take(UPDATE_PROFILE.REQUEST);
    const { data } = yield call(UserApi.updateProfile, payload);
    yield put(userActions.updateProfile.success(payload));
    yield put(userActions.getProfile.success(data));

    // TODO : can be later used when we have mfa flow
    // let openMfa = false;
    // if (payload.name === 'email' || payload.name === 'phone_number') {
    //   openMfa = true;
    // }

    // if (data.email_verified === false) {
    //   if (openMfa) {
    //     yield put(authActions.openMFA('emailVerification'));
    //   }
    // } else if (data.phone_number_verified === false) {
    //   if (openMfa) {
    //     yield put(authActions.openMFA('phoneVerification'));
    //   }
    // }
  } catch (error) {
    yield put(userActions.updateProfile.failure(error));
  }
}

export function* handleUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE.REQUEST, updateProfile);
}
