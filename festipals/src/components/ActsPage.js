import React, { Component } from 'react';
import Acts from './Acts.js';
import ActsSorter from './ActsSorter';
import PageHeader from './PageHeader.js';
import axios from 'axios';
import _ from 'lodash';

export default class ActsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loggedInId: '584552f3f36d282dbc878996', data2: [], data3: [], sorted: 'All', filtered: 'All' };
    this.loadActsFromServer = this.loadActsFromServer.bind(this);
    this.loadPalsActsFromServer = this.loadPalsActsFromServer.bind(this);
    this.loadPalsFromServer = this.loadPalsFromServer.bind(this);
  }

  sortByAZ(acts) {
    return _.sortBy(acts, ['title']);
  }

  sortByZA(acts) {
    return _.orderBy(acts, ['title']).reverse();
  }

  sortByCountry(acts) {
    return _.orderBy(acts, ['country']);
  }

  sortByStage(acts) {
    return _.orderBy(acts, ['stage']);
  }

  sortByDateUp(acts) {
    const filtered = _.sortBy(acts, [function(act){ return act.starts.date; }, function(act){ return act.starts.time; }]);
    return filtered;
  }

  loadActsFromServer() {
    axios.get(this.props.route.url)
    .then(res => {
      var allActs = res.data;

      if(this.state.filtered === 'Jun24') {
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('24-06-2017')>-1; });
      } else if(this.state.filtered === 'Jun25'){
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('25-06-2017')>-1; });
      } else if(this.state.filtered === 'Jun26'){
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('26-06-2017')>-1; });
      } else if(this.state.filtered === 'Jun27'){
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('27-06-2017')>-1; });
      } else if(this.state.filtered === 'Jun28'){
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('28-06-2017')>-1; });
      } else if(this.state.filtered === 'Jun29'){
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('29-06-2017')>-1; });
      } else if(this.state.filtered === 'Jun30'){
        allActs = _.filter(allActs, function(act){ return act.starts.date.indexOf('30-06-2017')>-1; });
      }

      if(this.state.sorted === 'All') {
        allActs = this.sortByDateUp(allActs);
      } else if(this.state.sorted === 'Ascending') {
        allActs = this.sortByAZ(allActs);
      } else if(this.state.sorted === 'Descending') {
        allActs = this.sortByZA(allActs);
      } else if(this.state.sorted === 'Country') {
        allActs = this.sortByCountry(allActs);
      } else if(this.state.sorted === 'Stage') {
        allActs = this.sortByStage(allActs);
      }

      this.setState({ data: allActs });
    })
  }
  loadPalsActsFromServer() {
    axios.get('http://localhost:3001/api/pals/' + this.state.loggedInId)
    .then(res => {
      this.setState({ data2: res.data });
    })
  }
  loadPalsFromServer() {
    axios.get('http://localhost:3001/api/pals/' + this.state.loggedInId + '/details')
    .then(res => {
      this.setState({ data3: res.data });
    })
  }


  componentDidMount() {
    this.loadActsFromServer();
    this.loadPalsActsFromServer();
    this.loadPalsFromServer();
  }

  handleReload() {
    this.loadActsFromServer();
    this.loadPalsActsFromServer();
    this.loadPalsFromServer();
  }

  handleFilter(date) {
    this.setState({ filtered: date });
    this.loadActsFromServer();
  }

  handleSort(sortBy) {
    this.setState({ sorted: sortBy });
    this.loadActsFromServer();
  }

  render() {
    var self = this;
    const userPals = this.state.data3.pals;
    const alreadyAdded = this.state.data2.acts;
    const userActs = this.state.data3.acts;

    return (
      <div>
        <PageHeader icon="fa fa-music" title="Acts" description="(Click on an act to see more details)"/>
        <ActsSorter handleFilter={this.handleFilter.bind(this)} handleSort={this.handleSort.bind(this)} />
        <div className="container">
        {/* looping through all the acts in the sample data file array to display the acts */}
        {this.state.data.map(function (act) { return <Acts
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
                                                      userPals={userPals}
                                                      handleReload={self.handleReload.bind(self)}
                                                      userActs={userActs}
                                                    /> }) }
        </div>
      </div>
    );
  }
}
