import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import auth from './components/auth'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './css/index.css';

// layout
//import Layout from './components/Layout';
import PageHeader from './components/PageHeader';

// pages
import ActsPage from './components/ActsPage';
// import HomePage from './components/HomePage';
// import PalsPage from './components/PalsPage';
// import ProfilePage from './components/ProfilePage';
// import SchedulePage from './components/SchedulePage';
// import SignUpPage from './components/SignUpPage';
// import LogInPage from './components/LogInPage';
// import MasterPage from './components/LogInPage';


const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top" id="test" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapsing-navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="home">FestiPals</Link>
            </div>
            <div className="collapse navbar-collapse" id="collapsing-navbar">
              <ul className="nav navbar-nav">
                <li><Link to="/" activeClassName="active"><i className="fa fa-calendar"></i>My Schedule</Link></li>
                <li><Link to="pals" activeClassName="active"><i className="fa fa-users"></i>Pals</Link></li>
                <li><Link to="acts" activeClassName="active"><i className="fa fa-music"></i>Acts</Link></li>
                <li className="divider" activeClassName="active"></li>
                <li><Link to="profile" activeClassName="active"><i className="fa fa-user"></i>Profile</Link></li>
                <li><Link to="home" activeClassName="active"><i className="fa fa-sign-out"></i>Log Out</Link></li>
                <li>
                  {this.state.loggedIn ? (
                    <Link to="/logout">Log out</Link>
                  ) : (
                    <Link to="/login">Sign in</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </nav>
    )
  }
})

//

//

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

const Login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true })

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      })
    },

    render() {
      return (
        <div>
        <PageHeader icon="fa fa-users" title="Log In"/>

        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-offset-2">
                    <h4>Enter your information below:</h4>
                    <p><small>Don&rsquo;t have an account yet?</small></p>
                    <Link to="signUp"><p><small>Sign up now</small></p></Link>
                </div>
            </div>
            <br />

            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-offset-2">
                 <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label for="inputEmailLogIn">E-mail</label>
                      <input ref="email" type="email" className="form-control" id="inputEmailLogIn" placeholder="test@test"></input>
                    </div>
                    <div className="form-group">
                      <label for="inputPasswordLogIn">Password</label>
                      <input ref="pass" type="password" className="form-control" id="inputPasswordLogIn" placeholder="test"></input>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Log In</button>
                    {this.state.error && (
                      <p>Bad login information</p>
                    )}
                </form>
              </div>
            </div>
        </div>
        </div>

      )
    }
  })
)

const About = React.createClass({
  render() {
    return <h1>About</h1>
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="acts" component={ActsPage} url='http://localhost:3001/api/acts' pollInterval={4000} onEnter={requireAuth}></Route>
    </Route>
  </Router>
), document.getElementById('root')

//   <Router history={browserHistory}>
//     <Route path='/' component={Layout}>
//       <IndexRoute component={SchedulePage}></IndexRoute>
//
//       <Route path="home" component={HomePage}></Route>
//       <Route path="pals" component={PalsPage}></Route>
//       <Route path="profile" component={ProfilePage}></Route>
//       <Route path="signUp" component={SignUpPage}></Route>
//       <Route path="logIn" component={LogInPage}></Route>
//
//     </Route>
//   </Router>,
//   document.getElementById('root')
)



//
// // var LayoutWrapper = React.createClass({
// //   render: function () {
// //     return (
// //         <Layout url='http://localhost:3001/api/comments' pollInterval={2000} />
// //     );
// //   }
// // });
//
// ReactDOM.render(

// );
