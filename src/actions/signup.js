import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { brainsAuthentication } from '../utils/requests';

const setToken = token => ({
	type: 'SET_TOKEN',
	payload: token,
});

export default function userSignupRequest(userData) {
	return dispatch => {
		return brainsAuthentication.post(userData)
			.then(successSignup)
			.catch(failureSignup);

		function successSignup(response) {
			const { token } = response.data;
			dispatch(setToken(token));
			localStorage.setItem('token', token);
			Alert.success('Te has registrado exitosamente!');
			browserHistory.push('/');
		}

		function failureSignup() {
			Alert.error('Lo sentimos, tenemos problemas para registrarte.');
		}
	};
}
