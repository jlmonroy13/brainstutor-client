import { connect } from 'react-redux';
import ScheduleItem from '../components/ScheduleItem';
import { setScheduleAction } from '../actions/scheduleTutor';

const mapDispatchToProps = dispatch => ({
  onSetScheduleAction: (data) => {
    dispatch(setScheduleAction(data));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(ScheduleItem);
