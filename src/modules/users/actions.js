import { createRequestTypes, action } from '../common/actions';

export const GET_PROFILE = createRequestTypes('GET_PROFILE');
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');

export const UPDATE_EDIT_STATE = 'UPDATE_EDIT_STATE';

export const userActions = {
  getProfile: {
    request: (data) => action(GET_PROFILE.REQUEST, { payload: data }),
    success: (data) => action(GET_PROFILE.SUCCESS, { payload: data }),
    failure: (error) => {
      return action(GET_PROFILE.FAILURE, { payload: error });
    },
  },
  updateProfile: {
    request: (name, value) => action(UPDATE_PROFILE.REQUEST, { payload: { name, value } }),
    success: (data) => action(UPDATE_PROFILE.SUCCESS, { payload: data }),
    failure: (error) => {
      return action(UPDATE_PROFILE.FAILURE, { payload: error });
    },
  },
};

export default userActions;
