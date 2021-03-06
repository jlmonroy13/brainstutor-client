const defaultState = {
  isModalOpen: false,
  data: {
    apiKey: '',
    sessionId: '',
    token: '',
    error: '',
    meetingId: '',
  },
};

export default function openTokSessionReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_SESSION_MODAL_STATE':
      return {
        ...state,
        isModalOpen: action.payload,
      };

    case 'SET_SESSION_DATA':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
