import { fork, all } from 'redux-saga/effects';

import {
  handleSigninSubmit,
  handleSignout,
  handleForgotPassword,
  handleForgotPasswordSubmit,
  handleChangePassword,
  refreshTokenonInterval,
} from './auth/sagas';

import { handleGetProfile, handleUpdateProfile } from './users/sagas';
import {
  handleGetDeliveries,
  handleGetDelieveryById,
  handleGetDeliveriesBySearch,
  handleGetRecentDeliveries,
  handleGetPendingDeliveries,
  handleGetExceptionDeliveries,
  handleGetPendingDeliveriesByRange,
  handleGetPendingDeliveriesByDate,
  handleGetPendingDeliveriesByWeek,
  handleGetPendingDeliveriesByMonth,
  handleGetStatistics,
  handleUpdateInprogress,
  handleUpdateDelivered,
  handleUpdateExceptions,
  hanldeUpdateFilter,
} from './delivery/sagas';
import { handleGetCompany } from './company/sagas';
import { handleGetPharmacist, handleSwitchPharmacy } from './pharmacist/sagas';
import { handleGetPharmacy, handleGetAllPharmacies } from './pharmacy/sagas';

export default function* rootSaga() {
  yield all([
    // Auth
    fork(handleSigninSubmit),
    fork(handleSignout),
    fork(handleForgotPassword),
    fork(handleForgotPasswordSubmit),
    fork(handleChangePassword),
    fork(refreshTokenonInterval),

    // Users
    fork(handleGetProfile),
    fork(handleUpdateProfile),

    // Deliveries
    fork(handleGetDeliveries),
    fork(handleGetDelieveryById),
    fork(handleGetDeliveriesBySearch),
    fork(handleGetRecentDeliveries),
    fork(handleGetPendingDeliveries),
    fork(handleGetExceptionDeliveries),
    fork(handleGetPendingDeliveriesByRange),
    fork(handleGetPendingDeliveriesByDate),
    fork(handleGetPendingDeliveriesByWeek),
    fork(handleGetPendingDeliveriesByMonth),
    fork(handleGetStatistics),
    fork(handleUpdateInprogress),
    fork(handleUpdateDelivered),
    fork(handleUpdateExceptions),
    fork(hanldeUpdateFilter),
    //company
    fork(handleGetCompany),

    //pharmacist
    fork(handleGetPharmacist),
    fork(handleSwitchPharmacy),

    //pharmacy
    fork(handleGetPharmacy),
    fork(handleGetAllPharmacies),
  ]);
}
