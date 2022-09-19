import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deliveryActions from '../../modules/delivery/actions';
import ViewDeliveries from './ViewDeliveries';

const mapStateToProps = (state) => ({
  deliveries: state.deliveryReducer.deliveries,
  filter: state.deliveryReducer.filter,
  inProgressDeliveries: state.deliveryReducer.inProgress,
  completedDeliveries: state.deliveryReducer.recentDeliveries,
  exceptionDeliveries: state.deliveryReducer.exceptionDeliveries,
  pharmacy: state.pharmacyReducer.pharmacy,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeliveries: deliveryActions.getDeliveries.request,
      getRecentDeliveries: deliveryActions.getRecentDeliveries.request,
      getPendingDeliveries: deliveryActions.getPendingDeliveries.request,
      getExceptionDeliveries: deliveryActions.getExceptionDeliveries.request,
      updateFilter: deliveryActions.updateFilter.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeliveries);
