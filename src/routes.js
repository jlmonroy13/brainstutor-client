import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import SignupStudentsContainer from './containers/SignupStudents';
import SignupTutorsContainer from './containers/SignupTutors';
import StudentProfileContainer from './containers/StudentProfile';
import LogInStudentsContainer from './containers/LogInStudents';
import LogInTutorsContainer from './containers/LogInTutors';
import HowToBeTutorContainer from './containers/HowToBeTutor';
import SignupTutorsProcessContainer from './containers/SignupTutorsProcess';
import UpdateTutorContainer from './containers/UpdateTutor';
import UpdateBankInfoContainer from './containers/UpdateBankInfo';
import TutorProfileContainer from './containers/TutorProfile';
import FindTutorContainer from './containers/FindTutor';
import KnowYourTutorContainer from './containers/KnowYourTutor';
import ScheduleListContainer from './containers/ScheduleList';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignupIndex from './components/SignupIndex';
import OpentokSession from './components/OpentokSession';
import LogInIndex from './components/LogInIndex';
import AfterSignupTeacher from './components/AfterSignupTeacher';
import StepToStepInfo from './components/StepToStepInfo';
import Prices from './components/Prices';
import StudentsDashboard from './components/StudentsDashboard';
import TutorsDashboard from './components/TutorsDashboard';
import { getUserInfo, setAuthInProcess } from './actions/authentication';
import { gettingSchedule } from './actions/scheduleTutor';
import moment from 'moment-timezone';


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
  const today = moment.tz(moment.tz.guess());
  const localData = getLocalStorage();
  const { dispatch, getState } = store;
  const { routing:{ locationBeforeTransitions: { pathname } } } = getState();
  const token = userInfo&&userInfo.token||localData&&localData.token;
  const id = localData&&localData.id;
  const role = localData&&localData.role;
  if (!token && pathname !== '/' && pathname !== '/ver-tutores' && pathname.indexOf('/perfil-tutor/') == -1) {
    browserHistory.push('/');
    callback();
    return;
  }

  validateTokenExpiration(localData, today, pathname, callback);

  if (userInfo&&!userInfo.first_name&&token)  {
    dispatch(getUserInfo(id, role, callback));
    return;
  }
  if (userInfo && userInfo.status && userInfo.status !== 'complete' && pathname !== '/' && pathname !== '/tutores/home' && pathname !== '/tutores/inicio') {
    dispatch(setAuthInProcess(true));
    callback();
  } else if (userInfo && userInfo.status !== 'complete' && pathname === '/tutores/home') {
    dispatch(getUserInfo(id, role, callback));
    dispatch(setAuthInProcess(true));
    return;
  } else if (userInfo && userInfo.status === 'complete' && pathname === '/tutores/home') {
    dispatch(setAuthInProcess(false));
    browserHistory.push('/tutores/inicio');
    callback();
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
  return () => {
    const { dispatch, getState } = store;
    const { userInfo } = getState();
    if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) browserHistory.push('/tutores/home');
    dispatch(setAuthInProcess(true));
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
      component={StudentProfileContainer}
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
      component={StudentsDashboard}
      onEnter={onEnterProfile(store)}
    />
    <Route
      path="/tutores/inicio"
      component={TutorsDashboard}
      onEnter={onEnterProfile(store)}
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
      path="/opentok"
      component={OpentokSession}
    />
    <Route
      path="/estudiantes/agendar-tutoria/:id"
      component={KnowYourTutorContainer}
      onEnter={onEnterKnowYourTutorId(store)}
    />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
