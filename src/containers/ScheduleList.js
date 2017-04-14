import { connect } from 'react-redux';
import ScheduleList from '../components/ScheduleList';
import { fetchingScheduleList } from '../actions/scheduleTutor';

const mapStateToProps = (state) => {
	const {
    userInfo,
    scheduleTutor: { scheduleList: { list: scheduleList, currentPage, totalPages }, scheduleAction },
  } = state;
  const arrayPages = [];
  for (let i = 0; i < totalPages; i++) {
    arrayPages.push(i+1);
  }

  return {
    userInfo,
    scheduleList,
    currentPage,
    totalPages: arrayPages,
    scheduleAction,
  };
};

const mapDispatchToProps = dispatch => ({
	onFetchScheduleList: (type, status, page) => {
		dispatch(fetchingScheduleList(type, status, page));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleList);
