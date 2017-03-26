export default function scheduleTutorReducer(state = {}, action) {
	switch (action.type) {
		case 'SET_TUTOR_INFO':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
