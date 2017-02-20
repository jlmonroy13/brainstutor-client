export default function authenticationReducer(state = {}, action) {
	switch (action.type) {
		case 'SET_USER_INFO':
			return {
				...state,
				...action.payload,
			};
		case 'SET_TEACHER_UNIVERSITY':
			return {
				...state,
				profile: {
					...state.profile,
					university: action.payload,
				}
			};
		case 'SET_AUTH_IN_PROCESS':
			return {
				...state,
				authInProcess: action.payload,
			};
		case 'SET_STATUS_REQUEST':
			return {
				...state,
				onLoading: action.payload,
			};
		case 'DELETE_USER_INFO':
			return {};
		default:
			return state;
	}
}
