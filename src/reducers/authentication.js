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
				university: action.payload,
			};
		default:
			return state;
	}
}
