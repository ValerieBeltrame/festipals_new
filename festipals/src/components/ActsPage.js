import React, { Component } from 'react';
import Acts from './Acts.js';
import ActsSorter from './ActsSorter';
import PageHeader from './PageHeader.js';
// import SampleDataActs from './../sampleData.json';
import axios from 'axios';

export default class ActsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadActsFromServer = this.loadActsFromServer.bind(this);
    // this.handleActSubmit = this.handleActSubmit.bind(this);
  }
  loadActsFromServer() {
    axios.get(this.props.route.url)
    .then(res => {
      this.setState({ data: res.data });
    })
  }
  // handleActsSubmit(act) {
  //   //add POST request
  // }
  componentDidMount() {
    this.loadActsFromServer();
    setInterval(this.loadActsFromServer, this.props.route.pollInterval);
  }
  render() {
    var attendingPals = ['pal1', 'pal2']; // TO DO: add logic for attending pals here; look through the users pals and select the ones that have this acts {id} in their list of acts.
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
                                                        attendingPals={attendingPals}
                                                      /> }) }
        </div>
      </div>
    );
  }
}
