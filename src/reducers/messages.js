const defaultState = [];

export default function teachersReducer(state = defaultState, action) {
	switch (action.type) {
		case 'SET_MESSAGES':
			return action.payload;
		default:
			return state;
	}
}
