import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import SignupStudentsContainer from './containers/SignupStudents';
import SignupTeachersContainer from './containers/SignupTeachers';
import StudentProfileContainer from './containers/StudentProfile';
import LogInContainer from './containers/LogIn';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';

function verifyToken() {
	const userInfo = JSON.parse(localStorage.getItem('BrainsUserInfo'));
	if (!userInfo || !userInfo.token) {
		browserHistory.push('/ingresar');
	} 
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="ingresar" component={LogInContainer}/>
    <Route path="registro-estudiantes" component={SignupStudentsContainer}/>
    <Route path="registro-profesores" component={SignupTeachersContainer}/>
    <Route
			path="perfil-estudiante"
			component={StudentProfileContainer}
			onEnter={verifyToken}
    />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);