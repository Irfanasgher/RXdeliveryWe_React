import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deliveries from '../../modules/delivery/actions';
import PendingDeliveries from './PendingDeliveries';

const mapStateToProps = (state) => ({
  loading: state.deliveryReducer.loading,
  loadingPending: state.deliveryReducer.loadingPending,
  pendingDeliveries: state.deliveryReducer.inProgress,
  pharmacy: state.pharmacyReducer.pharmacy,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecentDeliveries: deliveries.getDeliveries.request,
      getPendingDeliveriesByDate: deliveries.getPendingDeliveriesByDate.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PendingDeliveries);
