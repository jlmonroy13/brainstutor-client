import { connect } from 'react-redux';
import ScheduleList from '../components/ScheduleList';
import { fetchingScheduleList } from '../actions/scheduleTutor';

const mapStateToProps = (state) => {
	const { userInfo, scheduleTutor: { scheduleList } } = state;
  
  return {
    userInfo,
    scheduleList,
  };
};

const mapDispatchToProps = dispatch => ({
	onFetchScheduleList: (type) => {
		dispatch(fetchingScheduleList(type));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleList);