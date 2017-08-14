import { connect } from 'react-redux';
import UserDashboard from '../components/UserDashboard';
import { reqGetCoupons } from '../actions/coupons';

const mapStateToProps = (state) => {
  const { userInfo: { role, id: userId }, dashboard } = state;
  return {
		userId,
    role,
    dashboard,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetCoupons: () => {
    dispatch(reqGetCoupons());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDashboard);
