import React, { Component } from 'react';
import PageHeader from './PageHeader.js';
import Acts from './Acts.js';
import Pals from './Pals.js';
import '../css/ProfilePage.css';
//const currentUser = SampleData.user;
import axios from 'axios';

export default class RequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadProfileFromServer = this.loadProfileFromServer.bind(this);
  }
  loadProfileFromServer() {
    axios.get(this.props.route.url)
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  componentDidMount() {
    this.loadProfileFromServer();
  }

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
                                    "title": "Rammstein",
                                    "starts": {"d": "01-06-2017", "t": "13:45:00"},
                                    "ends": {"d": "01-06-2017", "t": "14:30:00"},
                                    "stage": 1,
                                    "description": "Very long description of the band",
                                    "country": "US",
                                    "img": "path/to/img.jpg"
                                  }];

    return (
      <div>
        <PageHeader icon="fa fa-bell-o" title="Your Requests" description="(See your pal requests and act invites here)"/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>Pending requests <span className="badge">{pendingPalRequests.length + pendingActInvites.length}</span></h2>
            </div>
            <div className="col-xs-12">
              <h3><i className="fa fa-users"></i> Pal requests</h3>
              {pendingPalRequests.length === 0
              ? <p>You have no pending pal requests.</p>
            : pendingPalRequests.map(function (pal) { return <div key={pal._id} className="inviteDiv col-xs-12 col-md-8"><h5><strong>Palname wants to connect:</strong></h5>
                                                                <Pals
                                                                  id={pal._id}
                                                                  firstName={pal.first_name}
                                                                  lastName={pal.last_name}
                                                                  email={pal.e_mail}
                                                                />
                                                                <div className="palInviteDivider"></div>
                                                                <div className="col-xs-12 col-md-8 inviteButtons">
                                                                  <div className="btn-group btn-group-justified" role="group">
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-danger btn-lg declineButton"><i className="fa fa-ban"></i> Decline</button>
                                                                    </div>
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-orange btn-lg acceptButton"><i className="fa fa-user-plus"></i> Add to my pals</button>
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
              : pendingActInvites.map(function (act, i) { return <div key={i} className="inviteDiv col-xs-12 col-md-8"><h5><strong>Palname invited you to see:</strong></h5>
                                                                  <Acts

                                                                    id={act._id}
                                                                    stage={act.stage}
                                                                    name={act.title}
                                                                    startTime={act.starts.t}
                                                                    endTime={act.ends.t}
                                                                    country={act.country}
                                                                    date={act.starts.d}
                                                                    description={act.description}
                                                                    actRequest={true}
                                                                    attendingPals={attendingPals}
                                                                  />
                                                                <div className="col-xs-12 col-md-8 inviteButtons">
                                                                  <div className="btn-group btn-group-justified" role="group">
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-danger btn-lg declineButton"><i className="fa fa-ban"></i> Decline</button>
                                                                    </div>
                                                                    <div className="btn-group" role="group">
                                                                      <button type="button" className="btn btn-orange btn-lg acceptButton"><i className="fa fa-plus"></i> Add to my acts</button>
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
      </div>
    );
  }
}
