import { brains } from '../utils/requests';
import Alert from 'react-s-alert';
import { } from '../requests/users';

const requestScheduleMeeting = (data) => {
  const { teacherId, studentId, startAt, modality } = data;
  return brains
    .post(`/students/schedules?schedule[teacher_id]=${teacherId}&schedule[student_id]=${studentId}&schedule[start_at]=${startAt}&schedule[modality]=${modality}`)
    .catch(catchRequestError);
};

const fetchScheduleList = (type) => {
  return brains
    .get(`/${type}s/schedules`)
    .catch(catchRequestError);
};


function catchRequestError({ response }) {
  const errorMsg = response.data.error && response.data.error.user_authentication[0];
  Alert.error(errorMsg);
}

export {
  requestScheduleMeeting,
  fetchScheduleList,
};