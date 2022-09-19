import { call, take, put } from 'redux-saga/effects';

import pharmacyActions, { GET_PHARMACY, GET_ALL_PHARMACIES } from './actions';

import pharmacyApi from '../../services/pharmacy';

export function* handleGetPharmacy() {
  while (true) {
    try {
      const { payload } = yield take(GET_PHARMACY.REQUEST);
      const { data } = yield call(pharmacyApi.getPharmacy, payload);
      yield put(pharmacyActions.getPharmacy.success(data));
    } catch (error) {
      yield put(pharmacyActions.getPharmacy.failure(error));
    }
  }
}

export function* handleGetAllPharmacies() {
  while (true) {
    try {
      const { payload } = yield take(GET_ALL_PHARMACIES.REQUEST);
      const { data } = yield call(pharmacyApi.getAllPharmacies, payload);
      yield put(pharmacyActions.getAllPharmacies.success(data));
    } catch (error) {
      yield put(pharmacyActions.getAllPharmacies.failure(error));
    }
  }
}
