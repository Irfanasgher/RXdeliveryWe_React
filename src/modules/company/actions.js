import { createRequestTypes, action } from '../common/actions';

export const GET_COMPANY = createRequestTypes('GET_COMPANY');

const companyActions = {
  getCompany: {
    request: (data) => action(GET_COMPANY.REQUEST, { payload: data }),
    success: (data) => action(GET_COMPANY.SUCCESS, { payload: data }),
    failure: (error) => action(GET_COMPANY.FAILURE, { payload: error }),
  },
};

export default companyActions;
