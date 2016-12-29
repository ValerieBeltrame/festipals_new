import React, { Component } from 'react';
import PageHeader from './PageHeader.js';
import { Link } from 'react-router';

export default class SignUpPage extends Component {
  render() {

      return (
          <div>
              <PageHeader icon="fa fa-users" title="Sign Up"/>

              <div className="container">
                      <div className="row">
                          <div className="col-xs-12 col-sm-6 col-md-offset-2">
                              <h4>Enter your information below:</h4>
                              <p><small>Already have an account?</small></p>
                              <Link to="logIn"><p><small>Log in now</small></p></Link>
                           </div>
                       </div>
                       <br />

                       <div className="row">
                           <div className="col-xs-12 col-sm-6 col-md-offset-2">
                             <form>
                                      <div className="form-group">
                                        <label for="inputFirstName">First Name</label>
                                        <input type="email" className="form-control" id="inputFirstName" placeholder="fx. Mads"></input>
                                      </div>
                                      <div className="form-group">
                                        <label for="inputLastName">Last Name</label>
                                        <input type="password" className="form-control" id="inputLastName" placeholder="fx. Mikkelsen"></input>
                                      </div>
                                      <div className="form-group">
                                        <label for="inputEmailSignUp">E-mail</label>
                                        <input type="password" className="form-control" id="inputEmailSignUp" placeholder="fx. mikkelsen@gmail.com"></input>
                                      </div>
                                      <div className="form-group">
                                        <label for="inputPasswordSignUp">Password</label>
                                        <input type="password" className="form-control" id="inputPasswordSignUp" placeholder="****"></input>
                                      </div>
                                      <div className="form-group">
                                        <label for="inputRepeatPasswordSignUp">Repeat Password</label>
                                        <input type="password" className="form-control" id="inputRepeatPasswordSignUp" placeholder="****"></input>
                                      </div>
                                      <div class="checkbox">
                                         <label for="checkboxRobot">I am not a Robot</label>
                                         <input type="checkbox" className="form-control" id="checkboxRobot"></input>
                                       </div>
                                    <Link to="acts"><button type="button" className="btn btn-orange btn-lg btn-block"> Sign Up</button></Link>
                              </form>
                          </div>
                    </div>
             </div>

      </div>
      )
    }
  }
