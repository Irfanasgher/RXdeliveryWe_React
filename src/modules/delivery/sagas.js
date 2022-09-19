import { call, take, put } from 'redux-saga/effects';

import deliveryActions, {
  GET_DELIVERIES,
  GET_DELVIERY_BY_ID,
  GET_DELIVERIES_BY_SEARCH,
  GET_RECENT_DELIVERIES,
  GET_PENDING_DELIVERIES,
  GET_EXCEPTION_DELIVERIES,
  GET_PENDING_DELIVERIES_BY_RANGE,
  GET_PENDING_DELIVERIES_BY_DATE,
  GET_PENDING_DELIVERIES_BY_WEEK,
  GET_PENDING_DELIVERIES_BY_MONTH,
  GET_STATISTICS,
  UPDATE_INPROGRESS,
  UPDATE_DELIVERED,
  UPDATE_EXCEPTIONS,
  UPDATE_FILTER,
} from './actions';

import deliveryApi from '../../services/delivery';

export function* handleGetDeliveries() {
  while (true) {
    try {
      const { payload } = yield take(GET_DELIVERIES.REQUEST);
      const { data } = yield call(deliveryApi.getDeliveries, payload);
      yield put(deliveryActions.getDeliveries.success(data));
    } catch (error) {
      yield put(deliveryActions.getDeliveries.failure(error));
    }
  }
}

export function* handleGetDelieveryById() {
  while (true) {
    try {
      const { payload } = yield take(GET_DELVIERY_BY_ID.REQUEST);
      const { data } = yield call(deliveryApi.getDeliveryById, payload);
      yield put(deliveryActions.getDeliveryById.success(data));
    } catch (error) {
      yield put(deliveryActions.getDeliveryById.failure(error));
    }
  }
}

export function* handleGetDeliveriesBySearch() {
  while (true) {
    try {
      const { payload } = yield take(GET_DELIVERIES_BY_SEARCH.REQUEST);
      const { data } = yield call(deliveryApi.getDeliveriesBySearch, payload);
      yield put(deliveryActions.getDeliveriesBySearch.success(data));
    } catch (error) {
      yield put(deliveryActions.getDeliveriesBySearch.failure(error));
    }
  }
}
export function* handleGetRecentDeliveries() {
  while (true) {
    try {
      const { payload } = yield take(GET_RECENT_DELIVERIES.REQUEST);
      const { data } = yield call(deliveryApi.getDeliveries, payload);
      yield put(deliveryActions.getRecentDeliveries.success(data));
    } catch (error) {
      yield put(deliveryActions.getRecentDeliveries.failure(error));
    }
  }
}

export function* handleGetPendingDeliveries() {
  while (true) {
    try {
      const { payload } = yield take(GET_PENDING_DELIVERIES.REQUEST);
      const { data } = yield call(deliveryApi.getDeliveries, payload);
      yield put(deliveryActions.getPendingDeliveries.success(data));
    } catch (error) {
      yield put(deliveryActions.getPendingDeliveries.failure(error));
    }
  }
}

export function* handleGetExceptionDeliveries() {
  while (true) {
    try {
      const { payload } = yield take(GET_EXCEPTION_DELIVERIES.REQUEST);
      const { data } = yield call(deliveryApi.getDeliveries, payload);
      yield put(deliveryActions.getExceptionDeliveries.success(data));
    } catch (error) {
      yield put(deliveryActions.getExceptionDeliveries.failure(error));
    }
  }
}

export function* handleGetPendingDeliveriesByRange() {
  while (true) {
    try {
      const { payload } = yield take(GET_PENDING_DELIVERIES_BY_RANGE.REQUEST);
      const { data } = yield call(deliveryApi.getPendingDeliveriesByRange, payload);
      yield put(deliveryActions.getPendingDeliveriesByRange.success(data));
    } catch (error) {
      yield put(deliveryActions.getPendingDeliveriesByRange.failure(error));
    }
  }
}

export function* handleGetPendingDeliveriesByDate() {
  while (true) {
    try {
      const { payload } = yield take(GET_PENDING_DELIVERIES_BY_DATE.REQUEST);
      const { data } = yield call(deliveryApi.getPendingDeliveriesByDate, payload);
      yield put(deliveryActions.getPendingDeliveriesByDate.success(data));
    } catch (error) {
      yield put(deliveryActions.getPendingDeliveriesByDate.failure(error));
    }
  }
}

export function* handleGetPendingDeliveriesByWeek() {
  while (true) {
    try {
      const { payload } = yield take(GET_PENDING_DELIVERIES_BY_WEEK.REQUEST);
      const { data } = yield call(deliveryApi.getPendingDeliveriesByWeek, payload);
      yield put(deliveryActions.getPendingDeliveriesByWeek.success(data));
    } catch (error) {
      yield put(deliveryActions.getPendingDeliveriesByWeek.failure(error));
    }
  }
}

export function* handleGetPendingDeliveriesByMonth() {
  while (true) {
    try {
      const { payload } = yield take(GET_PENDING_DELIVERIES_BY_MONTH.REQUEST);
      const { data } = yield call(deliveryApi.getPendingDeliveriesByMonth, payload);
      yield put(deliveryActions.getPendingDeliveriesByMonth.success(data));
    } catch (error) {
      yield put(deliveryActions.getPendingDeliveriesByMonth.failure(error));
    }
  }
}

export function* handleGetStatistics() {
  while (true) {
    try {
      // console.log('function*handleGetStatistics -> payload');
      const { payload } = yield take(GET_STATISTICS.REQUEST);
      yield put(deliveryActions.getStatistics.success(payload));
    } catch (error) {
      yield put(deliveryActions.getStatistics.failure(error));
    }
  }
}

export function* handleUpdateInprogress() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_INPROGRESS.REQUEST);
      yield put(deliveryActions.updateInProgress.success(payload));
    } catch (error) {
      yield put(deliveryActions.updateInProgress.failure(error));
    }
  }
}

export function* handleUpdateDelivered() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_DELIVERED.REQUEST);
      yield put(deliveryActions.updateDelivered.success(payload));
    } catch (error) {
      yield put(deliveryActions.updateDelivered.failure(error));
    }
  }
}

export function* handleUpdateExceptions() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_EXCEPTIONS.REQUEST);
      yield put(deliveryActions.updateExcetpions.success(payload));
    } catch (error) {
      yield put(deliveryActions.updateExcetpions.failure(error));
    }
  }
}

export function* hanldeUpdateFilter() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_FILTER.REQUEST);
      yield put(deliveryActions.updateFilter.success(payload));
    } catch (error) {
      yield put(deliveryActions.updateFilter.failure(error));
    }
  }
}
