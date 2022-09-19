import { createRequestTypes, action } from '../common/actions';

export const GET_PHARMACY = createRequestTypes('GET_PHARMACY');
export const GET_ALL_PHARMACIES = createRequestTypes('GET_ALL_PHARMACIES');

const pharmacyActions = {
  getPharmacy: {
    request: (data) => action(GET_PHARMACY.REQUEST, { payload: data }),
    success: (data) => action(GET_PHARMACY.SUCCESS, { payload: data }),
    failure: (error) => action(GET_PHARMACY.FAILURE, { payload: error }),
  },
  getAllPharmacies: {
    request: (data) => action(GET_ALL_PHARMACIES.REQUEST, { payload: data }),
    success: (data) => action(GET_ALL_PHARMACIES.SUCCESS, { payload: data }),
    failure: (error) => action(GET_ALL_PHARMACIES.FAILURE, { payload: error }),
  },
};

export default pharmacyActions;
