import { connect } from 'react-redux';
import OpentokSession from '../components/OpentokSession';
import opentokSettings from '../consts/opentokSettings';
import { setSessionModalState } from '../actions/openTokSession';


const mapStateToProps = (state) => {
  const { openTokSession: { data } } = state;
  opentokSettings.credentials = {
    apiKey: data.apikey,
    sessionId: data.sessionId,
    token: data.token,
  };
  return {
    opentokSettings,
  };
};

const mapDispatchToProps = dispatch => ({
  onSetSessionModalState: (state) => {
    dispatch(setSessionModalState(state));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpentokSession);
