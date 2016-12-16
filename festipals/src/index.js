import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import Layout from './components/Layout';

import ActsPage from './components/ActsPage';
import HomePage from './components/HomePage';
import PalsPage from './components/PalsPage';
import ProfilePage from './components/ProfilePage';
import SchedulePage from './components/SchedulePage';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';

// var LayoutWrapper = React.createClass({
//   render: function () {
//     return (
//         <Layout url='http://localhost:3001/api/comments' pollInterval={2000} />
//     );
//   }
// });

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={SchedulePage}></IndexRoute>
      <Route path="acts" component={ActsPage} url='http://localhost:3001/api/acts' pollInterval={4000}></Route>
      <Route path="home" component={HomePage}></Route>
      <Route path="pals" component={PalsPage}></Route>
      <Route path="profile" component={ProfilePage}></Route>
      <Route path="signUp" component={SignUpPage}></Route>
      <Route path="logIn" component={LogInPage}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
