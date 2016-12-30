import React, { Component } from 'react';
import Acts from './Acts.js';
import '../css/scheduleHeader.css';
import { Link } from 'react-router';
import axios from 'axios';

export default class SchedulePage extends Component {
    constructor() {
        super();
        var defaultDay = 'Monday, 1 June 2017';
        this.state = {selectedDay: defaultDay, data: [], loggedInId: '584552f3f36d282dbc878996', data2: [] };
        this.loadProfileFromServer = this.loadProfileFromServer.bind(this);
        this.loadPalsActsFromServer = this.loadPalsActsFromServer.bind(this);
    }

    changeHandler(event) {
        var a = document.getElementById('daySelect');
        var newSelectedDay = a.options[a.selectedIndex].text;
        this.setState({selectedDay:newSelectedDay});
    }

    loadProfileFromServer() {
      axios.get(this.props.route.url)
      .then(res => {
        this.setState({ data: res.data });
      })
    }
    loadPalsActsFromServer() {
      axios.get('http://localhost:3001/api/pals/' + this.state.loggedInId)
      .then(res => {
        this.setState({ data2: res.data });
      })
    }

    componentDidMount() {
      this.loadProfileFromServer();
      setInterval(this.loadActsFromServer, this.props.route.pollInterval);
      this.loadPalsActsFromServer();
      setInterval(this.loadPalsActsFromServer, this.props.route.pollInterval);
    }

  render() {
    const userActs = this.state.data.acts;
    var attendingPals = ['pal1', 'pal2']; // TO DO: add logic for attending pals here; look through the users pals and select the ones that have this acts {id} in their list of acts.
    const alreadyAdded = this.state.data2.acts;
    return (
      <div>
        <div className="container scheduleHeader">
          <div className="row">
            <div className="col-xs-12">
              <h1><span className="glyphicon glyphicon-music" aria-hidden="true"></span> My schedule</h1>
              <p>(Click on the day to check your time schedule.)</p>
            </div>
            <div className="col-xs-12 col-sm-6">
              <p>
                <a  data-toggle="modal" className="linkColorRemoveAllActs" href="#removeAll">Remove all acts</a>
              </p>
              <select onChange={this.changeHandler.bind(this)} id="daySelect" className="form-control">
                  <optgroup className="optionsLayout">
                      <option>Monday, 1 June 2017</option>
                      <option>Tuesday, 2 June 2017</option>
                      <option>Wednesday, 3 June 2017</option>
                      <option>Thursday, 4 June 2017</option>
                      <option>Friday, 5 June 2017</option>
                  </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {/* looping through all the acts in the sample data file array to display the acts */}
              {userActs
                ? userActs.map(function (act) { return <Acts
                                                            key={act._id}
                                                            id={act._id}
                                                            stage={act.stage}
                                                            name={act.title}
                                                            country={act.country}
                                                            description={act.description}
                                                            startTime={act.starts.time}
                                                            endTime={act.ends.time}
                                                            date={act.starts.date}
                                                            addedActs={alreadyAdded}
                                                            attendingPals={attendingPals}
                                                          /> })
                : <p>You don&rsquo;t have any acts added to your schedule yet.</p>
              }

            <Link to="acts"><button type="button" className="btn btn-orange btn-lg btn-block buttonAdd"> + Add acts</button></Link>
          </div>
        </div>

            <div className="row">
                <div className="col-xs-12 col-sm-8">
                    <h2>Your pals see also:</h2>
                        <p>{this.state.selectedDay}</p>
                </div>
            </div>
        </div>

        <div className="modal fade" id="removeAll" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Remove  all your acts</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove all your acts from your schedule?</p>
                <p>This action will delete all your saved acts and can not be undone.</p>
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
