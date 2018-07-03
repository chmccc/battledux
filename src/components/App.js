import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerFire } from '../actions/actions';
import Counter from './Counter';
import Ducks from './Ducks';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        App Component<br/>
        <button id="fire" onClick={(e) => {
          e.preventDefault();
          this.props.dispatch(playerFire());
        }}>FIRE</button>
        <Counter />
        <Ducks />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(playerFire, dispatch) }
}

export default connect(mapDispatchToProps)(App);