import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerFire } from '../actions/actions';
import Grid from './Grid.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div id="grids-container">
          <div id="player-grid"><Grid shipsArr={this.props.playerBoard.ducksBoard} hitMissArr={this.props.playerBoard.hitsAndMissesBoard} cpu={false}/></div>
          <div id="cpu-grid"><Grid shipsArr={this.props.compBoard.ducksBoard} hitMissArr={this.props.compBoard.hitsAndMissesBoard} cpu={true}/></div>
        </div>
        App Component<br/>
        <button id="fire" onClick={(e) => {
          e.preventDefault();
          this.props.dispatch(playerFire());
        }}>FIRE</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(playerFire, dispatch) }
}

function mapStateToProps(store) {
  return {
    playerBoard: store.gameReducer.playerBoard,
    compBoard: store.gameReducer.compBoard,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);