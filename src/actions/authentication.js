import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import {
	createUser,
	logIn,
	showUser,
	updateUser,
	logOut,
} from '../requests/users';
import { pendingTask, begin, end } from 'react-redux-spinner';
import moment from 'moment-timezone';
import { reqCreateMessage } from './chat';
import { getDashboardRequest } from './teacher';

const setUserInfo = userInfo => ({
	type: 'SET_USER_INFO',
	payload: userInfo,
});

const deleteUserInfo = () => ({ type: 'DELETE_USER_INFO' });

const setAuthInProcess = data => ({
	type: 'SET_AUTH_IN_PROCESS',
	payload: data,
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

const userSignupRequest = (dataForm, type, origin='') => {
	return (dispatch, getState) => {
		dispatch(setStatusRequestTrue());
		createUser(dataForm, type)
			.then(successSignup);

		function successSignup(response) {
			dispatch(setStatusRequestFalse());
			const { appointmentType } = getState().scheduleTutor;
			setTokenAndUserInfo(response.data, dispatch, type);
			if (origin !== 'modal') {
				Alert.success('¡Te has registrado exitosamente!');
				if (type === 'teacher') {
					browserHistory.push('/tutores/registrarse-3');
				} else {
					browserHistory.push('/perfil-estudiante');
				}
			} else {
				const id = response.data.user_id||response.data.id;
				dispatch(getUserInfo(id, type));
				if (!appointmentType) {
					const { receiverId, textMessage } = dataForm;
					dispatch(reqCreateMessage(receiverId, textMessage));
				} else if (appointmentType === 'free') {
					browserHistory.push('/estudiantes/conoce-tu-tutor');
				} else if (appointmentType === 'paid') {
					browserHistory.push('/estudiantes/agendar-tutoria');
				}
			}
		}
	};
};

const onLogOutRequest = () => {
	return dispatch => {
		dispatch(setStatusRequestTrue());
		logOut().then(successLogOut);

		function successLogOut() {
			dispatch(setStatusRequestFalse());
			dispatch(deleteUserInfo());
			localStorage.setItem('BrainsUserInfo', '');
			browserHistory.push('/');
		}
	};
};

const userUpdateProfileRequest = (dataForm, type) => {
	return (dispatch, getState) => {
		dispatch(setStatusRequestTrue());
		const { userInfo } = getState();
		const { id: profileId } = userInfo.profile;
		const { id } = userInfo;
		updateUser(id, profileId, dataForm, type)
			.then(successSignup);

		function successSignup(response) {
			const userData = response.data;
			dispatch(setStatusRequestFalse());
			setTokenAndUserInfo(userData, dispatch, type);
			Alert.success('¡Has actualizado exitosamente tu perfil!');
			if (type === 'teacher' && userData.status !== 'complete') {
				browserHistory.push('/tutores/home');
			} else if (type === 'teacher' && userData.status === 'complete') {
				browserHistory.push('/tutores/inicio');
			} else {
				browserHistory.push('/perfil-estudiante');
			}
		}
	};
};

const userLogInRequest = (dataForm, userRole, origin='') => {
	return (dispatch, getState) => {
		dispatch(setStatusRequestTrue());
		logIn(dataForm, userRole)
			.then(successLogIn);

		function successLogIn(response) {
			dispatch(setStatusRequestFalse());
			const { appointmentType } = getState().scheduleTutor;
			if (response.data === 'You need to active your teacher account first.') {
				Alert.error('Tienes que activar tu cuenta para poder ingresar.');
			} else {
				const id = response.data.user_id||response.data.id;
				setTokenAndUserInfo(response.data, dispatch, userRole);
				dispatch(getUserInfo(id, userRole));
				if (origin !== 'modal') {
					Alert.success('¡Bienvenido!');
					if(userRole === 'teacher') {
						const { status } = response.data;
						if (status === 'complete') {
							browserHistory.push('/tutores/inicio');
						} else {
							browserHistory.push('/tutores/home');
						}
					} else {
						browserHistory.push('/estudiantes/inicio');
					}
				} else {
					if (!appointmentType) {
						const { receiverId, textMessage } = dataForm;
						dispatch(reqCreateMessage(receiverId, textMessage));
					} else if (appointmentType === 'free') {
						browserHistory.push('/estudiantes/conoce-tu-tutor');
					} else if (appointmentType === 'paid') {
						browserHistory.push('/estudiantes/agendar-tutoria');
					}
				}
			}
		}
	};
};

const getUserInfo = (id, type, callback) => {
	return (dispatch, getState) => {
		const { routing:{ locationBeforeTransitions: { pathname } } } = getState();

		showUser(id, type)
			.then(successRequest);

		function successRequest(response) {
			const { data } = response;
			dispatch(setUserInfo(data[type]));
			if (data[type].status === 'complete' && pathname !== '/tutores/home' && pathname !== '/tutores/inicio' && pathname !== '/estudiantes/inicio') {
				dispatch(setAuthInProcess(false));
				callback();
			} else if (data[type].status === 'complete' && pathname === '/tutores/home') {
				browserHistory.push('/tutores/inicio');
				callback();
				dispatch(setAuthInProcess(false));
			} else if (data[type].status === 'complete' && pathname === '/tutores/inicio' || pathname === '/estudiantes/inicio') {
				dispatch(getDashboardRequest(data[type].role, callback));
				dispatch(setAuthInProcess(false));
			} else if (!data[type].status) {
				dispatch(setAuthInProcess(false));
				callback();
			} else {
				dispatch(setAuthInProcess(true));
				callback();
			}
		}
	};
};

function setTokenAndUserInfo(userData, dispatch, userRole) {
	let localData = localStorage.getItem('BrainsUserInfo');
	localData = localData ? JSON.parse(localData) : {};
	moment.tz.setDefault('America/Bogota');
	const userInfo = {
		...userData,
		role: userRole,
		id: userData.user_id || userData.id,
		loginAt: moment.tz(moment.tz.guess()).format(),
	};
	delete userInfo.user_id;
	const user = userInfo.student&&userInfo.student.id ? {...userInfo, ...userInfo.student} : userInfo;
	dispatch(setUserInfo(user));
	localStorage.setItem('BrainsUserInfo', JSON.stringify({ ...user, ...localData }));
}

export {
	userSignupRequest,
	userUpdateProfileRequest,
	userLogInRequest,
	getUserInfo,
	setAuthInProcess,
	onLogOutRequest,
};
