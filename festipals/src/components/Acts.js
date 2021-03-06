import React, { Component } from 'react';
import '../css/Acts.css';
import Pals from './Pals.js';
import axios from 'axios';

export default class Acts extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedInId: '584552f3f36d282dbc878996'};
  }

  handleDeleteClick(event) {
    axios.put('http://localhost:3001/api/pals/' + this.state.loggedInId + '/acts/' + this.props.id + '/delete')
    .then(res => {
      this.props.handleReload();
    })
  }

  handleAddClick(event) {
    axios.put('http://localhost:3001/api/pals/' + this.state.loggedInId + '/acts/' + this.props.id + '/add')
    .then(res => {
      this.props.handleReload();
    })
  }

  render() {
    const { name, startTime, id, stage, date, endTime, country, description, userPals, userActs } = this.props;
    var addedActs = [];
    if(this.props.addedActs) {
      addedActs = this.props.addedActs;
    }
    var alreadyAdded = addedActs.indexOf(id) > -1;
    const attendingPals = [];
    if(userPals) {
      for(var i = 0; i < userPals.length; i++) {
        for(var j = 0; j < userPals[i].acts.length; j++) {
          if(userPals[i].acts[j] === id) {
            attendingPals.push({
              '_id': userPals[i]._id,
              'first_name': userPals[i].first_name,
              'last_name': userPals[i].last_name,
              'e_mail': userPals[i].e_mail,
              'userActs': userActs,
              'acts': userPals[i].acts
            });
          }
        }
      }
    }

    return (
      <div>
        <a data-toggle="modal" href={'#'+ id}>
          <div className="panel panel-default actPanel">
            <div className="panel-body">
              <div className="col-xs-3 startingTime">
                {date} <br /> <strong>{startTime}</strong>
              </div>
              <div className="col-xs-6">
                <h3>{name}</h3>
                <p>Stage {stage}</p>
              </div>
              <div className="col-xs-3 palIcon text-right">
                <p>{alreadyAdded
                    ? <i className="fa fa-check text-success"></i>
                    : null
                  }</p>
                <p><i className="fa fa-users"></i> {attendingPals.length}</p>
              </div>
            </div>
          </div>
        </a>
        <div className="addActBtn">
          {alreadyAdded
            ? null
            : (this.props.actRequest
              ? null
              : <a type="button" className="btn btn-orange btn-block btn-lg" onClick={this.handleAddClick.bind(this)}>
              <i className="fa fa-plus"></i> Add to my acts
            </a>)
          }
        </div>

        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">{name} <small>({country})</small></h4>
              </div>
              <div className="modal-body">
                <p>{date}</p>
                <p><strong>{startTime} - {endTime}</strong></p>
                <img className="img-responsive" alt="band-portrait" src="http://placehold.it/2000x500"/> {/* TO DO: insert img here */}
                <br />
                <p>{description}</p>
                {alreadyAdded
                  ? null
                  : <a type="button" className="btn btn-orange-light col-xs-12 alreadyAddedBtn" onClick={this.handleAddClick.bind(this)}>
                    <span className="glyphicon glyphicon-plus"></span> Add to my acts
                  </a>
                }
                <hr />
                <h3><i className="fa fa-users"></i> {attendingPals.length} Attending Pal(s)</h3>
                {attendingPals.map(function (pal, i) { return <Pals
                                                              key={i}
                                                              id={pal._id}
                                                              firstName={pal.first_name}
                                                              lastName={pal.last_name}
                                                              email={pal.e_mail}
                                                              userActs={pal.userActs}
                                                              acts={pal.acts}
                                                            /> })
                }
                <h4>Invite Pals</h4>
                <div className="input-group col-xs-12 col-sm-6">
                  <input type="text" className="form-control" placeholder="Search for a pal..." />
                  <span className="input-group-btn">
                    <button className="btn btn-orange-light" type="button">Search!</button>
                  </span>
                </div>

              </div>
              <div className="modal-footer">
                {alreadyAdded
                  ? <button type="button"  data-dismiss="modal" className="btn btn-danger pull-left btn-lg" onClick={this.handleDeleteClick.bind(this)}><i className="fa fa-trash"></i> Remove act</button>
                  : null
                }
                <button type="button" className="btn btn-orange-light btn-lg" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
