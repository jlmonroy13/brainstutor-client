export default function teachersReducer(state = {}, action) {
	switch (action.type) {
		case 'SET_TEACHERS':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
