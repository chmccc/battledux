import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ducks from './Ducks';
// import { playerFire } from '../actions/actions';
import * as actionCreators from '../actions/actions';
import Grid from './Grid.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    // console.log("hello");
    // console.log("hello ", document.getElementById('username').value);
    // this.props.login(document.getElementById('username').value);
  }


  handleCellClick(e) {
    // console.log(e.target.id); // this is the coordinate col-row
    let coords = e.target.id.split('-')
    let col = coords[0];
    let row = coords[1];
    // console.log(col, row);

    // now check to see if we hit the computer!
    this.props.playerFire({ col, row });
  }

  render() {
    // console.log("check this === ", this.props);
    return (
      <div className="container">
        <div id="grids-container">
          <div id="login-area">
            <input id="username" type="text" placeholder="name please"></input>
            <button onClick={this.handleLogin}>Start Game</button>
          </div>
          <div id="player-duck-counter"><Ducks duckHealth={this.props.userDuckHealth} /></div>
          <div id="comp-duck-counter"><Ducks duckHealth={this.props.compDuckHealth} /></div>
          <div id="player-grid"><Grid shipsArr={this.props.playerBoard.ducksBoard} hitMissArr={this.props.playerBoard.hitsAndMissesBoard} cpu={false} /></div>
          <div id="cpu-grid"><Grid handleCellClick={this.handleCellClick} shipsArr={this.props.compBoard.ducksBoard} hitMissArr={this.props.compBoard.hitsAndMissesBoard} cpu={true} /></div>
        </div>
        <button onClick={this.props.compFire}>COMP FIRE</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playerFire: bindActionCreators(actionCreators.playerFire, dispatch),
    compFire: bindActionCreators(actionCreators.compFire, dispatch),
    // login: bindActionCreators(actionCreators.login, dispatch),
  }
}

function mapStateToProps(store) {
  return {
    playerBoard: store.gameReducer.playerBoard,
    compBoard: store.gameReducer.compBoard,
    userDuckHealth: store.gameReducer.userDuckHealth,
    compDuckHealth: store.gameReducer.compDuckHealth,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
