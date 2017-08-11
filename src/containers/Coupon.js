import { connect } from 'react-redux';
import Coupon from '../components/Coupon';
import { reqApplyCode, setCoupon } from '../actions/coupons';

const mapStateToProps = state => {
  const { coupons: { couponsList, coupon } } = state;

  return {
    couponsList,
    coupon,
  };
};

const mapDispatchToProps = dispatch => ({
  onApplyPromoCode: (code) => {
    dispatch(reqApplyCode(code));
  },
	onSetCoupon: (code) => {
		dispatch(setCoupon(code));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Coupon);
