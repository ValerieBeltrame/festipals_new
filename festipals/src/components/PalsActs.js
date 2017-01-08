import React, { Component } from 'react';

export default class PalsActs extends Component {
  render() {
    return (
      <div>
        <p><i className="fa fa-music fa-2x"></i><strong> {this.props.name}</strong></p>
        <p className="concertInfos">{this.props.date}, {this.props.stage}</p>
      </div>
    );
  }
}
