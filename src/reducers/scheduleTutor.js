export default function scheduleTutorReducer(state = {}, action) {
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
		default:
			return state;
	}
}
