import React from 'react';
import Spinner from 'react-spinner';
import classNames from 'classnames';

import otCore from 'opentok-accelerator-core';

import Footer from './Footer';

const otCoreOptions = {
  credentials: {
    apiKey: '45820962',
    sessionId: '1_MX40NTgyMDk2Mn5-MTQ5MjU3MjMwNDY5OX5lT2dkU21McUJwVFRwN0IxdVRRTC9HOXh-fg',
    token: 'T1==cGFydG5lcl9pZD00NTgyMDk2MiZzaWc9NTc1ZTg2MzQzNTdlZDFlZmEzZDVkYTJkN2M1NzQ3MDczMzBiN2E3ZjpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lNRGsyTW41LU1UUTVNalUzTWpNd05EWTVPWDVsVDJka1UyMU1jVUp3VkZSd04wSXhkVlJSVEM5SE9YaC1mZyZjcmVhdGVfdGltZT0xNDkyNTcyMzU4Jm5vbmNlPTAuNDU5MDY0OTYzNDc3MzIyMyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDkyNTc1OTU5',
  },
  // A container can either be a query selector or an HTML Element
  streamContainers(pubSub, type, data, streamId) {
    return {
      publisher: {
        camera: '#cameraPublisherContainer',
        screen: '#screenPublisherContainer',
      },
      subscriber: {
        camera: '#cameraSubscriberContainer',
        screen: '#screenSubscriberContainer',
      },
    }[pubSub][type];
  },
  controlsContainer: '#controls',
  packages: ['textChat', 'screenSharing', 'annotation'],
  communication: {
    callProperites: null, // Using default
  },
  textChat: {
    name: ['David', 'Paul', 'Emma', 'George', 'Amanda'][Math.random() * 5 | 0], // eslint-disable-line no-bitwise
    waitingMessage: 'Messages will be delivered when other users arrive',
    container: '#chat',
  },
  screenSharing: {
    extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
    annotation: true,
    externalWindow: false,
    dev: true,
    screenProperties: {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      showControls: false,
      style: {
        buttonDisplayMode: 'off',
      },
      videoSource: 'window',
      fitMode: 'contain' // Using default
    },
  },
  annotation: {
    absoluteParent: {
      publisher: '.App-video-container',
      subscriber: '.App-video-container'
    }
  },
};

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
    <button className="message button clickable" onClick={start}>Click to Start Call </button>
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
    this.testing = new otCore(otCoreOptions);
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
      .then(({ publisher, publishers, subscribers, meta }) => {
        this.setState({ publishers, subscribers, meta, active: true });
      }).catch(error => console.log(error));
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
          <div className="App-header">
            <img src={require('../assets/images/form-icon.png')} className="App-logo" alt="logo" />
            <h1>OpenTok Accelerator Core</h1>
          </div>
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
        <Footer />
      </div>
    );
  }
}

export default OpentokSession;
