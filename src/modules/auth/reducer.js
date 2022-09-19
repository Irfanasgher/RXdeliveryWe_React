import {
  SIGNIN,
  SIGNIN_SAVE_USER,
  CONFIRM_SIGNIN,
  SIGNOUT,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUBMIT,
  CHANGE_PASSWORD,
  OPEN_CHANGE_PASSWORD,
  CLOSE_CHANGE_PASSWORD,
  OPEN_FORGOT_PASSWORD,
  CLOSE_FORGOT_PASSWORD,
  OPEN_CONFIRMATION,
  CLOSE_CONFIRMATION,
  OPEN_MFA,
  CLOSE_MFA,
  VERIFY_ATTRIBUTE,
  VERIFY_ATTRIBUTE_SUBMIT,
} from './actions';
import { SET_INITIAL_STATE } from '../common/actions';
import { getUserId } from '../common/utils';
import { ACCOUNT_CREATED_TEXT, VERIFICATION_EMAIL_TEXT } from '../../constants';

const initialState = {
  isLoggedIn: !!getUserId(),
  user: '',
  loading: false,
  error: false,
};

function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGNIN.REQUEST:
      return {
        ...state,
        username: payload,
        loading: true,
        error: false,
        isLoggedIn: false,
      };

    case SIGNIN_SAVE_USER:
      return { ...state, username: payload };

    case SIGNIN.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
        isLoggedIn: true,
        mfaFormType: '',
      };

    case SIGNIN.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
        isLoggedIn: false,
        user: payload.user,
      };

    case CONFIRM_SIGNIN.REQUEST:
      return { ...state, loading: true, error: false, isLoggedIn: false };

    case CONFIRM_SIGNIN.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
        isLoggedIn: true,
        mfaFormType: '',
      };

    case CONFIRM_SIGNIN.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
        isLoggedIn: false,
      };

    case SIGNOUT.REQUEST:
      return { ...state, loading: true, error: false };

    case SIGNOUT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: false,
      };

    case SIGNOUT.FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: payload.message,
      };

    case FORGOT_PASSWORD.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        username: payload.email,
      };

    case FORGOT_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        changePasswordVisible: true,
        forgotPasswordVisible: false,
        isForgotForm: true,
      };

    case FORGOT_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case FORGOT_PASSWORD_SUBMIT.REQUEST:
      return { ...state, loading: true, error: false };

    case FORGOT_PASSWORD_SUBMIT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        changePasswordVisible: false,
      };

    case FORGOT_PASSWORD_SUBMIT.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case CHANGE_PASSWORD.REQUEST:
      return { ...state, loading: true, error: false };

    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        changePasswordVisible: false,
      };

    case CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case VERIFY_ATTRIBUTE.REQUEST:
      return { ...state };

    case VERIFY_ATTRIBUTE.SUCCESS:
      return {
        ...state,
        error: false,
      };

    case VERIFY_ATTRIBUTE.FAILURE:
      return {
        ...state,
        error: payload.message,
      };

    case VERIFY_ATTRIBUTE_SUBMIT.REQUEST:
      return { ...state, loading: true };

    case VERIFY_ATTRIBUTE_SUBMIT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        mfaFormType: '',
      };

    case VERIFY_ATTRIBUTE_SUBMIT.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case OPEN_CHANGE_PASSWORD:
      return { ...state, changePasswordVisible: true, isForgotForm: false };

    case CLOSE_CHANGE_PASSWORD:
      return { ...state, changePasswordVisible: false };

    case OPEN_FORGOT_PASSWORD:
      return { ...state, forgotPasswordVisible: true };

    case CLOSE_FORGOT_PASSWORD:
      return { ...state, forgotPasswordVisible: false };

    case OPEN_CONFIRMATION:
      let confirmationBtnText = 'Sign in';
      let confirmationText = VERIFICATION_EMAIL_TEXT;
      if (payload === 'verificationEmail') {
        confirmationBtnText = 'Sign in';
        confirmationText = VERIFICATION_EMAIL_TEXT;
      } else if (payload === 'accountCreated') {
        confirmationBtnText = 'Sign in';
        confirmationText = ACCOUNT_CREATED_TEXT;
      }
      return {
        ...state,
        confirmationVisible: payload,
        confirmationBtnText,
        confirmationText,
        mfaFormType: '',
      };

    case CLOSE_CONFIRMATION:
      return { ...state, confirmationVisible: false };

    case OPEN_MFA:
      return { ...state, mfaFormType: payload };

    case CLOSE_MFA:
      return { ...state, mfaFormType: '' };

    case SET_INITIAL_STATE:
      return { ...initialState };

    default:
      return state;
  }
}

export default authReducer;
