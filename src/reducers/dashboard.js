const defaultState = {
	data: '',
};

export default function teachersReducer(state = defaultState, action) {
	switch (action.type) {
		case 'SET_DASHBOARD':
			return action.payload;
		default:
			return state;
	}
}