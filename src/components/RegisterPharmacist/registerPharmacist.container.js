import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import pharmacyActions from '../../modules/pharmacy/actions';
import RegisterPharmacist from './RegisterPharmacist';

const mapStateToProps = (state) => ({
  allPharmacies: state.pharmacyReducer.allPharmacies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllPharmacies: pharmacyActions.getAllPharmacies.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPharmacist);
