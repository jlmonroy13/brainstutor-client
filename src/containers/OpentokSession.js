import { connect } from 'react-redux';
import OpentokSession from '../components/OpentokSession';
import opentokSettings from '../consts/opentokSettings';
import { setSessionModalState } from '../actions/openTokSession';
import { finishMeeting } from '../actions/scheduleTutor';


const mapStateToProps = (state) => {
  const { openTokSession: { data }, userInfo: { role } } = state;
  opentokSettings.credentials = {
    apiKey: data.apikey,
    sessionId: data.sessionId,
    token: data.token,
  };
  const { duration, start_at: startAt, meetingId } = data;
  return {
    opentokSettings,
    duration,
    startAt,
    role,
    meetingId,
  };
};

const mapDispatchToProps = dispatch => ({
  onSetSessionModalState: (state) => {
    dispatch(setSessionModalState(state));
  },
  onFinishMeeting: (type, data) => {
    dispatch(finishMeeting(type, data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpentokSession);
