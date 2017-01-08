import React, { Component } from 'react';
import '../css/ActsSorter.css';

export default class ActsSorter extends Component {
  constructor() {
    super();
    var defaultOrder = 'All';
    var defaultFilter ='All days';
    this.state = {daysButtonsCollapsed: 'collapse', sortButtonsCollapsed: 'collapse', selectedOrder: defaultOrder, selectedFilter: defaultFilter};
  }

  changeHandlerFilter(event) {
    var a = document.getElementById('orderSelect');
    var newSelectedFilter = a.options[a.selectedIndex].text;
    this.props.handleFilter(a.options[a.selectedIndex].value)
    this.setState({ selectedFilter: newSelectedFilter });
  }

  changeHandlerOrder(name) {
    this.props.handleSort(name);
    this.setState({selectedOrder: name});
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
    this.props.handleFilter('All');
    this.props.handleSort('DateUp');
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
              <p className="filterCurrentOption">{this.state.selectedFilter}</p>
            </button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default sorterButtons" data-toggle="collapse"
            href="#actsSorterButtons" aria-expanded="false" aria-controls="actsSorterButtons" onClick={this.collapseSortButtons.bind(this)}>
              <span className="fa fa-clone fa-rotate-270 fa-3x" aria-hidden="true"></span>
              <h3>Filter by</h3>
              <p className="filterCurrentOption">{this.state.selectedOrder}</p>
            </button>
          </div>
        </div>

        <div className={this.state.daysButtonsCollapsed} id="actsDaysButtons">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3>Select Days</h3>
              <select onChange={this.changeHandlerFilter.bind(this)} id="orderSelect" className="form-control">
                <option value="All">All days</option>
                <option value="Jun24">Saturday, 24/06/2017</option>
                <option value="Jun25">Sunday, 25/06/2017</option>
                <option value="Jun26">Monday 26/06/2017</option>
                <option value="Jun27">Tuesday 27/06/2017</option>
                <option value="Jun28">Wednesday 28/06/2017</option>
                <option value="Jun29">Thursday 29/06/2017</option>
                <option value="Jun30">Friday 30/06/2017</option>
              </select>
            </div>
          </div>
        </div>

        <div className={this.state.sortButtonsCollapsed} id="actsSorterButtons">
          <div className="btn-group btn-group-justified" role="group" aria-label="...">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default" onClick={this.changeHandlerOrder.bind(this, 'Country')}>
                <span className="fa fa-globe fa-3x" aria-hidden="true"></span>
                <h3 className="hidden-xs">Country</h3>
              </button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default" onClick={this.changeHandlerOrder.bind(this, 'Stage')}>
                <span className="fa fa-home fa-3x" aria-hidden="true"></span>
                <h3 className="hidden-xs">Stage</h3>
              </button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default" onClick={this.changeHandlerOrder.bind(this, 'Ascending')}>
                <span className="fa fa-sort-alpha-asc  fa-3x" aria-hidden="true"></span>
                <h3 className="hidden-xs">Ascending</h3>
              </button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default" onClick={this.changeHandlerOrder.bind(this, 'Descending')}>
                <span className="fa fa-sort-alpha-desc  fa-3x" aria-hidden="true"></span>
                <h3 className="hidden-xs">Descending</h3>
              </button>
            </div>
          </div>
        </div>

        {this.state.sortButtonsCollapsed === 'collapse in' || this.state.daysButtonsCollapsed === 'collapse in'
          ? <h4>
            <a type="button" href="#" className="btn btn-danger" onClick={this.collapseAll.bind(this)} id="filterSelect">
              Reset all filters
            </a>
          </h4>
          : null
        }

      </div>
      </div>
    );
  }
}
