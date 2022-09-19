import { connect } from 'react-redux';
import ViewDelivery from './ViewDelivery';

const mapStateToProps = (state) => ({
  pharmacy: state.pharmacyReducer.pharmacy,
});

export default connect(mapStateToProps, null)(ViewDelivery);
