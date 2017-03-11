import { connect } from 'react-redux';
import TutorProfile from '../components/TutorProfile';
import { userLogInRequest, userSignupRequest } from '../actions/authentication';


const mapStateToProps = () => {
	const type = 'Tutor';
  return {
    type,
  };
}; 

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		dispatch(userLogInRequest(formData, 'student', 'modal'));
	},
	userSignupRequest: (formData) => {
		dispatch(userSignupRequest(formData, 'student', 'modal'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorProfile);