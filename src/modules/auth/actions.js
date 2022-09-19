import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';

export const SIGNIN = createRequestTypes('SIGNIN');
export const CONFIRM_SIGNIN = createRequestTypes('CONFIRM_SIGNIN');
export const RESEND_SIGNIN_CODE = createRequestTypes('RESEND_SIGNIN_CODE');
export const SIGNOUT = createRequestTypes('SIGNOUT');

export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const FORGOT_PASSWORD_SUBMIT = createRequestTypes('FORGOT_PASSWORD_SUBMIT');

export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const GOOGLE_SIGNIN = createRequestTypes('GOOGLE_SIGNIN');

export const VERIFY_ATTRIBUTE = createRequestTypes('VERIFY_ATTRIBUTE');
export const VERIFY_ATTRIBUTE_SUBMIT = createRequestTypes('VERIFY_ATTRIBUTE_SUBMIT');

export const SIGNIN_SAVE_USER = 'SIGNIN_SAVE_USER';
export const OPEN_CHANGE_PASSWORD = 'OPEN_CHANGE_PASSWORD';
export const CLOSE_CHANGE_PASSWORD = 'CLOSE_CHANGE_PASSWORD';

export const OPEN_FORGOT_PASSWORD = 'OPEN_FORGOT_PASSWORD';
export const CLOSE_FORGOT_PASSWORD = 'CLOSE_FORGOT_PASSWORD';

export const OPEN_CONFIRMATION = 'OPEN_CONFIRMATION';
export const CLOSE_CONFIRMATION = 'CLOSE_CONFIRMATION';

export const OPEN_MFA = 'OPEN_MFA';
export const CLOSE_MFA = 'CLOSE_MFA';

const authActions = {
  signin: {
    request: (data) => action(SIGNIN[REQUEST], { payload: data }),
    success: (data) => {
      return action(SIGNIN[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(SIGNIN[FAILURE], { payload: error });
    },
    saveUser: (data) => {
      return action(SIGNIN_SAVE_USER, { payload: data });
    },
  },
  signout: {
    request: (data) => action(SIGNOUT[REQUEST], { payload: data }),
    success: (data) => {
      return action(SIGNOUT[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(SIGNOUT[FAILURE], { payload: error });
    },
  },
  forgotPassword: {
    request: (data) => action(FORGOT_PASSWORD[REQUEST], { payload: data }),
    success: (data) => {
      return action(FORGOT_PASSWORD[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(FORGOT_PASSWORD[FAILURE], { payload: error });
    },
  },
  forgotPasswordSubmit: {
    request: (data) => action(FORGOT_PASSWORD_SUBMIT[REQUEST], { payload: data }),
    success: (data) => {
      return action(FORGOT_PASSWORD_SUBMIT[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(FORGOT_PASSWORD_SUBMIT[FAILURE], { payload: error });
    },
  },
  changePassword: {
    request: (data) => action(CHANGE_PASSWORD[REQUEST], { payload: data }),
    success: (data) => {
      return action(CHANGE_PASSWORD[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(CHANGE_PASSWORD[FAILURE], { payload: error });
    },
  },
  verifyAttribute: {
    request: (data) => action(VERIFY_ATTRIBUTE[REQUEST], { payload: data }),
    success: (data) => {
      return action(VERIFY_ATTRIBUTE[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(VERIFY_ATTRIBUTE[FAILURE], { payload: error });
    },
  },
  verifyAttributeSubmit: {
    request: (data) => action(VERIFY_ATTRIBUTE_SUBMIT[REQUEST], { payload: data }),
    success: (data) => {
      return action(VERIFY_ATTRIBUTE_SUBMIT[SUCCESS], { payload: data });
    },
    failure: (error) => {
      return action(VERIFY_ATTRIBUTE_SUBMIT[FAILURE], { payload: error });
    },
  },
  closeChangePassword: () => {
    return action(CLOSE_CHANGE_PASSWORD);
  },
  openChangePassword: () => {
    return action(OPEN_CHANGE_PASSWORD);
  },
  closeConfirmation: () => {
    return action(CLOSE_CONFIRMATION);
  },
  openConfirmation: (payload) => action(OPEN_CONFIRMATION, { payload }),
  openForgotPassword: () => {
    return action(OPEN_FORGOT_PASSWORD);
  },
  openMFA: (data) => action(OPEN_MFA, { payload: data }),
  closeMFA: () => {
    return action(CLOSE_MFA);
  },
  closeForgotPassword: () => {
    return action(CLOSE_FORGOT_PASSWORD);
  },
};

export default authActions;
