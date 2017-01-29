import axios from 'axios';
import { browserHistory } from 'react-router';

export default function userSignupRequest(userData) {
	return dispatch => {
		return axios.post('https://brainsapi.herokuapp.com/'+userData)
			.then(successSignup, failureSignup);

		function successSignup() {
			alert('excelente');
		}

		function failureSignup() {
			browserHistory.push('/');
		}
	};
}