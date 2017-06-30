import { connect } from 'react-redux';
import DashboardClient from '../components/DashboardClient';
import { setScheduleAction, setTutorInfo, setAppointmenteType } from '../actions/scheduleTutor';

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
	onSetScheduleAction: (data) => {
		dispatch(setScheduleAction(data));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardClient);