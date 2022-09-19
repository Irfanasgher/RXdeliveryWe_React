import { createRequestTypes, action } from '../common/actions';

export const GET_PHARMACIST = createRequestTypes('GET_PHARMACIST');
export const SWITCH_PHARMACY = createRequestTypes('SWITCH_PHARMACY');

const pharmacistActions = {
  getPharmacist: {
    request: (data) => action(GET_PHARMACIST.REQUEST, { payload: data }),
    success: (data) => action(GET_PHARMACIST.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PHARMACIST.FAILURE, { payload: error }),
  },
  switchPharmacy: {
    request: (data) => action(SWITCH_PHARMACY.REQUEST, { payload: data }),
    success: (data) => action(SWITCH_PHARMACY.SUCCESS, { payload: data }),
    failure: (error) => action(SWITCH_PHARMACY.FAILURE, { payload: error }),
  },
};

export default pharmacistActions;
