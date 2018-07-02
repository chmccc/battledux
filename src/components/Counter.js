import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMPONENT FOR TESTING ONLY

class Counter extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="cotainer">
        <div className="notification">
          <h1>Counter</h1>
          <h2>{this.props.count}</h2>
        </div>
    </div>
    )
  }
}
function mapStateToProps(state){
  return {
    count: state.gameReducer,
  };
}
export default connect(mapStateToProps)(Counter);