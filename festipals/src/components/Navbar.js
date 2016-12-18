import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import '../css/Navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    //get user session to see if someone is logged in
    this.state = {loggedIn: props.loggedIn};
  }
  render() {
    console.log(this.props);
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
          {this.state.loggedIn
            ? <div className="collapse navbar-collapse" id="collapsing-navbar">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/" activeClassName="active"><i className="fa fa-calendar"></i>My Schedule</IndexLink></li>
                <li><Link to="pals" activeClassName="active"><i className="fa fa-users"></i>Pals</Link></li>
                <li><Link to="acts" activeClassName="active"><i className="fa fa-music"></i>Acts</Link></li>
                <li className="divider" activeClassName="active"></li>
                <li><Link to="profile" activeClassName="active"><i className="fa fa-user"></i>Profile</Link></li>
                <li><Link to="home"><i className="fa fa-sign-out"></i>Log Out</Link></li>
              </ul>
            </div>
            : null
          }
        </div>
      </nav>
    );
  }
}
