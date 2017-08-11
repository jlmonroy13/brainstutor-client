const defaultState = {
	couponsList: [],
	coupon: '',
};

export default function couponsReducer(state = defaultState, action) {
	switch (action.type) {
		case 'SET_COUPONS':
			return {
				...state,
				couponsList: action.payload,
			};
		case 'SET_COUPON':
			return {
				...state,
				coupon: action.payload,
			};
		default:
			return state;
	}
}