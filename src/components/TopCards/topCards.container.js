import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deliveryActions from '../../modules/delivery/actions';
import TopCards from './TopCards';

const mapStateToProps = (state) => ({
  statistics: state.deliveryReducer.statistics,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getStatistics: deliveryActions.getStatistics.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopCards);
