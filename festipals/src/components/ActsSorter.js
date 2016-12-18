import React, { Component } from 'react';
import '../css/ActsSorter.css';

export default class ActsSorter extends Component {
  constructor() {
    super();
    var defaultOrder = 'All days';
    var defaultFilter ='All';
    this.state = {daysButtonsCollapsed: 'collapse', sortButtonsCollapsed: 'collapse', selectedOrder: defaultOrder, selectedFilter: defaultFilter};
  }

  changeHandlerOrder(event) {
    var a = document.getElementById('orderSelect');
    var newSelectedOrder = a.options[a.selectedIndex].text;
    this.setState({selectedOrder:newSelectedOrder});
  }

  changeHandlerFilter(event) {
      var newSelectedFilter = event.target.getElementsByTagName('h3')[0].innerHTML;
      this.setState({selectedFilter:newSelectedFilter});
  }

  collapseDaysButtons(event) {
    if(this.state.daysButtonsCollapsed === "collapse") {
      this.setState({daysButtonsCollapsed: 'collapse in'});
      this.setState({ sortButtonsCollapsed: 'collapse' });
    } else {
      this.setState({daysButtonsCollapsed: 'collapse'});
    }
  }

  collapseSortButtons(event) {
    if(this.state.sortButtonsCollapsed === "collapse") {
      this.setState({sortButtonsCollapsed: 'collapse in'});
      this.setState({ daysButtonsCollapsed: 'collapse' });
    } else {
      this.setState({sortButtonsCollapsed: 'collapse'});
    }
  }

  collapseAll(event) {
    this.setState({daysButtonsCollapsed: 'collapse', sortButtonsCollapsed: 'collapse', selectedOrder: 'All days', selectedFilter: 'All'});
  }

  render() {
    return (
      <div>
      <div className="container sorterContainer">
        <div className="btn-group input-group btn-group-justified col-xs-12">
          <div className="btn-group">
            <button type="button" className="btn btn-default sorterButtons" data-toggle="collapse"
              href="#actsDaysButtons" aria-expanded="false" aria-controls="actsDays" onClick={this.collapseDaysButtons.bind(this)}>
              <span className="fa fa-calendar-o fa-3x" aria-hidden="true"></span>
              <h3>Days</h3>
              <p className="filterCurrentOption">{this.state.selectedOrder}</p>
            </button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" data-toggle="collapse"
            href="#actsSorterButtons" aria-expanded="false" aria-controls="actsSorterButtons" onClick={this.collapseSortButtons.bind(this)}>
              <span className="fa fa-clone fa-rotate-270 fa-3x" aria-hidden="true"></span>
              <h3>Filter by</h3>
              <p className="filterCurrentOption">{this.state.selectedFilter}</p>
            </button>
          </div>
        </div>

        <div className={this.state.daysButtonsCollapsed} id="actsDaysButtons">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3>Select Days</h3>
              <select onChange={this.changeHandlerOrder.bind(this)} id="orderSelect" className="form-control">
                <option>All days</option>
                    <option>Monday, 01/02/2017</option>
                    <option>Tuesday 02/02/2017</option>
                    <option>Wednesday 03/02/2017</option>
                    <option>Thursday 04/02/2017</option>
                    <option>Friday 05/02/2017</option>
                    <option>Saturday 06/02/2017</option>
                    <option>Sunday 07/02/2017</option>
              </select>
              <h4>
              <a type="button" href="#" className="btn btn-warning" onClick={this.collapseAll.bind(this)} id="filterSelect">
                  <h4>Reset all filters</h4>
              </a></h4>
            </div>
          </div>
        </div>

        <div className={this.state.sortButtonsCollapsed} id="actsSorterButtons">
          <div className="card card-block">
            <div className="btn-group input-group btn-group-justified col-xs-12">
              <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.changeHandlerFilter.bind(this)} id="filterSelect">
                  <span className="fa fa-globe fa-3x" aria-hidden="true"></span>
                  <h3 className="hidden-xs">Country</h3>
                </button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.changeHandlerFilter.bind(this)} id="filterSelect">
                  <span className="fa fa-home fa-3x" aria-hidden="true"></span>
                  <h3 className="hidden-xs">Stage</h3>
                </button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.changeHandlerFilter.bind(this)} id="filterSelect">
                  <span className="fa fa-sort-alpha-asc  fa-3x" aria-hidden="true"></span>
                  <h3 className="hidden-xs">Ascending</h3>
                </button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.changeHandlerFilter.bind(this)} id="filterSelect">
                  <span className="fa fa-sort-alpha-desc  fa-3x" aria-hidden="true"></span>
                  <h3 className="hidden-xs">Descending</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
