import React, { Component } from 'react';
import Navbar from './Navbar.js';

export default class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Navbar loggedIn={this.props.route.loggedIn}/>
        {/* this.props.children contains the page that has to be rendered for the routes*/}
        {this.props.children}
      </div>
    );
  }
}
