import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { createUser, logIn, showUser } from '../requests/users';


const setUserInfo = userInfo => ({
	type: 'SET_USER_INFO',
	payload: userInfo,
});

const userSignupRequest = (dataForm, type) => {
	return dispatch => {
		createUser(dataForm, type)
			.then(successSignup);

		function successSignup(response) {
			setTokenAndUserInfo(response.data, dispatch);
			Alert.success('¡Te has registrado exitosamente!');
			browserHistory.push('/');
		}
	};
};

const userLogInRequest = dataForm => {
	return dispatch => {
		logIn(dataForm)
			.then(successLogIn);

		function successLogIn(response) {
			setTokenAndUserInfo(response.data, dispatch);
			Alert.success('¡Bienvenido!');
			browserHistory.push('/perfil-estudiante');
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

function setTokenAndUserInfo(userInfo, dispatch) {
	dispatch(setUserInfo(userInfo));
	localStorage.setItem('BrainsUserInfo', JSON.stringify(userInfo));
}

export {
	userSignupRequest,
	userLogInRequest,
	getUserInfo,
};