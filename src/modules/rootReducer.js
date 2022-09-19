import { combineReducers } from 'redux';
import commonReducer from './common/reducer';
import authReducer from './auth/reducer';
import userReducer from './users/reducer';
import deliveryReducer from './delivery/reducer';
import pharmacyReducer from './pharmacy/reducer';
import companyReducer from './company/reducer';
import pharmacistReducer from './pharmacist/reducer';

const appReducer = combineReducers({
  commonReducer,
  authReducer,
  userReducer,
  deliveryReducer,
  pharmacyReducer,
  companyReducer,
  pharmacistReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
