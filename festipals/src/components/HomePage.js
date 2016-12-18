import React, { Component } from 'react';
import '../css/HomePage.css';
import logo from '../img/roskildelogo.png';
import { Link } from 'react-router';

export default class HomePage extends Component {
  render() {
    return (
        <div>
            <div className="container-fluid">
                  <div className="page-header">
                    <div className="container text-center">
                              <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                  <img className="img-responsive roskildeLogo" alt="roskilde-festival-logo" src={logo} />
                              </div>

                                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                    <h1>FestiPals</h1>
                                </div>
                    </div>
                  </div>
            </div>

            <div className="container">
              { this.props.route.loggedIn
               ? <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-offset-3 text-center loggedIndiv">
                              <h4>Logged in as UserName</h4>
                         </div>
                         <div className="col-xs-12 col-sm-3 col-md-offset-3">
                               <Link to="acts"><button type="button" className="btn btn-default btn-lg btn-block homePageButton"><i className="fa fa-music"></i> View all acts</button></Link>
                         </div>
                         <div className="col-xs-12 col-sm-3">
                               <Link to="/"><button type="button" className="btn btn-default btn-lg btn-block homePageButton"><i className="fa fa-calendar"></i>  My schedule</button></Link>
                         </div>
                 </div>
                :  <div className="row">
                          <div className="col-xs-12 col-sm-3 col-md-offset-3">
                                <Link to="logIn"><button type="button" className="btn btn-primary btn-lg btn-block homePageButton">Log in</button></Link>
                          </div>
                          <div className="col-xs-12 col-sm-3">
                                <Link to="signUp"><button type="button" className="btn btn-primary btn-lg btn-block homePageButton">Sign up</button></Link>
                          </div>
                  </div>
              }

                    <div className="row festiPalsDescription">
                      <div className="col-xs-12 col-sm-6 col-md-offset-3">
                        <h1>What is FestiPals?</h1>
                        <p>FestiPals is a webapp for festival goers at Roskilde Festival who need to <strong>structure the concerts</strong> they want to see and <strong>organize their group of friends</strong> at the festival. <br />
                          Festipals offers an overview of your friends and the acts you and the others want to go see, both before, but also during the festival for you to achieve the best festival experience possible.</p>
                        <h3>Pals - What are they?</h3>
                        <p>Pals are the way we call your friends on FestiPals. You can connect to your friends via a Facebook integration. <br />
                        You will be able to see what acts your pals are planning to go to and can also <strong>invite pals</strong> to come see a concert with you.</p>
                      <h3>Your schedule - How does this work?</h3>
                        <p>Your schedule lets you save the acts you do not want to miss. It is <strong>structured by days</strong>, to help you keep an overview of every day at the festival.</p>
                        <p><strong>Click on any act</strong> to see more details about the artist, aswell as your pals who are attending it.</p>
                      </div>
                    </div>
            </div>
        </div>
    );
  }
}
