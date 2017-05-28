import { connect } from 'react-redux';
import TutorProfile from '../components/TutorProfile';
import { userLogInRequest, userSignupRequest } from '../actions/authentication';
import { setTutorInfo, setAppointmenteType } from '../actions/scheduleTutor';
import { reqCreateMessage } from '../actions/chat';

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
	onCreateMessage: (receiverId, textMessage) => {
		dispatch(reqCreateMessage(receiverId, textMessage));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorProfile);
