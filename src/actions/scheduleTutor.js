import { requestScheduleMeeting, fetchScheduleList } from '../requests/schedules';
import { pendingTask, begin, end } from 'react-redux-spinner';
import { browserHistory } from 'react-router';


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

const setTutorInfo = tutorInfo => ({
	type: 'SET_TUTOR_INFO',
	payload: tutorInfo,
});

const setAppointmenteType = type => ({
	type: 'SET_APPOINTMENT_TYPE',
	payload: type,
});

const setScheduleList = list => ({
	type: 'SET_SCHEDULE_LIST',
	payload: list,
});

const scheduleMeeting = (data) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestScheduleMeeting(data)
			.then(successScheduleMeeting);

		function successScheduleMeeting(response) {
			dispatch(setStatusRequestFalse());
			browserHistory.push('/estudiantes/tutorias-agendadas');
			console.warn(response);
		}
	};
};

const fetchingScheduleList = (type) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		fetchScheduleList(type)
			.then(successFetchScheduleList);

		function successFetchScheduleList({ data: scheduleList }) {
			dispatch(setScheduleList(scheduleList));
			dispatch(setStatusRequestFalse());
		}
	}
};

export {
	setTutorInfo,
	setAppointmenteType,
	scheduleMeeting,
	fetchingScheduleList,
};