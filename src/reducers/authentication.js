export default function authenticationReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
