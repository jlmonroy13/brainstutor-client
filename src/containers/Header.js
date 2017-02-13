import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => {
  const { authInProcess } = state.userInfo;

  return {
    authInProcess,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Header);
