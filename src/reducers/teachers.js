const defaultState = {
	list: [],
	totalPages: '',
	currentPage: '',
};

export default function teachersReducer(state = defaultState, action) {
	switch (action.type) {
		case 'SET_TEACHERS':
			return {
				...state,
				list: action.payload.teachers,
				totalPages: action.payload.meta.pagination.total_pages,
				currentPage: action.payload.meta.pagination.current_page,
			};
		default:
			return state;
	}
}
