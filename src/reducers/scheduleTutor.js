const initialState = {
	scheduleList: [],
	scheduleAction: {
		action: '',
		scheduleId: '',
		schedule: {},
	},
	appointmentType: '',
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
				scheduleList: action.payload,
			};
		case 'SET_SCHEDULE_ACTION':
			return {
				...state,
				scheduleAction: {
					action: action.payload.action,
					scheduleId: action.payload.scheduleId,
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
		default:
			return state;
	}
}
