import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import userLogInRequest from '../actions/signup';

// const mapStateToProps = () => {
// 	const hola = 'hola';
//   return { hola };
// };

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		const { email, password } = formData;
		const userParam = 'user[email]=';
		const passwordParam = 'user[password]=';
		const params = `?${userParam}${email}&${passwordParam}${password}`;
		dispatch(userLogInRequest(params));
	},
});

export default connect(
  null,
  mapDispatchToProps,
)(LogIn);