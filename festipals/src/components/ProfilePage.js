import React, { Component } from 'react';
import PageHeader from './PageHeader.js';
import SampleData from './../sampleData.json';
import Acts from './Acts.js';
import Pals from './Pals.js';
import '../css/ProfilePage.css';
const currentUser = SampleData.user;

export default class ProfilePage extends Component {
  render() {
    var attendingPals = ['pal1', 'pal2']; // TO DO: add logic for attending pals here; look through the users pals and select the ones that have this acts {id} in their list of acts.
    const pendingPalRequests = [{ "_id": "def",
                                  "first_name": "Sansa",
                                  "last_name": "Stark",
                                  "e_mail": "test1@email.com",
                                  "pals": ["abc", "ghi"],
                                  "acts": ["ijklmnop", "asdf"]}];
    const pendingActInvites = [{ "_id": "abcdefgh",
                                  "title": "Slayer",
                                  "starts": {"d": "01-06-2017", "t": "13:45:00"},
                                  "ends": {"d": "01-06-2017", "t": "14:30:00"},
                                  "stage": 1,
                                  "description": "Very long description of the band",
                                  "country": "US",
                                  "img": "path/to/img.jpg"
                                }, {"_id": "abcdefgh",
                                    "title": "Slayer",
                                    "starts": {"d": "01-06-2017", "t": "13:45:00"},
                                    "ends": {"d": "01-06-2017", "t": "14:30:00"},
                                    "stage": 1,
                                    "description": "Very long description of the band",
                                    "country": "US",
                                    "img": "path/to/img.jpg"
                                  }];

    return (
      <div>
        <PageHeader icon="fa fa-user" title="Your Profile" description="(Edit imformation about yourself and see your pal requests and act invites here)"/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <h2>Account information:</h2>
              <p>First name: {currentUser.first_name}</p>
              <p>Last name: {currentUser.last_name}</p>
              <p>E-mail: {currentUser.e_mail}</p>
            </div>
            <div className="col-xs-12 col-sm-6 profileButtons">
              <button data-toggle="modal" data-target="#changeName" className="btn btn-primary btn-block btn-lg"><i className="fa fa-pencil"></i> Change Name</button>
            </div>
            <div className="col-xs-12 col-sm-6 profileButtons">
              <button data-toggle="modal" data-target="#changePassword" className="btn btn-primary btn-block btn-lg"><i className="fa fa-pencil"></i> Change Password</button>
            </div>
            <div className="col-xs-12 col-sm-6 profileButtons">
              <button data-toggle="modal" data-target="#deleteAccount" className="btn btn-danger btn-block btn-lg"><i className="fa fa-trash"></i> Delete account </button>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-xs-12">
              <h2>Pending requests <span className="badge">{pendingPalRequests.length + pendingActInvites.length}</span></h2>
            </div>
            <div className="col-xs-12">
              <h3><i className="fa fa-users"></i> Pal requests</h3>
              {pendingPalRequests.length === 0
              ? <p>You have no pending pal requests.</p>
            : pendingPalRequests.map(function (pal) { return <div className="inviteDiv col-xs-12 col-md-8"><h5><strong>Palname wants to connect:</strong></h5><Pals
                                                                  key={pal._id}
                                                                  id={pal._id}
                                                                  firstName={pal.first_name}
                                                                  lastName={pal.last_name}
                                                                  email={pal.e_mail}
                                                                />
                                                              <div className="col-xs-12 col-md-8 inviteButtons">
                                                                  <div className="btn-group btn-group-justified" role="group">
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-danger btn-lg declineButton"><i className="fa fa-ban"></i> Decline</button>
                                                                    </div>
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-success btn-lg acceptButton"><i className="fa fa-user-plus"></i> Add to my pals</button>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-xs-12 inviteDivider">
                                                                  <hr />
                                                                </div>
                                                              </div> })
              }
            </div>
            <div className="col-xs-12">
              <h3><i className="fa fa-music"></i> Act invitations</h3>
              {pendingActInvites.length === 0
                ? <p>You have no pending act invitations.</p>
              : pendingActInvites.map(function (act) { return <div className="inviteDiv col-xs-12 col-md-8"><h5><strong>Palname invited you to see:</strong></h5>
                                                                  <Acts
                                                                    key={act._id}
                                                                    id={act._id}
                                                                    stage={act.stage}
                                                                    name={act.title}
                                                                    startTime={act.starts.t}
                                                                    endTime={act.ends.t}
                                                                    country={act.country}
                                                                    date={act.starts.d}
                                                                    description={act.description}
                                                                    attendingPals={attendingPals}
                                                                  />
                                                                <div className="col-xs-12 col-md-8 inviteButtons">
                                                                  <div className="btn-group btn-group-justified" role="group">
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-danger btn-lg declineButton"><i className="fa fa-ban"></i> Decline</button>
                                                                    </div>
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-success btn-lg acceptButton"><i className="fa fa-plus"></i> Add to my acts</button>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-xs-12 inviteDivider">
                                                                  <hr />
                                                                </div>
                                                                </div> })
              }
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
                  <input type="text" className="form-control" id="firstName" defaultValue={currentUser.first_name}/>
                </div>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon3">Last Name</span>
                  <input type="text" className="form-control" id="lastName" defaultValue={currentUser.last_name}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success"><i className="fa fa-pencil"></i> Save changes</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
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
                <button type="button" className="btn btn-success"><i className="fa fa-pencil"></i> Save changes</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
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
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
