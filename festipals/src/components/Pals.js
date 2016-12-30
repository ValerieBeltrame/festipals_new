import React, { Component } from 'react';
import PalsActs from './PalsActs.js';
// const commonActs =  [
//                       {'_id':'asdfasdfsdf', 'name': 'Slayer', 'stage': 'Arena stage', 'starts': 'Monday 12. June'},
//                       {'_id':'asdfasdfasdfsdf', 'name': 'Rammstein', 'stage': 'Main stage', 'starts': 'Tuesday 13. June'}
//                     ]


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

  render() {

    const { firstName, lastName, email, id, acts, userActs } = this.props;
    var cActs = new Array();

    // check if id exists in userActs and if it exists
    // add it to a new array
    for(var i = 0; i < userActs.length; i++) {
      for(var j = 0; j < acts.length; j++) {
        // console.log(userActs[i]._id);
        // console.log(acts[j]);

        if(userActs[i]._id === acts[j]) {
          //console.log('MATCH!');
          var _id = userActs[i]._id;
          var title = userActs[i].title;
          var stage = userActs[i].stage;
          var date = userActs[i].starts.date;

          cActs.push({
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
      <div onClick=""> {/* Show the SchedulePage component but with this user instead of the logged in user */}
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="col-xs-3 col-sm-1 palIcon">
              <span className="fa fa-user fa-2x"></span>
            </div>
            <div className="col-xs-9 col-sm-11">
              <h4>{firstName} {lastName}</h4>
              <p>{email}</p>

              <a role="button" onClick={this.onCollapse.bind(this)} data-toggle="collapse" href={"#" + id} aria-expanded="false" aria-controls="collapseExample">
                <h5><i className={collapseArrow}></i>{cActs.length} common acts</h5>
              </a>
              <div className="collapse" id={id}>
                {cActs.map(function (commonAct) { return <PalsActs key={commonAct._id} title={commonAct.title} stage={commonAct.stage} date={commonAct.starts} /> })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
