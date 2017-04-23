const opentokSettings = {
  credentials: {
    apiKey: '45820962',
    sessionId: '1_MX40NTgyMDk2Mn5-MTQ5Mjk1MTM1Njg1Nn5xMUsvYndRbDJQeEtnYXJNVGM4UHM3SDZ-fg',
    token: 'T1==cGFydG5lcl9pZD00NTgyMDk2MiZzaWc9ZTAyOGZjMjU0ZmNlNzY2YTI1ZGFlNzdhM2EwMGU4ZmEyM2MwNDA1YTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lNRGsyTW41LU1UUTVNamsxTVRNMU5qZzFObjV4TVVzdlluZFJiREpRZUV0bllYSk5WR000VUhNM1NEWi1mZyZjcmVhdGVfdGltZT0xNDkyOTUxMzc2Jm5vbmNlPTAuODUzMjgyOTcwNjYzODAxNCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDkzNTU2MTc1JmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEJTIyam9yZ2UlMjI=',
  },
  // A container can either be a query selector or an HTML Element
  streamContainers(pubSub, type) {
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
    extensionID: 'lnelddcefbaegccapdffdfmccgbakgje',
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

export default opentokSettings;