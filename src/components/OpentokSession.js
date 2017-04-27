import React, {PropTypes} from 'react';
import Spinner from 'react-spinner';
import classNames from 'classnames';
import Alert from 'react-s-alert';
import otCore from 'opentok-accelerator-core';

/**
 * Build classes for container elements based on state
 * @param {Object} state
 */
const containerClasses = (state) => {
  const { active, meta, localAudioEnabled, localVideoEnabled } = state;
  const sharingScreen = meta ? !!meta.publisher.screen : false;
  const viewingSharedScreen = meta ? meta.subscriber.screen : false;
  const activeCameraSubscribers = meta ? meta.subscriber.camera : 0;
  const activeCameraSubscribersGt2 = activeCameraSubscribers > 2;
  const activeCameraSubscribersOdd = activeCameraSubscribers % 2;
  const screenshareActive = viewingSharedScreen || sharingScreen;
  return {
    controlClass: classNames('App-control-container', { hidden: !active }),
    localAudioClass: classNames('ots-video-control circle audio', { hidden: !active, muted: !localAudioEnabled }),
    localVideoClass: classNames('ots-video-control circle video', { hidden: !active, muted: !localVideoEnabled }),
    localCallClass: classNames('ots-video-control circle end-call', { hidden: !active }),
    cameraPublisherClass: classNames('video-container', { hidden: !active, small: !!activeCameraSubscribers || screenshareActive, left: screenshareActive }),
    screenPublisherClass: classNames('video-container', { hidden: !active || !sharingScreen }),
    cameraSubscriberClass: classNames('video-container', { hidden: !active || !activeCameraSubscribers },
      { 'active-gt2': activeCameraSubscribersGt2 && !screenshareActive },
      { 'active-odd': activeCameraSubscribersOdd && !screenshareActive },
      { small: screenshareActive }
    ),
    screenSubscriberClass: classNames('video-container', { hidden: !viewingSharedScreen || !active }),
  };
};

const connectingMask = () =>
  <div className="App-mask">
    <Spinner />
    <div className="message with-spinner">Connecting</div>
  </div>;

const startCallMask = start =>
  <div className="App-mask">
    <button className="message button clickable" onClick={start}>Empezar la llamada</button>
  </div>;

class OpentokSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      active: false,
      publishers: null,
      subscribers: null,
      meta: null,
      localAudioEnabled: true,
      localVideoEnabled: true,
    };
    this.startCall = this.startCall.bind(this);
    this.endCall = this.endCall.bind(this);
    this.toggleLocalAudio = this.toggleLocalAudio.bind(this);
    this.toggleLocalVideo = this.toggleLocalVideo.bind(this);
  }

  componentDidMount() {
    const { opentokSettings, onSetSessionModalState } = this.props;
    onSetSessionModalState(false);
    this.testing = new otCore(opentokSettings);
    // this.testing.init(otCoreOptions);
    this.testing.connect().then(() => this.setState({ connected: true }));
    const events = [
      'subscribeToCamera',
      'unsubscribeFromCamera',
      'subscribeToScreen',
      'unsubscribeFromScreen',
      'startScreenShare',
      'endScreenShare',
    ];

    events.forEach(event => this.testing.on(event, ({ publishers, subscribers, meta }) => {
      this.setState({ publishers, subscribers, meta });
    }));
  }

  startCall() {
    this.testing.startCall()
      .then(({ publishers, subscribers, meta }) => {
        this.setState({ publishers, subscribers, meta, active: true });
      }).catch(error => Alert.error(error));
  }

  endCall() {
    this.testing.endCall();
    this.setState({ active: false });
  }

  toggleLocalAudio() {
    this.testing.toggleLocalAudio(!this.state.localAudioEnabled);
    this.setState({ localAudioEnabled: !this.state.localAudioEnabled });
  }

  toggleLocalVideo() {
    this.testing.toggleLocalVideo(!this.state.localVideoEnabled);
    this.setState({ localVideoEnabled: !this.state.localVideoEnabled });
  }

  render() {
    const { connected, active } = this.state;
    const {
      localAudioClass,
      localVideoClass,
      localCallClass,
      controlClass,
      cameraPublisherClass,
      screenPublisherClass,
      cameraSubscriberClass,
      screenSubscriberClass,
    } = containerClasses(this.state);

    return (
      <div>
        <div className="App">
          <div className="App-main">
            <div className="App-video-container">
              { !connected && connectingMask() }
              { connected && !active && startCallMask(this.startCall)}
              <div id="cameraPublisherContainer" className={cameraPublisherClass} />
              <div id="screenPublisherContainer" className={screenPublisherClass} />
              <div id="cameraSubscriberContainer" className={cameraSubscriberClass} />
              <div id="screenSubscriberContainer" className={screenSubscriberClass} />
            </div>
            <div id="controls" className={controlClass}>
              <div className={localAudioClass} onClick={this.toggleLocalAudio} />
              <div className={localVideoClass} onClick={this.toggleLocalVideo} />
              <div className={localCallClass} onClick={this.endCall} />
            </div>
            <div id="chat" className="App-chat-container" />
          </div>
        </div>
      </div>
    );
  }
}

OpentokSession.propTypes = {
  opentokSettings: PropTypes.object,
  onSetSessionModalState: PropTypes.func,
};

export default OpentokSession;
