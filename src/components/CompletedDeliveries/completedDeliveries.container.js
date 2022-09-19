import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deliveries from '../../modules/delivery/actions';
import CompletedDeliveries from './CompletedDeliveries';

const mapStateToProps = (state) => ({
  loading: state.deliveryReducer.loading,
  pharmacy: state.pharmacyReducer.pharmacy,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCompletedDeliveries: deliveries.getDeliveries.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CompletedDeliveries);
