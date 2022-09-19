import { GET_PROFILE, UPDATE_PROFILE } from './actions';

const defaultVisualState = {};
const initialState = {
  [GET_PROFILE]: { ...defaultVisualState },
  [UPDATE_PROFILE]: { ...defaultVisualState },

  data: [],
  profile: {},
  loading: {},
  isEditing: {},
};

function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE.REQUEST:
      return { ...state };

    case GET_PROFILE.SUCCESS:
      return {
        ...state,
        profile: payload,
        myChannelId: payload.channel_id,
        myChannelAlias: payload.channel_alias,
      };

    case GET_PROFILE.FAILURE:
      return { ...state };

    case UPDATE_PROFILE.REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.name]: true,
        },
      };

    case UPDATE_PROFILE.SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.name]: false,
        },
        isEditing: {
          ...state.isEditing,
          [payload.name]: false,
        },
      };

    case UPDATE_PROFILE.FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.name]: false,
        },
      };

    default:
      return state;
  }
}

export default usersReducer;
