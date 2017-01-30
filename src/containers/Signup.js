import { connect } from 'react-redux';
import Signup from '../components/Signup';
import userSignupRequest from '../actions/signup';

// const mapStateToProps = () => {
// 	const hola = 'hola';
//   return { hola };
// };

const mapDispatchToProps = dispatch => ({
	userSignupRequest: (formData) => {
		const { email, password } = formData;
		const userParam = 'student[email]=';
		const passwordParam = 'student[password]=';
		const params = `students?${userParam}${email}&${passwordParam}${password}`;
		dispatch(userSignupRequest(params));
	},
});

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
