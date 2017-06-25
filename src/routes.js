import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import SignupStudentsContainer from './containers/SignupStudents';
import SignupTutorsContainer from './containers/SignupTutors';
import LogInStudentsContainer from './containers/LogInStudents';
import LogInTutorsContainer from './containers/LogInTutors';
import HowToBeTutorContainer from './containers/HowToBeTutor';
import SignupTutorsProcessContainer from './containers/SignupTutorsProcess';
import UpdateTutorContainer from './containers/UpdateTutor';
import UpdateStudentContainer from './containers/UpdateStudent';
import UpdateBankInfoContainer from './containers/UpdateBankInfo';
import TutorProfileContainer from './containers/TutorProfile';
import FindTutorContainer from './containers/FindTutor';
import KnowYourTutorContainer from './containers/KnowYourTutor';
import ScheduleListContainer from './containers/ScheduleList';
import OpentokSessionContainer from './containers/OpentokSession';
import MessageListContainer from './containers/MessageList';
import ChatContainer from './containers/Chat';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignupIndex from './components/SignupIndex';
import LogInIndex from './components/LogInIndex';
import AfterSignupTeacher from './components/AfterSignupTeacher';
import StepToStepInfo from './components/StepToStepInfo';
import Prices from './components/Prices';
import UserDashboardContainer from './containers/UserDashboard';
import { getUserInfo, setAuthInProcess } from './actions/authentication';
import { gettingSchedule } from './actions/scheduleTutor';
import { setSessionData } from './actions/openTokSession';
import { reqGetChats, reqGetMessages } from './actions/chat';
import moment from 'moment-timezone';
import { getDashboardRequest } from './actions/teacher';


const getLocalStorage = () => {
  const localData = localStorage.getItem('BrainsUserInfo');
  if (localData) return JSON.parse(localData);
  return '';
};

const validateTokenExpiration = (localData, today, pathname, callback) => {
  if (localData)  {
    const loginDate = moment(localData.loginAt).tz(moment.tz.guess());
    const diffDates = today.from(loginDate);
    if (diffDates.indexOf('day') != -1) {
      localStorage.setItem('BrainsUserInfo', '');
      if (pathname !== '/') {
        browserHistory.push('/');
        callback();
        return;
      }
    }
  }
};

const verifyToken = (userInfo, store, callback) => {
  const userData = userInfo.student&&userInfo.student.id ? {...userInfo, ...userInfo.student} : userInfo;
  const today = moment.tz(moment.tz.guess());
  const localData = getLocalStorage();
  const { dispatch, getState } = store;
  const { routing:{ locationBeforeTransitions: { pathname } } } = getState();
  const token = userData&&userData.token||localData&&localData.token||localData&&localData.student&&localData.student.token;
  const id = localData&&localData.id||localData&&localData.student&&localData.student.id;
  const role = localData&&localData.role;

  if (!token && pathname !== '/' && pathname !== '/ver-tutores' && pathname.indexOf('/perfil-tutor/') == -1) {
    browserHistory.push('/');
    callback();
    return;
  }

  validateTokenExpiration(localData, today, pathname, callback);

  if (userData&&!userData.first_name&&token)  {
    dispatch(getUserInfo(id, role, callback));
    return;
  }
  if (userData && userData.status && userData.status !== 'complete' && pathname !== '/' && pathname !== '/tutores/home' && pathname !== '/tutores/inicio' && pathname !== '/estudiantes/inicio') {
    dispatch(setAuthInProcess(true));
    callback();
  } else if (userData && userData.status !== 'complete' && pathname === '/tutores/home') {
    dispatch(getUserInfo(id, role, callback));
    dispatch(setAuthInProcess(true));
    return;
  } else if (userData && userData.status === 'complete' && (pathname === '/tutores/perfil' || pathname === '/tutores/informacion-bancaria')) {
    dispatch(getUserInfo(id, role, callback));
    dispatch(setAuthInProcess(true));
    return;
  } else if (userData && userData.status === 'complete' && pathname === '/tutores/home') {
    dispatch(setAuthInProcess(false));
    browserHistory.push('/tutores/inicio');
    callback();
    return;
  } else if (userData && userData.role && (pathname === '/tutores/inicio' || pathname === '/estudiantes/inicio')) {
    dispatch(setAuthInProcess(false));
    dispatch(getDashboardRequest(userData.role, callback));
    return;
  } else {
    dispatch(setAuthInProcess(false));
    callback();
  }
};

const authInProcess = store => {
  return () => {
    const { dispatch } = store;
    dispatch(setAuthInProcess(true));
  };
};

const onEnterProfile = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
  };
};

const onEnterKnowYourTutor = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
  };
};

const onEnterPaidScheduleTutor = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo, scheduleTutor: { appointmentType } } = getState();
    verifyToken(userInfo, store, callback);
    if (appointmentType !== 'paid') browserHistory.push('/ver-tutores');
  };
};

const onEnterKnowYourTutorId = store => {
  return (nextState, replace, callback) => {
    const { dispatch, getState } = store;
    const { userInfo, routing: { locationBeforeTransitions: { pathname }} } = getState();
    const id = pathname.substr(29);
    if(!userInfo.id) browserHistory.push('/estudiantes/tutorias-agendadas');
    dispatch(gettingSchedule(id, callback));
  };
};

const onEnterChat = store => {
  return (nextState, replace, callback) => {
    const { dispatch, getState } = store;
    const { userInfo, routing: { locationBeforeTransitions: { pathname }} } = getState();
    const id = pathname.substr(6);
    if(!userInfo.id) browserHistory.push('/mensajes');
    dispatch(reqGetMessages(id, callback));
  };
};

const onEnterTutorProfile = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
  };
};

const onEnterFindTutor = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
  };
};

const onEnterBankInfo = store => {
  return (nextState, replace, callback) => {
    const { dispatch, getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
    if(userInfo.status !== 'complete') dispatch(setAuthInProcess(true));
  };
};

const onEnterIndex = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();

    verifyToken(userInfo, store, callback);
  };
};

const onEnterTutorSignupProcess = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
  };
};

const onEnterMessageList = store => {
  return (nextState, replace, callback) => {
    const { dispatch, getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
    dispatch(reqGetChats());
  };
};

const onEnterDashboard = store => {
  return (nextState, replace, callback) => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store, callback);
  };
};

const onEnterOpenTokSession = store => {
  return (nextState, replace, callback) => {
    const { dispatch, getState } = store;
    const { userInfo, openTokSession: { data } } = getState();
    let localData = localStorage.getItem('openTokBrains');
    localData = localData ? JSON.parse(localData) : {};

    if(!data.apiKey) dispatch(setSessionData(localData));
    verifyToken(userInfo, store, callback);
  };
};

export default store => (
  <Route path="/" component={App}>
    <IndexRoute
      component={HomePage}
      onEnter={onEnterIndex(store)}
    />
    <Route
      path="/estudiantes/ingresar"
      component={LogInStudentsContainer}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/estudiantes/registrarse"
      component={SignupStudentsContainer}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/tutores/ingresar"
      component={LogInTutorsContainer}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/tutores/registrarse"
      component={SignupTutorsContainer}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/tutores/registrarse-3"
      component={AfterSignupTeacher}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/tutores/home"
      component={SignupTutorsProcessContainer}
      onEnter={onEnterTutorSignupProcess(store)}
    />
    <Route
      path="/tutores/perfil"
      component={UpdateTutorContainer}
      onEnter={onEnterTutorProfile(store)}
    />
    <Route
      path="/tutores/informacion-bancaria"
      component={UpdateBankInfoContainer}
      onEnter={onEnterBankInfo(store)}
    />
    <Route
      path="/registro"
      component={SignupIndex}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/ingresar"
      component={LogInIndex}
      onEnter={authInProcess(store)}
    />
    <Route
      path="/como-ser-tutor"
      component={HowToBeTutorContainer}
    />
    <Route
      path="/perfil-estudiante"
      component={UpdateStudentContainer}
      onEnter={onEnterProfile(store)}
    />
    <Route
      path="/como-funciona"
      component={StepToStepInfo}
    />
    <Route
      path="/ver-tutores"
      component={FindTutorContainer}
      onEnter={onEnterFindTutor(store)}
    />
    <Route
      path="/estudiantes/conoce-tu-tutor"
      component={KnowYourTutorContainer}
      onEnter={onEnterKnowYourTutor(store)}
    />
    <Route
      path="/estudiantes/agendar-tutoria"
      component={KnowYourTutorContainer}
      onEnter={onEnterPaidScheduleTutor(store)}
    />
    <Route
      path="/perfil-tutor/:id"
      component={TutorProfileContainer}
      onEnter={onEnterFindTutor(store)}
    />
    <Route
      path="/estudiantes/inicio"
      component={UserDashboardContainer}
      onEnter={onEnterDashboard(store)}
    />
    <Route
      path="/tutores/inicio"
      component={UserDashboardContainer}
      onEnter={onEnterDashboard(store)}
    />
    <Route
      path="/estudiantes/tutorias-agendadas"
      component={ScheduleListContainer}
      onEnter={onEnterKnowYourTutor(store)}
    />
    <Route
      path="/tutores/tutorias-agendadas"
      component={ScheduleListContainer}
      onEnter={onEnterKnowYourTutor(store)}
    />
    <Route
      path="/precios"
      component={Prices}
    />
    <Route
      path="/salon-de-clases/:id"
      component={OpentokSessionContainer}
      onEnter={onEnterOpenTokSession(store)}
    />
    <Route
      path="/estudiantes/agendar-tutoria/:id"
      component={KnowYourTutorContainer}
      onEnter={onEnterKnowYourTutorId(store)}
    />
    <Route
      path="/mensajes"
      component={MessageListContainer}
      onEnter={onEnterMessageList(store)}
    />Enter={onEnterKnowYourTutorId(store)}
    />
    <Route
      path="/chat/:id"
      component={ChatContainer}
      onEnter={onEnterChat(store)}
    />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
