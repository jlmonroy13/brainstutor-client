import axios from 'axios';
import { browserHistory } from 'react-router';

export default function userLogInRequest(userData) {
	return dispatch => {
		return axios.post('https://brainsapi.herokuapp.com/'+userData)
			.then(successLogIn, failureLogIn);

		function successLogIn() {
			alert('excelente');
		}

		function failureLogIn() {
			browserHistory.push('/');
		}
	};
}