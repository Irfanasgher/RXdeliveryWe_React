import { GET_PHARMACY, GET_ALL_PHARMACIES } from './actions';

const initialState = {
  data: [],
  loading: false,
  isEditing: {},
  pharmacy: {},
  error: false,
  allPharmacies: [],
};

function pharmacyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PHARMACY.REQUEST:
      return { ...state, loading: true };

    case GET_PHARMACY.SUCCESS:
      return {
        ...state,
        pharmacy: payload,
        loading: false,
      };

    case GET_PHARMACY.FAILURE:
      return { ...state, loading: false };

    case GET_ALL_PHARMACIES.REQUEST:
      return { ...state, loading: true };

    case GET_ALL_PHARMACIES.SUCCESS:
      return {
        ...state,
        allPharmacies: payload,
        loading: false,
      };

    case GET_ALL_PHARMACIES.FAILURE:
      return { ...state };

    default:
      return state;
  }
}

export default pharmacyReducer;
