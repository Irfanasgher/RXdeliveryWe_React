import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import authActions from '../../../modules/auth/actions';
import pharmacyActions from '../../../modules/pharmacy/actions';
import pharmacistActions from '../../../modules/pharmacist/actions';
import TopBar from './TopBar';

const mapStateToProps = (state) => ({
  pharmacy: state.pharmacyReducer.pharmacy,
  pharmacyLoader: state.pharmacyReducer.loading,
  pharmacist: state.pharmacistReducer.pharmacist,
  pharmacistLoader: state.pharmacistReducer.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signout: authActions.signout.request,
      getPharmacist: pharmacistActions.getPharmacist.request,
      getPharmacy: pharmacyActions.getPharmacy.request,
      switchPharmacy: pharmacistActions.switchPharmacy.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
