import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import SignupStudentsContainer from './containers/SignupStudents';
import SignupTutorsContainer from './containers/SignupTutors';
import StudentProfileContainer from './containers/StudentProfile';
import LogInStudentsContainer from './containers/LogInStudents';
import LogInTutorsContainer from './containers/LogInTutors';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignupIndex from './components/SignupIndex';
import LogInIndex from './components/LogInIndex';
import HowToBeTutor from './components/HowToBeTutor';

function verifyToken() {
	const userInfo = JSON.parse(localStorage.getItem('BrainsUserInfo'));
	if (!userInfo || !userInfo.token) {
		browserHistory.push('/ingresar');
	}
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="ingresar-estudiantes" component={LogInStudentsContainer}/>
    <Route path="ingresar-tutores" component={LogInTutorsContainer}/>
    <Route path="registro-estudiantes" component={SignupStudentsContainer}/>
    <Route path="como-ser-tutor" component={HowToBeTutor}/>
    <Route path="registro-tutores" component={SignupTutorsContainer}/>
    <Route path="registro" component={SignupIndex}/>
    <Route path="ingresar" component={LogInIndex}/>
    <Route
			path="perfil-estudiante"
			component={StudentProfileContainer}
			onEnter={verifyToken}
    />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
