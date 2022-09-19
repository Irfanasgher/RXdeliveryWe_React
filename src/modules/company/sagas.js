import { call, take, put } from 'redux-saga/effects';

import companyActions, { GET_COMPANY } from './actions';

import companyApi from '../../services/company';

export function* handleGetCompany() {
  while (true) {
    try {
      const { payload } = yield take(GET_COMPANY.REQUEST);
      const { data } = yield call(companyApi.getCompany, payload);
      yield put(companyActions.getCompany.success(data));
    } catch (error) {
      yield put(companyActions.getCompany.failure(error));
    }
  }
}
