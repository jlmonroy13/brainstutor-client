const initialState = {
	scheduleList: {
		list: [],
		totalPages: '',
		currentPage: '',
	},
	scheduleAction: {
		action: '',
		scheduleId: '',
		schedule: {},
	},
	appointmentType: '',
	wasCreatedSchedule: false,
};

export default function scheduleTutorReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_TUTOR_INFO':
			return {
				...state,
				...action.payload,
			};
		case 'SET_APPOINTMENT_TYPE':
			return {
				...state,
				appointmentType: action.payload,
			};
		case 'SET_SCHEDULE_LIST':
			return {
				...state,
				scheduleList: {
					list: action.payload.schedules,
					totalPages: action.payload.meta.pagination.total_pages,
					currentPage: action.payload.meta.pagination.current_page,
				},
			};
		case 'SET_SCHEDULE_ACTION':
			return {
				...state,
				scheduleAction: {
					action: action.payload.action,
					scheduleId: action.payload.scheduleId,
					receiverId: action.payload.receiverId,
				},
			};
		case 'SET_SCHEDULE':
			return {
				...state,
				scheduleAction: {
					...state.scheduleAction,
					schedule: {
						...action.payload,
					}
				},
			};
		case 'SET_SCHEDULE_CREATED':
			return {
				...state,
				wasCreatedSchedule: action.payload,
			};
		default:
			return state;
	}
}
