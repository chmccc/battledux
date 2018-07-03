import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerFire } from '../actions/actions';
import Counter from './Counter';
import Grid from './Grid.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div id="grids-container">
          <div id="player-grid"><Grid /></div>
          <div id="cpu-grid"><Grid /></div>
        </div>
        App Component<br/>
        <button id="fire" onClick={(e) => {
          e.preventDefault();
          this.props.dispatch(playerFire());
        }}>FIRE</button>
        <Counter />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(playerFire, dispatch) }
}

export default connect(mapDispatchToProps)(App);