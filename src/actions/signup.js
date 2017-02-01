import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { createUser, showUser } from '../requests/users';

const setToken = token => ({
	type: 'SET_TOKEN',
	payload: token,
});

export default function userSignupRequest(userData) {
	return dispatch => {
		return createUser(userData, 'student')
			.then(successSignup);

		function successSignup(response) {
			const { token, id } = response.data;
			dispatch(setToken(token));
			localStorage.setItem('BrainsToken', token);
			Alert.success('Te has registrado exitosamente!');
			// browserHistory.push('/');
			showUser(id, 'student')
				.then((data) => {
					alert(data, 'el vacile');
				});
		}

	};
}
