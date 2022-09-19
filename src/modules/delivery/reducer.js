import {
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

const defaultVisualState = {};
const initialState = {
  [GET_DELIVERIES]: { ...defaultVisualState },

  data: [],
  deliveries: [],
  inProgress: [],
  recentDeliveries: [],
  pendingDeliveries: [],
  exceptionDeliveries: [],
  filter: 'today',
  loading: false,
  loadingPending: false,
  loadingCompleted: false,
  isEditing: {},
  delivery: {},
  statistics: {
    pending: 0,
    accepted: 0,
    arrived_pickup: 0,
    picked_up: 0,
    dropped_off: 0,
    delivered: 0,
    cancelled: 0,
    failed: 0,
  },
};

function deliveryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DELIVERIES.REQUEST:
      return { ...state };

    case GET_DELIVERIES.SUCCESS:
      return {
        ...state,
        deliveries: payload,
      };

    case GET_DELIVERIES.FAILURE:
      return { ...state };

    case GET_DELVIERY_BY_ID.REQUEST:
      return { ...state };

    case GET_DELVIERY_BY_ID.SUCCESS:
      return {
        ...state,
        delivery: payload,
      };

    case GET_DELVIERY_BY_ID.FAILURE:
      return { ...state };

    case GET_DELIVERIES_BY_SEARCH.REQUEST:
      return { ...state };

    case GET_DELIVERIES_BY_SEARCH.SUCCESS:
      return {
        ...state,
        deliveries: payload,
      };

    case GET_DELIVERIES_BY_SEARCH.FAILURE:
      return { ...state };

    case GET_RECENT_DELIVERIES.REQUEST:
      console.log('recent success');
      return { ...state, loadingCompleted: true };

    case GET_RECENT_DELIVERIES.SUCCESS:
      return {
        ...state,
        recentDeliveries: payload,
        loadingCompleted: false,
      };

    case GET_RECENT_DELIVERIES.FAILURE:
      return { ...state, loadingCompleted: false };

    case GET_PENDING_DELIVERIES.REQUEST:
      return { ...state, loadingPending: true };

    case GET_PENDING_DELIVERIES.SUCCESS:
      return {
        ...state,
        inProgress: payload,
        loadingPending: false,
        // pendingDeliveries: payload,
      };

    case GET_PENDING_DELIVERIES.FAILURE:
      return { ...state, loadingPending: false };

    case GET_EXCEPTION_DELIVERIES.REQUEST:
      return { ...state };

    case GET_EXCEPTION_DELIVERIES.SUCCESS:
      return {
        ...state,
        exceptionDeliveries: payload,
      };

    case GET_EXCEPTION_DELIVERIES.FAILURE:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_RANGE.REQUEST:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_RANGE.SUCCESS:
      return {
        ...state,
        pendingDeliveries: payload,
      };

    case GET_PENDING_DELIVERIES_BY_RANGE.FAILURE:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_DATE.REQUEST:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_DATE.SUCCESS:
      return {
        ...state,
        pendingDeliveries: payload,
      };

    case GET_PENDING_DELIVERIES_BY_DATE.FAILURE:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_WEEK.REQUEST:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_WEEK.SUCCESS:
      return {
        ...state,
        pendingDeliveries: payload,
      };

    case GET_PENDING_DELIVERIES_BY_WEEK.FAILURE:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_MONTH.REQUEST:
      return { ...state };

    case GET_PENDING_DELIVERIES_BY_MONTH.SUCCESS:
      return {
        ...state,
        pendingDeliveries: payload,
      };

    case GET_PENDING_DELIVERIES_BY_MONTH.FAILURE:
      return { ...state };

    case GET_STATISTICS.REQUEST:
      return { ...state };

    case GET_STATISTICS.SUCCESS:
      return {
        ...state,
        statistics: payload,
      };

    case GET_STATISTICS.FAILURE:
      return { ...state };

    case UPDATE_INPROGRESS.REQUEST:
      return { ...state };

    case UPDATE_INPROGRESS.SUCCESS:
      let index = state.inProgress.findIndex(
        (d) => d.deliveryId === payload?.logs[payload?.logs.length - 1]?.event?.delivery_order_id
      );
      let updated = [...state.inProgress];
      updated[index].deliveryStatus = payload.deliveryStatus;
      updated[index].logs = payload.logs;
      return {
        ...state,
        inProgress: updated,
      };

    case UPDATE_INPROGRESS.FAILURE:
      return { ...state };

    case UPDATE_DELIVERED.REQUEST:
      return { ...state };

    case UPDATE_DELIVERED.SUCCESS:
      let removeDelivered = state.inProgress.filter(
        (d) => d.deliveryId !== payload?.logs[payload?.logs.length - 1]?.event?.delivery_order_id
      );
      return {
        ...state,
        inProgress: removeDelivered,
        recentDeliveries: [payload, ...state.recentDeliveries],
      };

    case UPDATE_DELIVERED.FAILURE:
      return { ...state };

    case UPDATE_EXCEPTIONS.REQUEST:
      return { ...state };

    case UPDATE_EXCEPTIONS.SUCCESS:
      let removeException = state.inProgress.filter((d) => d.deliveryId !== payload.deliveryId);
      return {
        ...state,
        inProgress: removeException,
        exceptionDeliveries: [payload, ...state.recentDeliveries],
      };

    case UPDATE_EXCEPTIONS.FAILURE:
      return { ...state };

    case UPDATE_FILTER.REQUEST:
      return { ...state };

    case UPDATE_FILTER.SUCCESS:
      return {
        ...state,
        ...payload,
      };

    case UPDATE_FILTER.FAILURE:
      return { ...state };

    default:
      return state;
  }
}

export default deliveryReducer;
