import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deliveryActions from '../../modules/delivery/actions';
import DashboardScreen from './DashboardScreen';

const mapStateToProps = (state) => ({
  deliveries: state.deliveryReducer.deliveries,
  statistics: state.deliveryReducer.statistics,
  pendingDeliveries: state.deliveryReducer.inProgress,
  recentDeliveries: state.deliveryReducer.recentDeliveries,
  pharmacy: state.pharmacyReducer.pharmacy,
  filter: state.deliveryReducer.filter,
  loadingCompleted: state.deliveryReducer.loadingCompleted,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeliveries: deliveryActions.getDeliveries.request,
      getRecentDeliveries: deliveryActions.getRecentDeliveries.request,
      getPendingDeliveries: deliveryActions.getPendingDeliveries.request,
      getPendingDeliveriesByDate: deliveryActions.getPendingDeliveriesByDate.request,
      getPendingDeliveriesByMonth: deliveryActions.getPendingDeliveriesByMonth.request,
      updateFilter: deliveryActions.updateFilter.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
