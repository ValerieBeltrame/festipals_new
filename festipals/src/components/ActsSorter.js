import React, { Component } from 'react';

export default class ActsSorter extends Component {
  constructor() {
    super();
    this.state = {daysButtonsCollapsed: 'collapse', sortButtonsCollapsed: 'collapse'};
  }

  collapseDaysButtons(event) {
    if(this.state.daysButtonsCollapsed === "collapse") {
      this.setState({daysButtonsCollapsed: 'collapse in'});
    } else {
      this.setState({daysButtonsCollapsed: 'collapse'});
    }
  }

  collapseSortButtons(event) {
    if(this.state.sortButtonsCollapsed === "collapse") {
      this.setState({sortButtonsCollapsed: 'collapse in'});
    } else {
      this.setState({sortButtonsCollapsed: 'collapse'});
    }
  }

  collapseAll(event) {
    this.setState({daysButtonsCollapsed: 'collapse', sortButtonsCollapsed: 'collapse'});
  }

  render() {
    return (
      <div>
      <div className="container">
        <div className="btn-group input-group btn-group-justified col-xs-12">
          <div className="btn-group">
            <button type="button" className="btn btn-default" data-toggle="collapse"
              href="#actsDaysButtons" aria-expanded="false" aria-controls="actsDays" onClick={this.collapseDaysButtons.bind(this)}>
              <span className="fa fa-calendar-o fa-3x" aria-hidden="true"></span>
              <h3>Days</h3>
            </button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" data-toggle="collapse"
            href="#actsSorterButtons" aria-expanded="false" aria-controls="actsSorterButtons" onClick={this.collapseSortButtons.bind(this)}>
              <span className="fa fa-clone fa-rotate-270 fa-3x" aria-hidden="true"></span>
              <h3>Filtering</h3>
            </button>
          </div>
        </div>

        <div className={this.state.daysButtonsCollapsed} id="actsDaysButtons">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3>Select Days</h3>
              <select className="form-control">
                <option>All days</option>
                <option>Monday ##/## 2017</option>
                <option>Tuesday ##/## 2017</option>
                <option>Wednesday ##/## 2017</option>
                <option>Thursday ##/## 2017</option>
                <option>Friday ##/## 2017</option>
                <option>Saturday ##/## 2017</option>
                <option>Sunday ##/## 2017</option>
              </select>
            </div>
          </div>
        </div>

        <div className={this.state.sortButtonsCollapsed} id="actsSorterButtons">
          <div className="card card-block">
            <div className="btn-group input-group btn-group-justified col-xs-12">
              <div className="btn-group">
                <button type="button" className="btn btn-default">
                  <span className="fa fa-globe fa-3x" aria-hidden="true"></span>
                  <h3>Country</h3>
                </button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default">
                  <span className="fa fa-home fa-3x" aria-hidden="true"></span>
                  <h3>Stage</h3>
                </button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default">
                  <span className="fa fa-sort-alpha-asc  fa-3x" aria-hidden="true"></span>
                  <h3>Stage</h3>
                </button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default">
                  <span className="fa fa-sort-alpha-desc  fa-3x" aria-hidden="true"></span>
                  <h3>Stage</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
        <a type="button" href="#" className="btn btn-block btn-default"
        onClick={this.collapseAll.bind(this)}>
        <h4>Reset all filtering for acts</h4>
        </a>
      </div>
      </div>
    );
  }
}
