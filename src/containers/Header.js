import { connect } from 'react-redux';
import Header from '../components/Header';
import { onLogOutRequest } from '../actions/authentication';

const mapStateToProps = state => {
  const { userInfo } = state;

  return {
    userInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogOut: () => {
    dispatch(onLogOutRequest());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
