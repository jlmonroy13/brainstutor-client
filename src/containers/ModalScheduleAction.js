import { connect } from 'react-redux';
import ModalScheduleAction from '../components/ModalScheduleAction';
import { setScheduleAction, updatingScheduleStatus } from '../actions/scheduleTutor';

const mapStateToProps = (state) => {
  const {
    userInfo: { role },
    scheduleTutor: { scheduleAction: { action, scheduleId } },
  } = state;
  const isOpen = action !== '' && action !== 'awaiting_tutor';
  return {
    isOpen,
    scheduleId,
    action,
    role,
  };
};

const mapDispatchToProps = dispatch => ({
  onSetScheduleAction: (data) => {
    dispatch(setScheduleAction(data));
  },
  onUpdatingScheduleStatus: (type, data) => {
    dispatch(updatingScheduleStatus(type, data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalScheduleAction);
