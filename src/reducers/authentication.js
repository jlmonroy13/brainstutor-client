import initialState from './initialState';

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
