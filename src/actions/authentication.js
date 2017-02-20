import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { createUser, logIn, showUser, updateUser, logOut } from '../requests/users';
import { pendingTask, begin, end } from 'react-redux-spinner';


const setUserInfo = userInfo => ({
	type: 'SET_USER_INFO',
	payload: userInfo,
});

const deleteUserInfo = () => ({ type: 'DELETE_USER_INFO' });

const setTeacherUniversity = university => ({
	type: 'SET_TEACHER_UNIVERSITY',
	payload: university,
});

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

const userSignupRequest = (dataForm, type) => {
	return dispatch => {
		dispatch(setStatusRequestTrue());
		createUser(dataForm, type)
			.then(successSignup);

		function successSignup(response) {
			dispatch(setStatusRequestFalse());
			setTokenAndUserInfo(response.data, dispatch, type);
			Alert.success('¡Te has registrado exitosamente!');
			if (type === 'teacher') {
				browserHistory.push('/tutores/registrarse-3');
			} else {
				browserHistory.push('/perfil-estudiante');
			}
		}
	};
};

const onLogOutRequest = () => {
	return dispatch => {
		logOut().then(successLogOut);

		function successLogOut() {
			dispatch(deleteUserInfo());
			localStorage.setItem('BrainsUserInfo', '');
			browserHistory.push('/');
		}
	};
};

const userUpdateProfileRequest = (dataForm, type) => {
	return (dispatch, getState) => {
		dispatch(setStatusRequestTrue());
		const { id: profileId } = getState().userInfo.profile;
		const { id } = getState().userInfo;
		updateUser(id, profileId, dataForm, type)
			.then(successSignup);

		function successSignup(response) {
			dispatch(setStatusRequestFalse());
			setTokenAndUserInfo(response.data, dispatch, type);
			Alert.success('¡Has actualizado exitosamente tu perfil!');
			if (type === 'teacher') {
				browserHistory.push('/tutores/home');
			} else {
				browserHistory.push('/perfil-estudiante');
			}
		}
	};
};

const userLogInRequest = (dataForm, userRole) => {
	return dispatch => {
		dispatch(setStatusRequestTrue());
		logIn(dataForm, userRole)
			.then(successLogIn);

		function successLogIn(response) {
			dispatch(setStatusRequestFalse());
			if (response.data === 'You need to active your teacher account first.') {
				Alert.error('Tienes que activar tu cuenta para poder ingresar.');
			} else {
				setTokenAndUserInfo(response.data, dispatch, userRole);
				Alert.success('¡Bienvenido!');
				if(userRole === 'teacher') {
					browserHistory.push('/tutores/home');
				} else {
					browserHistory.push('perfil-estudiante');
				}

			}
		}
	};
};

const getUserInfo = (id, type) => {
	return dispatch => {
		showUser(id, type)
			.then(successRequest);

		function successRequest(response) {
			dispatch(setUserInfo(response.data));
		}
	};
};

function setTokenAndUserInfo(userData, dispatch, userRole) {
	const userInfo = { ...userData, role: userRole, id: userData.user_id || userData.id};
	delete userInfo.user_id;
	dispatch(setUserInfo(userInfo));
	localStorage.setItem('BrainsUserInfo', JSON.stringify(userInfo));
}

export {
	userSignupRequest,
	userUpdateProfileRequest,
	userLogInRequest,
	getUserInfo,
	setTeacherUniversity,
	setAuthInProcess,
	onLogOutRequest,
};
