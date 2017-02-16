import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { createUser, logIn, showUser } from '../requests/users';


const setUserInfo = userInfo => ({
	type: 'SET_USER_INFO',
	payload: userInfo,
});

const setTeacherUniversity = university => ({
	type: 'SET_TEACHER_UNIVERSITY',
	payload: university,
});

const setAuthInProcess = data => ({
	type: 'SET_AUTH_IN_PROCESS',
	payload: data,
});

const userSignupRequest = (dataForm, type) => {
	return dispatch => {
		createUser(dataForm, type)
			.then(successSignup);

		function successSignup(response) {
			setTokenAndUserInfo(response.data, dispatch);
			Alert.success('¡Te has registrado exitosamente!');
			if (type === 'teacher') {
				browserHistory.push('/tutores/registrarse-3');
			} else {
				browserHistory.push('/perfil-estudiante');
			}
		}
	};
};

const userLogInRequest = (dataForm, userRole) => {
	return dispatch => {
		logIn(dataForm, userRole)
			.then(successLogIn);

		function successLogIn(response) {
			if (response.data === 'You need to active your teacher account first.') {
				Alert.error('Tienes que activar tu cuenta para poder ingresar.');
			} else {
				setTokenAndUserInfo(response.data, dispatch, userRole);
				Alert.success('¡Bienvenido!');
				if(userRole === 'teacher') {
					browserHistory.push('tutores/esperando-activacion');
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
	const userInfo = { ...userData, role: userRole, id: userData.user_id };
	delete userInfo.user_id;
	dispatch(setUserInfo(userInfo));
	localStorage.setItem('BrainsUserInfo', JSON.stringify(userInfo));
}

export {
	userSignupRequest,
	userLogInRequest,
	getUserInfo,
	setTeacherUniversity,
	setAuthInProcess,
};
