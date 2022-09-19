import { GET_PHARMACIST, SWITCH_PHARMACY } from './actions';

// const defaultVisualState = {};

const initialState = {
  data: [],
  loading: false,
  isEditing: {},
  pharmacist: {},
  error: false,
};

function pharmacistReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PHARMACIST.REQUEST:
      return { ...state, loading: true };

    case GET_PHARMACIST.SUCCESS:
      return {
        ...state,
        pharmacist: payload,
        loading: false,
      };

    case GET_PHARMACIST.FAILURE:
      return { ...state };

    case SWITCH_PHARMACY.REQUEST:
      return { ...state, loading: true };

    case SWITCH_PHARMACY.SUCCESS:
      let pharacistAfterSwitch = JSON.parse(JSON.stringify(state.pharmacist));
      pharacistAfterSwitch.activePharmacy = payload.activePharmacy;
      return {
        ...state,
        pharmacist: pharacistAfterSwitch,
        loading: false,
      };

    case SWITCH_PHARMACY.FAILURE:
      return { ...state };

    default:
      return state;
  }
}

export default pharmacistReducer;
