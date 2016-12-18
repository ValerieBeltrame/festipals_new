import React, { Component } from 'react';
import '../css/PalsPage.css';
import Pals from './Pals.js';
import PageHeader from './PageHeader.js';
import SamplePals from './../samplePals.json';
import axios from 'axios';

export default class PalsPage extends Component {
  render() {

    return (
      <div>
        <PageHeader icon="fa fa-users" title="Pals" description="(More information about your pals)"/>
        <div className="container">
          <div className="row">
            <div data-toggle="modal" data-target="#addPals"  className="col-xs-12 col-sm-4 col-sm-offset-4 addPalsButton">
              <button className="btn btn-primary btn-lg btn-block"><i className="fa fa-user-plus"></i> Add more Pals</button>
            </div>
            <div className="col-xs-12">
              {/*} looping through all the pals in the sample data file array to display the pals */}

                                                              key={pal._id}
                                                              id={pal._id}
                                                              firstName={pal.first_name}
                                                              lastName={pal.last_name}
                                                              email={pal.e_mail}
                                                            /> }) }
            </div>
          </div>
        </div>

        <div className="modal fade" id="addPals" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Add more pals</h4>
              </div>
              <div className="modal-body">
                <label htmlFor="palEmail">Enter the e-mail address of the pal you want to add to your list:</label>
                <input type="text" className="form-control" id="palEmail"/>
                <button id="addPalButton" type="submit" className="btn btn-primary" disabled="disabled"><i className="fa fa-user-plus"></i> Add pal</button>
                <p className="text-success">A pal request has been sent. He/She will added to your pal list after they accept the request.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
