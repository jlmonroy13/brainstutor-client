import { connect } from 'react-redux';
import Header from '../components/Header';
import { onLogOutRequest } from '../actions/authentication';
import { setShowMenu } from '../actions/header';

const mapStateToProps = state => {
  const { userInfo, header: { showMenu } } = state;

  return {
    userInfo,
    showMenu,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogOut: () => {
    dispatch(onLogOutRequest());
  },
  onShowMenu: (data) => {
    dispatch(setShowMenu(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
