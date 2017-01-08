import React, { Component } from 'react';
import Acts from './Acts.js';
import ActsSorter from './ActsSorter';
import PageHeader from './PageHeader.js';
import axios from 'axios';

export default class ActsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loggedInId: '584552f3f36d282dbc878996', data2: [], data3: [] };
    this.loadActsFromServer = this.loadActsFromServer.bind(this);
    this.loadPalsActsFromServer = this.loadPalsActsFromServer.bind(this);
    this.loadPalsFromServer = this.loadPalsFromServer.bind(this);
  }
  loadActsFromServer() {
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

  render() {
    var self = this;
    const userPals = this.state.data3.pals;
    const alreadyAdded = this.state.data2.acts;
    const userActs = this.state.data3.acts;

    return (
      <div>
        <PageHeader icon="fa fa-music" title="Acts" description="(Click on an act to see more details)"/>
        <ActsSorter />
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
