import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deliveryActions from '../../modules/delivery/actions';
import Layout from './Layout';
import pharmacistActions from '../../modules/pharmacist/actions';

const mapStateToProps = (state) => ({
  deliveries: state.deliveryReducer.deliveries,
  statistics: state.deliveryReducer.statistics,
  pendingDeliveries: state.deliveryReducer.inProgress,
  recentDeliveries: state.deliveryReducer.recentDeliveries,
  pharmacy: state.pharmacyReducer.pharmacy,
  pharmacyLoader: state.pharmacyReducer.loading,
  pharmacistLoader: state.pharmacistReducer.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getStatistics: deliveryActions.getStatistics.request,
      updateInprogress: deliveryActions.updateInProgress.request,
      updateDelivered: deliveryActions.updateDelivered.request,
      updateExcetpions: deliveryActions.updateExcetpions.request,
      getPharmacist: pharmacistActions.getPharmacist.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
