import React, { Component } from 'react';
import PalsActs from './PalsActs.js';

export default class Pals extends Component {
  constructor(props) {
    super();
    this.state = {collapsed: true}
  }

  onCollapse(event) {
    if(this.state.collapsed) {
      this.setState({collapsed: false})
    } else {
      this.setState({collapsed: true})
    }
  }

  static defaultProps = {
    userActs: [],
    acts: [],
  };

  render() {
    const { firstName, lastName, email, id, acts, userActs } = this.props;
    var commonActs = [];

    // check if id exists in userActs and if it exists add it to a new array
    for(var i = 0; i < userActs.length; i++) {
      for(var j = 0; j < acts.length; j++) {

        if(userActs[i]._id === acts[j]) {
          var _id = userActs[i]._id;
          var title = userActs[i].title;
          var stage = userActs[i].stage;
          var date = userActs[i].starts.date;

          commonActs.push({
            '_id': _id ,
            'title': title,
            'stage': stage,
            'starts': date
          });

        }
      }
    }

    var collapseArrow = "fa fa-chevron-right";
    if(this.state.collapsed) {
      collapseArrow = "fa fa-chevron-right";
    } else {
      collapseArrow = "fa fa-chevron-down";
    }
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="col-xs-3 col-sm-1 palIcon">
              <span className="fa fa-user fa-2x"></span>
            </div>
            <div className="col-xs-9 col-sm-11">
              <h4>{firstName} {lastName}</h4>
              <p>{email}</p>
              <a role="button" onClick={this.onCollapse.bind(this)} data-toggle="collapse" href={"#" + id} aria-expanded="false" aria-controls="collapseExample">
                <h5><i className={collapseArrow}></i>{commonActs.length} common act(s)</h5>
              </a>
              <div className="collapse" id={id}>
                {commonActs.map(function (commonAct) { return <PalsActs key={commonAct._id} title={commonAct.title} stage={commonAct.stage} date={commonAct.starts} /> })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
