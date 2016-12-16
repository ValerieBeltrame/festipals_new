import React, { Component } from 'react';
import PalsActs from './PalsActs.js';
const commonActs =  [
                      {'_id':'asdfasdfsdf', 'name': 'Slayer', 'stage': 'Arena stage', 'starts': 'Monday 12. June'},
                      {'_id':'asdfasdfasdfsdf', 'name': 'Rammstein', 'stage': 'Main stage', 'starts': 'Tuesday 13. June'}
                    ]

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
    const { firstName, lastName, email, id} = this.props;
    
    console.log(this.state.collapsed);
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
                <h5><i className={collapseArrow}></i>{commonActs.length} common acts</h5>
              </a>
              <div className="collapse" id={id}>
                {commonActs.map(function (commonAct) { return <PalsActs key={commonAct._id} name={commonAct.name} stage={commonAct.stage} date={commonAct.starts} /> })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
