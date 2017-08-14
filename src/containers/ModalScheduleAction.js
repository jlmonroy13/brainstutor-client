import { connect } from 'react-redux';
import ModalScheduleAction from '../components/ModalScheduleAction';
import { setScheduleAction, updatingScheduleStatus } from '../actions/scheduleTutor';
import { reqCreateMessage } from '../actions/chat';

const mapStateToProps = (state) => {
  const {
    userInfo: { role },
    scheduleTutor: { scheduleAction: { action, scheduleId, receiverId } },
    coupons: { couponsList },
  } = state;
  const isOpen = action !== '' && action !== 'awaiting_tutor';
  return {
    isOpen,
    scheduleId,
    receiverId,
    action,
    role,
    couponsList,
  };
};

const mapDispatchToProps = dispatch => ({
  onSetScheduleAction: (data) => {
    dispatch(setScheduleAction(data));
  },
  onUpdatingScheduleStatus: (type, data, status, page) => {
    dispatch(updatingScheduleStatus(type, data, status, page));
  },
  onSendMessage: (idReceiver, message) => {
    dispatch(reqCreateMessage(idReceiver, message));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalScheduleAction);
