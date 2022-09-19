import { SET_INITIAL_STATE } from './actions';

const initialState = {};

function commonReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };

    default:
      return state;
  }
}

export default commonReducer;
