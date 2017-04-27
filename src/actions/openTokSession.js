import { pendingTask, begin, end } from 'react-redux-spinner';
import { ReqGetSessionStatus } from '../requests/schedules';


const setStatusRequestFalse = () => ({
  type: 'SET_STATUS_REQUEST',
  payload: false,
  [ pendingTask ]: end,
});

const setStatusRequestTrue = () => ({
  type: 'SET_STATUS_REQUEST',
  payload: true,
  [ pendingTask ]: begin,
});

const setSessionModalState = state => ({
  type: 'SET_SESSION_MODAL_STATE',
  payload: state,
});

const setSessionData = data => ({
  type: 'SET_SESSION_DATA',
  payload: data,
});

const getSessionStatus = (type, id) => {
  return (dispatch) => {
    dispatch(setStatusRequestTrue());
    ReqGetSessionStatus(type, id)
      .then(successFetchScheduleList);

    function successFetchScheduleList({data}) {
      dispatch(setStatusRequestFalse());
      data.meetingId = id;
      dispatch(setSessionData(data));
      dispatch(setSessionModalState(true));
    }
  };
};

export {
  getSessionStatus,
  setSessionModalState,
};
