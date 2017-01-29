import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignupContainer from './containers/Signup';
import LogInContainer from './containers/LogIn';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="ingresar" component={LogInContainer}/>
    <Route path="registrarse" component={SignupContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);