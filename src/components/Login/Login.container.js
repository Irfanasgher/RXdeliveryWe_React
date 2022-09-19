import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import authActions from '../../modules/auth/actions';
import Login from './Login';

const mapStateToProps = (state) => ({
  loading: state.authReducer.loading,
  referralCode: state.authReducer.referralCode,
  error: state.authReducer.error,
  isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signin: authActions.signin.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
