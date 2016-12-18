import React, { Component } from 'react';
import SampleData from './../sampleData.json';
import '../css/Acts.css';
import Pals from './Pals.js';

export default class Acts extends Component {

  render() {
    const addedActs = SampleData.user.acts;
    const { name, startTime, id, stage, date, endTime, country, description, attendingPals } = this.props;
    var alreadyAdded = addedActs.indexOf(id) > -1;

    return (
      <div>
        <a data-toggle="modal" href={'#'+ id}>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-xs-3 startingTime">
                {date} <br /> <strong>{startTime}</strong>
              </div>
              <div className="col-xs-6">
                <h3>{name}</h3>
                <p>Stage {stage}</p>
              </div>
              <div className="col-xs-3 palIcon">
                <div className="pull-right">
                  <i className="fa fa-users"></i> {attendingPals.length}
                </div>
              </div>
              {alreadyAdded
                ? <a type="button" className="btn btn-default col-xs-12">
                  <i className="fa fa-plus"></i> Add to my acts
                </a>
                : null
              }
            </div>
          </div>
        </a>
        <div className="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                  ? <a type="button" className="btn btn-default col-xs-12 alreadyAddedBtn">
                    <span className="glyphicon glyphicon-plus"></span> Add to my acts
                  </a>
                  : null
                }
                <hr />
                <h3><i className="fa fa-users"></i> {attendingPals.length} Attending Pal(s)</h3>
                {attendingPals.map(function (pal) { return <Pals
                                                              key={pal._id}
                                                              id={pal._id}
                                                              firstName={pal.first_name}
                                                              lastName={pal.last_name}
                                                              email={pal.e_mail}
                                                            /> })
                }
                <h4>Invite Pals</h4>
                <div className="input-group col-xs-12 col-sm-6">
                  <input type="text" className="form-control" placeholder="Search for a pal..." />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Search!</button>
                  </span>
                </div>

              </div>
              <div className="modal-footer">
                {alreadyAdded
                  ? null
                  : <button type="button" className="btn btn-danger pull-left btn-lg"><i className="fa fa-trash"></i> Remove act</button>
                }
                <button type="button" className="btn btn-default btn-lg" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
