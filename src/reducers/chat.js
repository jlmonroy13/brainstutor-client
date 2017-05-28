const defaultState = {
	chatsList: [],
	messagesList: [],
};

export default function chatReducer(state = defaultState, action) {
	switch (action.type) {
		case 'SET_CHATS':
			return {
				...state,
				chatsList: action.payload,
			};
		case 'SET_MESSAGES':
			return {
				...state,
				messagesList: action.payload,
			};
		default:
			return state;
	}
}
