import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { pendingTask, begin, end } from 'react-redux-spinner';
import { updateBankInfo, showTeachers, getTeacherDashboard } from '../requests/users';

const setTeacherUniversity = university => ({
	type: 'SET_TEACHER_UNIVERSITY',
	payload: university,
});

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

const setTeachers = (teachers) => ({
	type: 'SET_TEACHERS',
	payload: teachers,
});

const setDashboard = (data) => ({
	type: 'SET_DASHBOARD',
	payload: data,
});

const updateBankInfoRequest = (dataForm) => {
	return (dispatch, getState) => {
		const { userInfo } = getState();
		const { bank_information: { id: bankFormId } } = userInfo;
		dispatch(setStatusRequestTrue());
		updateBankInfo(bankFormId, dataForm)
			.then(successBankInfo);

		function successBankInfo() {
			dispatch(setStatusRequestFalse());
			Alert.success('¡Tu información bancaria ha sido registrada!');
			browserHistory.push('/tutores/home');
		}
	};
};

const getDashboardRequest = () => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		getTeacherDashboard()
			.then(successgetDashboardRequest);

		function successgetDashboardRequest(response) {
			dispatch(setStatusRequestFalse());
			dispatch(setDashboard(response.data));
		}
	};
};

const getTutorsRequest = (page, subjects) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		showTeachers(page, subjects).then(successGetTutors);

		function successGetTutors(response) {
			dispatch(setStatusRequestFalse());
			dispatch(setTeachers(response.data));
		}
	};
};

export {
	setTeacherUniversity,
	updateBankInfoRequest,
	getTutorsRequest,
	getDashboardRequest,
};
