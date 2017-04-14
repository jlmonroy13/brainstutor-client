import { brains } from '../utils/requests';
import Alert from 'react-s-alert';
import { } from '../requests/users';

const requestScheduleMeeting = (data) => {
  const { teacherId, studentId, startAt, modality, message, endAt, duration } = data;
  return brains
    .post(`/students/schedules?schedule[teacher_id]=${teacherId}&schedule[student_id]=${studentId}&schedule[start_at]=${startAt}&schedule[modality]=${modality}&schedule[message]=${message}&schedule[end_date]=${endAt}&schedule[duration]=${duration}`)
    .catch(catchRequestError);
};

const updateScheduleMeeting = (data) => {
  const { startAt, id, message } = data;
  return brains
    .put(`/students/schedules/${id}?schedule[start_at]=${startAt}&schedule[message]=${message}&schedule[status]=awaiting_tutor`)
    .catch(catchRequestError);
};

const getSchedule = (scheduleId) => {
  return brains
    .get(`/students/schedules/${scheduleId}`)
    .catch(catchRequestError);
};

const fetchScheduleList = (type, status, page) => {
  return brains
    .get(`/${type}s/schedules?status=${status}&page=${page}`)
    .catch(catchRequestError);
};

const updateScheduleStatus = (type, data) => {
  const { id, status, message } = data;
  return brains
    .put(`/${type}s/schedules/${id}?schedule[status]=${status}&schedule[message]=${message}`)
    .catch(catchRequestError);
};


function catchRequestError({ response }) {
  const errorMsg = response.data.error && response.data.error.user_authentication[0];
  Alert.error(errorMsg);
}

export {
  requestScheduleMeeting,
  fetchScheduleList,
  updateScheduleStatus,
  updateScheduleMeeting,
  getSchedule,
};
