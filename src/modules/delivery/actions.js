import { createRequestTypes, action } from '../common/actions';

export const GET_DELIVERIES = createRequestTypes('GET_DELIVERIES');
export const GET_DELIVERIES_BY_SEARCH = createRequestTypes('GET_DELIVERIES_BY_SEARCH');
export const GET_RECENT_DELIVERIES = createRequestTypes('GET_RECENT_DELIVERIES');
export const GET_PENDING_DELIVERIES = createRequestTypes('GET_PENDING_DELIVERIES');
export const GET_EXCEPTION_DELIVERIES = createRequestTypes('GET_EXCEPTION_DELIVERIES');
export const GET_PENDING_DELIVERIES_BY_RANGE = createRequestTypes('GET_PENDING_DELIVERIES_BY_RANGE');
export const GET_PENDING_DELIVERIES_BY_DATE = createRequestTypes('GET_PENDING_DELIVERIES_BY_DATE');
export const GET_PENDING_DELIVERIES_BY_WEEK = createRequestTypes('GET_PENDING_DELIVERIES_BY_WEEK');
export const GET_PENDING_DELIVERIES_BY_MONTH = createRequestTypes('GET_PENDING_DELIVERIES_BY_MONTH');
export const GET_DELVIERY_BY_ID = createRequestTypes('GET_DELVIERY_BY_ID');
export const GET_STATISTICS = createRequestTypes('GET_STATISTICS');
export const UPDATE_INPROGRESS = createRequestTypes('UPDATE_INPROGRESS');
export const UPDATE_DELIVERED = createRequestTypes('UPDATE_DELIVERED');
export const UPDATE_EXCEPTIONS = createRequestTypes('UPDATE_EXCEPTIONS');
export const UPDATE_FILTER = createRequestTypes('UPDATE_FILTER');

const userActions = {
  getDeliveries: {
    request: (data) => action(GET_DELIVERIES.REQUEST, { payload: data }),
    success: (data) => action(GET_DELIVERIES.SUCCESS, { payload: data }),
    failure: (error) => {
      return action(GET_DELIVERIES.FAILURE, { payload: error });
    },
  },
  getDeliveryById: {
    request: (data) => action(GET_DELVIERY_BY_ID.REQUEST, { payload: data }),
    success: (data) => action(GET_DELVIERY_BY_ID.SUCCESS, { payload: data }),
    failure: (error) => action(GET_DELVIERY_BY_ID.FAILURE, { payload: error }),
  },
  getDeliveriesBySearch: {
    request: (data) => action(GET_DELIVERIES_BY_SEARCH.REQUEST, { payload: data }),
    success: (data) => action(GET_DELIVERIES_BY_SEARCH.SUCCESS, { payload: data }),
    failure: (error) => action(GET_DELIVERIES_BY_SEARCH.FAILURE, { payload: error }),
  },
  getRecentDeliveries: {
    request: (data) => action(GET_RECENT_DELIVERIES.REQUEST, { payload: data }),
    success: (data) => action(GET_RECENT_DELIVERIES.SUCCESS, { payload: data }),
    failure: (error) => action(GET_RECENT_DELIVERIES.FAILURE, { payload: error }),
  },
  getPendingDeliveries: {
    request: (data) => action(GET_PENDING_DELIVERIES.REQUEST, { payload: data }),
    success: (data) => action(GET_PENDING_DELIVERIES.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PENDING_DELIVERIES.FAILURE, { payload: error }),
  },
  getExceptionDeliveries: {
    request: (data) => action(GET_EXCEPTION_DELIVERIES.REQUEST, { payload: data }),
    success: (data) => action(GET_EXCEPTION_DELIVERIES.SUCCESS, { payload: data }),
    failure: (error) => action(GET_EXCEPTION_DELIVERIES.FAILURE, { payload: error }),
  },
  getPendingDeliveriesByRange: {
    request: (data) => action(GET_PENDING_DELIVERIES_BY_RANGE.REQUEST, { payload: data }),
    success: (data) => action(GET_PENDING_DELIVERIES_BY_RANGE.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PENDING_DELIVERIES_BY_RANGE.FAILURE, { payload: error }),
  },
  getPendingDeliveriesByDate: {
    request: (data) => action(GET_PENDING_DELIVERIES_BY_DATE.REQUEST, { payload: data }),
    success: (data) => action(GET_PENDING_DELIVERIES_BY_DATE.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PENDING_DELIVERIES_BY_DATE.FAILURE, { payload: error }),
  },
  getPendingDeliveriesByWeek: {
    request: (data) => action(GET_PENDING_DELIVERIES_BY_WEEK.REQUEST, { payload: data }),
    success: (data) => action(GET_PENDING_DELIVERIES_BY_WEEK.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PENDING_DELIVERIES_BY_WEEK.FAILURE, { payload: error }),
  },
  getPendingDeliveriesByMonth: {
    request: (data) => action(GET_PENDING_DELIVERIES_BY_MONTH.REQUEST, { payload: data }),
    success: (data) => action(GET_PENDING_DELIVERIES_BY_MONTH.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PENDING_DELIVERIES_BY_MONTH.FAILURE, { payload: error }),
  },
  getStatistics: {
    request: (data) => action(GET_STATISTICS.REQUEST, { payload: data }),
    success: (data) => action(GET_STATISTICS.SUCCESS, { payload: data }),
    failure: (error) => action(GET_STATISTICS.FAILURE, { payload: error }),
  },
  updateInProgress: {
    request: (data) => action(UPDATE_INPROGRESS.REQUEST, { payload: data }),
    success: (data) => action(UPDATE_INPROGRESS.SUCCESS, { payload: data }),
    failure: (error) => action(UPDATE_INPROGRESS.FAILURE, { payload: error }),
  },
  updateDelivered: {
    request: (data) => action(UPDATE_DELIVERED.REQUEST, { payload: data }),
    success: (data) => action(UPDATE_DELIVERED.SUCCESS, { payload: data }),
    failure: (error) => action(UPDATE_DELIVERED.FAILURE, { payload: error }),
  },
  updateExcetpions: {
    request: (data) => action(UPDATE_EXCEPTIONS.REQUEST, { payload: data }),
    success: (data) => action(UPDATE_EXCEPTIONS.SUCCESS, { payload: data }),
    failure: (error) => action(UPDATE_EXCEPTIONS.FAILURE, { payload: error }),
  },
  updateFilter: {
    request: (data) => action(UPDATE_FILTER.REQUEST, { payload: data }),
    success: (data) => action(UPDATE_FILTER.SUCCESS, { payload: data }),
    failure: (error) => action(UPDATE_FILTER.FAILURE, { payload: error }),
  },
};

export default userActions;
