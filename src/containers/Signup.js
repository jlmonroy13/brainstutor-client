import { connect } from 'react-redux';
import Signup from '../components/Signup';
import userSignupRequest from '../actions/signup';


const mapDispatchToProps = dispatch => ({
	userSignupRequest: (formData) => {
		dispatch(userSignupRequest(formData));
	},
});

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
