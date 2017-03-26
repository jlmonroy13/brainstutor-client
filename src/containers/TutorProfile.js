import { connect } from 'react-redux';
import TutorProfile from '../components/TutorProfile';
import { userLogInRequest, userSignupRequest } from '../actions/authentication';
import { setTutorInfo, setAppointmenteType } from '../actions/scheduleTutor';


const mapStateToProps = (state) => {
	const type = 'Tutor';
  const { userInfo } = state;
  return {
    type,
    userInfo,
  };
};

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		dispatch(userLogInRequest(formData, 'student', 'modal'));
	},
	userSignupRequest: (formData) => {
		dispatch(userSignupRequest(formData, 'student', 'modal'));
	},
	storeTutorInfo: (tutorInfo) => {
		dispatch(setTutorInfo(tutorInfo));
	},
	onSetAppointmenteType: (type) => {
		dispatch(setAppointmenteType(type));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorProfile);
