import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="ingresar" component={FuelSavingsPage}/>
    <Route path="registrarse" component={Signup}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
