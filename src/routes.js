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
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignupIndex from './components/SignupIndex';
import LogInIndex from './components/LogInIndex';
import AfterSignupTeacher from './components/AfterSignupTeacher';
import StepToStepInfo from './components/StepToStepInfo';
import ScheduleTutor from './components/ScheduleTutor';
import ScheduleList from './components/ScheduleList';
import StudentsDashboard from './components/StudentsDashboard';
import TutorsDashboard from './components/TutorsDashboard';
import { getUserInfo, setAuthInProcess } from './actions/authentication';
import { getTutorsRequest } from './actions/teacher';
import moment from 'moment-timezone';


const getLocalStorage = () => {
  const localData = localStorage.getItem('BrainsUserInfo');
  if (localData) return JSON.parse(localData);
  return '';
};

const validateTokenExpiration = (localData, today, pathname) => {
  if (localData)  {
    const loginDate = moment(localData.loginAt).tz(moment.tz.guess());
    const diffDates = today.from(loginDate);
    if (diffDates.indexOf('day') != -1) {
      localStorage.setItem('BrainsUserInfo', '');
      if (pathname !== '/') {
        browserHistory.push('/');
        return;
      }
    } 
  }
};

const verifyToken = (userInfo, store) => {
  const today = moment.tz(moment.tz.guess());
  const localData = getLocalStorage();
  const { dispatch, getState } = store;
  const { routing:{ locationBeforeTransitions: { pathname } } } = getState();
  const token = userInfo&&userInfo.token||localData&&localData.token;
  const id = localData&&localData.id;
  const role = localData&&localData.role;
  if (!token && pathname !== '/') {
    browserHistory.push('/');
    return;
  }

  validateTokenExpiration(localData, today, pathname);
  
  if (userInfo&&!userInfo.first_name&&token) dispatch(getUserInfo(id, role));

  if (userInfo && userInfo.status && userInfo.status !== 'complete' && pathname !== '/' && pathname !== '/tutores/home' && pathname !== '/tutores/inicio') {
    dispatch(setAuthInProcess(true));
  } else if (userInfo && userInfo.status !== 'complete' && pathname === '/tutores/home') {
    dispatch(getUserInfo(id, role));
    dispatch(setAuthInProcess(true));
  } else if (userInfo && userInfo.status === 'complete' && pathname === '/tutores/home') {
    browserHistory.push('/tutores/inicio');
    dispatch(setAuthInProcess(false));
  } else {
    dispatch(setAuthInProcess(false));
  }
};

const authInProcess = store => {
  return () => {
    const { dispatch } = store;
    dispatch(setAuthInProcess(true));
  };
};

const onEnterProfile = store => {
  return () => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store);
  };
};

const onEnterKnowYourTutor = store => {
  return () => {
    const { getState } = store;
    const { userInfo } = getState();
    
    verifyToken(userInfo, store);
  };
};

const onEnterTutorProfile = store => {
  return () => {
    const { dispatch, getState } = store;
    const { userInfo } = getState();
    if (!userInfo.first_name) browserHistory.push('/tutores/home');
    dispatch(setAuthInProcess(true));
  };
};

const onEnterFindTutor = store => {
  return () => {
    const { dispatch } = store;
    dispatch(getTutorsRequest());
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
  return () => {
    const { getState } = store;
    const { userInfo } = getState();

    verifyToken(userInfo, store);
  };
};

const onEnterTutorSignupProcess = store => {
  return () => {
    const { getState } = store;
    const { userInfo } = getState();
    verifyToken(userInfo, store);
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
      component={ScheduleTutor}
      onEnter={onEnterKnowYourTutor(store)}
    />
    <Route
      path="/perfil-tutor/:id"
      component={TutorProfileContainer}
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
      component={ScheduleList}
      onEnter={onEnterKnowYourTutor(store)}
    />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
