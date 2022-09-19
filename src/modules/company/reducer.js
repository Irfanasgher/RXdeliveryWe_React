import { GET_COMPANY } from './actions';

const initialState = {
  data: [],
  loading: {},
  isEditing: {},
};

function companyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_COMPANY.REQUEST:
      return { ...state };

    case GET_COMPANY.SUCCESS:
      return {
        ...state,
        deliveries: payload,
      };

    case GET_COMPANY.FAILURE:
      return { ...state };

    default:
      return state;
  }
}

export default companyReducer;
