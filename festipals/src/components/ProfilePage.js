import React, { Component } from 'react';
import PageHeader from './PageHeader.js';
import '../css/ProfilePage.css';
//const currentUser = SampleData.user;
import axios from 'axios';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadProfileFromServer = this.loadProfileFromServer.bind(this);
    // this.handleActSubmit = this.handleActSubmit.bind(this);
  }
  loadProfileFromServer() {
    axios.get(this.props.route.url)
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  componentDidMount() {
    this.loadProfileFromServer();
    setInterval(this.loadActsFromServer, this.props.route.pollInterval);
  }

  render() {
    return (
      <div>
        <PageHeader icon="fa fa-user" title="Your Profile" description="(Edit information about yourself here)"/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 accountInfo">
              <h2>Account information:</h2>
              <p>First name: {this.state.data.first_name}</p>
              <p>Last name: {this.state.data.last_name}</p>
              <p>E-mail: {this.state.data.e_mail}</p>
              <button className="btn btn-orange-light"><i className="fa fa-sign-out"></i>Log out</button>
            </div>
            <div className="col-xs-12 col-sm-6 profileButtons">
              <button data-toggle="modal" data-target="#changeName" className="btn btn-orange btn-block btn-lg"><i className="fa fa-pencil"></i> Change Name</button>
            </div>
            <div className="col-xs-12 col-sm-6 profileButtons">
              <button data-toggle="modal" data-target="#changePassword" className="btn btn-orange btn-block btn-lg"><i className="fa fa-pencil"></i> Change Password</button>
            </div>
            <div className="col-xs-12 col-sm-6 profileButtons">
              <button data-toggle="modal" data-target="#deleteAccount" className="btn btn-danger btn-block btn-lg"><i className="fa fa-trash"></i> Delete account </button>
            </div>
          </div>
        </div>

        <div className="modal fade" id="changeName" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Change your name</h4>
              </div>
              <div className="modal-body">
                <p>Make sure to choose your name so that your pals know who you are.</p>
                <div className="input-group nameInput">
                  <span className="input-group-addon" id="basic-addon3">First Name</span>
                  <input type="text" className="form-control" id="firstName" defaultValue={this.state.data.first_name}/>
                </div>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon3">Last Name</span>
                  <input type="text" className="form-control" id="lastName" defaultValue={this.state.data.last_name}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-orange"><i className="fa fa-pencil"></i> Save changes</button>
                <button type="button" className="btn btn-orange-light" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="changePassword" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Change your password</h4>
              </div>
              <div className="modal-body">
                <p>Please enter your old password, so we see that this is really you:</p>
                <input type="password" className="form-control nameInput" id="oldPassword"/>
                <p>Please enter your new password twice:</p>
                <input type="password" className="form-control nameInput" id="newPassword1"/>
                <input type="password" className="form-control" id="newPassword2"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-orange"><i className="fa fa-pencil"></i> Save changes</button>
                <button type="button" className="btn btn-orange-light" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="deleteAccount" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Delete your FestiPals account</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account?</p>
                <p>This action will delete all your saved content and can not be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i> Delete </button>
                <button type="button" className="btn btn-orange-light" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
