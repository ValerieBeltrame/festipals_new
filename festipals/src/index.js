import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './css/index.css';

import Layout from './components/Layout';

import ActsPage from './components/ActsPage';
import HomePage from './components/HomePage';
import PalsPage from './components/PalsPage';
import ProfilePage from './components/ProfilePage';
import RequestPage from './components/RequestPage';
import SchedulePage from './components/SchedulePage';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';

function loggedIn() {
  //get user session to see if someone is logged in
  return true;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/home'
    })
  }
}

ReactDOM.render(
  <Router history={browserHistory}>

    <Route path='/' component={Layout} loggedIn={loggedIn()}>
      <IndexRoute component={SchedulePage} onEnter={requireAuth} url='http://localhost:3001/api/pals/584552f3f36d282dbc878996/details'></IndexRoute>
      <Route path="acts" component={ActsPage} onEnter={requireAuth} url='http://localhost:3001/api/acts'></Route>
      <Route path="home" component={HomePage} loggedIn={loggedIn()}></Route>
      <Route path="pals" component={PalsPage} onEnter={requireAuth} url='http://localhost:3001/api/pals'></Route>
      <Route path="profile" component={ProfilePage} onEnter={requireAuth}  url='http://localhost:3001/api/pals/584552f3f36d282dbc878996/details'></Route>
      <Route path="requests" component={RequestPage} onEnter={requireAuth}  url='http://localhost:3001/api/pals/584552f3f36d282dbc878996/details'></Route>
      <Route path="signUp" component={SignUpPage}></Route>
      <Route path="logIn" component={LogInPage}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
