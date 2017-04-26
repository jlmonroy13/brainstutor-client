import { connect } from 'react-redux';
import ScheduleItem from '../components/ScheduleItem';
import { setScheduleAction, setAppointmenteType } from '../actions/scheduleTutor';
import { getSessionStatus } from '../actions/openTokSession';

const mapDispatchToProps = dispatch => ({
  onSetScheduleAction: (data) => {
    dispatch(setScheduleAction(data));
  },
  onSetAppointmenteType: (type) => {
    dispatch(setAppointmenteType(type));
  },
  onGetSessionStatus: (type, id) => {
    dispatch(getSessionStatus(type, id));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(ScheduleItem);
