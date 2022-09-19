import { call, take, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { message as antMessage } from 'antd';

import pharmacistApi from '../../services/pharmacist';
import pharmacistActions, { GET_PHARMACIST, SWITCH_PHARMACY } from './actions';

import pharmacyApi from '../../services/pharmacy';
import pharmacyActions from '../pharmacy/actions';

export function* handleGetPharmacist() {
  while (true) {
    try {
      const { payload } = yield take(GET_PHARMACIST.REQUEST);
      const { data } = yield call(pharmacistApi.getPharmacist, payload);
      yield put(pharmacistActions.getPharmacist.success(data));
      const pharmacyData = yield call(pharmacyApi.getPharmacy, data.activePharmacy);
      yield put(pharmacyActions.getPharmacy.success(pharmacyData.data));
    } catch (error) {
      console.log(error);
      antMessage.error(error.message);
      yield put(pharmacistActions.getPharmacist.failure(error));
    }
  }
}

export function* handleSwitchPharmacy() {
  while (true) {
    try {
      const { payload } = yield take(SWITCH_PHARMACY.REQUEST);
      const { data } = yield call(pharmacistApi.switchPharmacy, payload);
      yield put(pharmacistActions.switchPharmacy.success(data));
      const pharmacyData = yield call(pharmacyApi.getPharmacy, data.activePharmacy);
      yield put(pharmacyActions.getPharmacy.success(pharmacyData.data));
      yield put(push('/dashboard'));
    } catch (error) {
      // console.log(error);
      antMessage.error(error.message);
      yield put(pharmacistActions.switchPharmacy.failure(error));
    }
  }
}
