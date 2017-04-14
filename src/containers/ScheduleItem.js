import { connect } from 'react-redux';
import ScheduleItem from '../components/ScheduleItem';
import { setScheduleAction, setAppointmenteType } from '../actions/scheduleTutor';

const mapDispatchToProps = dispatch => ({
  onSetScheduleAction: (data) => {
    dispatch(setScheduleAction(data));
  },
  onSetAppointmenteType: (type) => {
    dispatch(setAppointmenteType(type));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(ScheduleItem);
