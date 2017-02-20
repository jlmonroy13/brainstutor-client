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
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignupIndex from './components/SignupIndex';
import LogInIndex from './components/LogInIndex';
import AfterSignupTeacher from './components/AfterSignupTeacher';
import { getUserInfo, setAuthInProcess } from './actions/authentication';

const getLocalStorage = () => (
  JSON.parse(localStorage.getItem('BrainsUserInfo'))
);

const setUserInfo = (userInfo, dispatch) => {
  const id = userInfo.id||getLocalStorage()&&getLocalStorage().id;
  const role = userInfo.role||getLocalStorage()&&getLocalStorage().role;
  dispatch(getUserInfo(id, role));
};

const verifyToken = userInfo => {
  const token = userInfo&&userInfo.token||getLocalStorage()&&getLocalStorage().token;
  if (!token) browserHistory.push('/ingresar');
};

const authInProcess = store => {
  return () => {
    const { dispatch } = store;
    dispatch(setAuthInProcess(true));
  };
};

const onEnterProfile = store => {
  return () => {
    const { dispatch, getState } = store;
    const { userInfo } = getState();

    verifyToken(userInfo);
    setUserInfo(userInfo, dispatch);
    dispatch(setAuthInProcess(false));
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
    const { dispatch } = store;
    dispatch(setAuthInProcess(false));
  };
};

const onEnterTutorSignupProcess = store => {
  return () => {
    const { dispatch, getState } = store;
    const { userInfo } = getState();

    verifyToken(userInfo);
    setUserInfo(userInfo, dispatch);
    dispatch(setAuthInProcess(false));
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
    <Route path="*" component={NotFoundPage} />
  </Route>
);
