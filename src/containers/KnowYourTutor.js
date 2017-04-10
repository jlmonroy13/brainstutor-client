import { connect } from 'react-redux';
import KnowYourTutor from '../components/KnowYourTutor';
import moment from 'moment-timezone';
import { scheduleMeeting, updatingScheduleMeeting, gettingSchedule } from '../actions/scheduleTutor';

const create10Dates = () => {
  let dates = [];
  for (let i = 0; i < 10; i++) {
    dates.push(moment.tz(moment.tz.guess()).add(i, 'days').format());
  }
  return dates;
};

const getLocalStorage = () => {
  const localData = localStorage.getItem('tutorInfo');
  if (localData) return JSON.parse(localData);
  return '';
};

const mapStateToProps = (state) => {
  const scheduleCreated = state.scheduleTutor.scheduleAction.schedule;
  let scheduleTutor = state.scheduleTutor;
  scheduleTutor = scheduleTutor.first_name ? scheduleTutor : getLocalStorage();
  const { id: studentId } = state.userInfo;
	const { first_name: firstName, last_name: lastName, id: teacherId } = scheduleTutor;
  const dates = create10Dates();

  return {
    firstName,
    lastName,
    teacherId,
    studentId,
    dates,
    scheduleCreated,
  };
};

const mapDispatchToProps = dispatch => ({
  onScheduleMeeting: (formData) => {
    dispatch(scheduleMeeting(formData));
  },
  onUpdateScheduleMeeting: (formData) => {
    dispatch(updatingScheduleMeeting(formData));
  },
  onGettingSchedule: (scheduleId) => {
    dispatch(gettingSchedule(scheduleId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KnowYourTutor);
