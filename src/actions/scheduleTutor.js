import {
	requestScheduleMeeting,
	fetchScheduleList,
	updateScheduleStatus,
	updateScheduleMeeting,
	getSchedule,
} from '../requests/schedules';
import { pendingTask, begin, end } from 'react-redux-spinner';
import Alert from 'react-s-alert';
import { browserHistory } from 'react-router';
import { getDashboardRequest } from './teacher';


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


const setScheduleCreated = status => ({
	type: 'SET_SCHEDULE_CREATED',
	payload: status,
});

const setScheduleAction = data => ({
	type: 'SET_SCHEDULE_ACTION',
	payload: {
		action: data.action,
		scheduleId: data.scheduleId,
		receiverId: data.receiverId,
	}
});

const setSchedule = data => ({
	type: 'SET_SCHEDULE',
	payload: data,
});

const updatingScheduleStatus = (type, data, status, page) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		updateScheduleStatus(type, data)
			.then(successupdatingScheduleStatus);

		function successupdatingScheduleStatus() {
			dispatch(fetchingScheduleList(type, status, page));
			Alert.success("¡La Tutoria ha sido actualizada!");
			dispatch(setScheduleAction({ action: '', scheduleId: '' }));
			dispatch(setStatusRequestFalse());
			dispatch(getDashboardRequest(type, null));
		}
	};
};

const finishMeeting = (type, data) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		updateScheduleStatus(type, data)
			.then(successFinishMeeting);

		function successFinishMeeting() {
			dispatch(setStatusRequestFalse());
			Alert.success("Gracias por estudiar en BrainsTutor");
			if(type === 'student') {
				browserHistory.push('/estudiantes/tutorias-agendadas');
			} else {
				browserHistory.push('/tutores/tutorias-agendadas');
			}
		}
	};
};

const scheduleMeeting = (data) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestScheduleMeeting(data)
			.then(successScheduleMeeting);

		function successScheduleMeeting() {
			dispatch(setStatusRequestFalse());
			dispatch(setScheduleCreated(true));
			Alert.success("¡Tu solicitud de tutoria ha sido enviada!");
		}
	};
};

const updatingScheduleMeeting = (data) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		updateScheduleMeeting(data)
			.then(successScheduleMeeting);

		function successScheduleMeeting() {
			dispatch(setStatusRequestFalse());
			Alert.success("¡La Tutoria ha sido actualizada!");
			browserHistory.push('/estudiantes/tutorias-agendadas');
		}
	};
};

const gettingSchedule = (scheduleId, callback) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		getSchedule(scheduleId)
			.then(successGettingSchedule);

		function successGettingSchedule({ data }) {
			dispatch(setStatusRequestFalse());
			dispatch(setSchedule(data.schedule));
			callback();
		}
	};
};

const fetchingScheduleList = (type, status, page) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		fetchScheduleList(type, status, page)
			.then(successFetchScheduleList);

		function successFetchScheduleList({data}) {
			dispatch(setScheduleList(data));
			dispatch(setStatusRequestFalse());
		}
	};
};

export {
	setTutorInfo,
	setAppointmenteType,
	setScheduleAction,
	scheduleMeeting,
	fetchingScheduleList,
	updatingScheduleStatus,
	updatingScheduleMeeting,
	gettingSchedule,
	setScheduleCreated,
	finishMeeting,
};
