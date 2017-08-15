import { applyPromoCodeRequest, getPromoCodesRequest, applyPromoCodeToScheduleRequest } from '../requests/coupons';
import { setScheduleAction, fetchingScheduleList } from './scheduleTutor';
import { getDashboardRequest } from './teacher';
import { pendingTask, begin, end } from 'react-redux-spinner';
import Alert from 'react-s-alert';

const setStatusRequestFalse = () => ({
	type: 'SET_STATUS_REQUEST',
	payload: false,
	[ pendingTask ]: end,
});

const setStatusRequestTrue = () => ({
	type: 'SET_STATUS_REQUEST',
	payload: true,
	[ pendingTask ]: begin,
});

const setCoupons = (coupons) => ({
	type: 'SET_COUPONS',
	payload: coupons,
});

const setCoupon = (coupon) => ({
	type: 'SET_COUPON',
	payload: coupon,
});

const reqApplyCode = (code) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		applyPromoCodeRequest(code)
			.then(successReqApplyCode);

		function successReqApplyCode(response) {
			const msg = response && response.data && response.data.coupons;
			dispatch(setCoupon(''));
			if (msg) Alert.success(msg);
			dispatch(setStatusRequestFalse());
			dispatch(reqGetCoupons());
		}
	};
};

const reqApplyCodeToSchedule = (scheduleId, couponId) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		applyPromoCodeToScheduleRequest(scheduleId, couponId)
			.then(successReqApplyCodeToSchedule);

		function successReqApplyCodeToSchedule(response) {
			const msg = response && response.data && response.data.coupons;
			if (msg)  {
				Alert.success(msg);
				dispatch(getDashboardRequest('student', null));
				dispatch(fetchingScheduleList('student', '', 1));
				dispatch(setScheduleAction({ action: '', scheduleId: '' }));
			}
			dispatch(setStatusRequestFalse());
			dispatch(reqGetCoupons());
		}
	};
};


const reqGetCoupons = () => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		getPromoCodesRequest()
			.then(successReqGetCoupons);

		function successReqGetCoupons({ data: { coupons } }) {
			dispatch(setCoupons(coupons));
			dispatch(setStatusRequestFalse());
		}
	};
};

export {
	reqApplyCode,
	reqGetCoupons,
	setCoupon,
	reqApplyCodeToSchedule,
};
