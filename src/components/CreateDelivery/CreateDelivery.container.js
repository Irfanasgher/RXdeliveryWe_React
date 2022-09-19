import { connect } from 'react-redux';
import CreateDelivery from './CreateDelivery';

const mapStateToProps = (state) => ({
  deliveries: state.deliveryReducer.deliveries,
  pharmacy: state.pharmacyReducer.pharmacy,
});

export default connect(mapStateToProps, null)(CreateDelivery);
