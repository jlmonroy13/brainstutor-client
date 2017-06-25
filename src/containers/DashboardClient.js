import { connect } from 'react-redux';
import DashboardClient from '../components/DashboardClient';
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
)(DashboardClient);