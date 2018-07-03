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
  }


  handleCellClick(e) {
    console.log(e.target.id); // this is the coordinate col-row
    let coords = e.target.id.split('-')
    let col = coords[0];
    let row = coords[1];
    console.log(col, row);

    // now check to see if we hit the computer!
    this.props.playerFire({ col, row });

    console.log("handleCellClick!!!");
  }

  render() {
    console.log("check this === ", this.props);
    return (
      <div className="container">
        <div id="grids-container">
          <div id="player-grid"><Grid shipsArr={this.props.playerBoard.ducksBoard} hitMissArr={this.props.playerBoard.hitsAndMissesBoard} cpu={false} /></div>
          <div id="cpu-grid"><Grid handleCellClick={this.handleCellClick} shipsArr={this.props.compBoard.ducksBoard} hitMissArr={this.props.compBoard.hitsAndMissesBoard} cpu={true} /></div>
        </div>
        App Component<br/>
        <button id="fire" onClick={(e) => {
          e.preventDefault();
          // this.props.dispatch(playerFire());
          // this.props.playerFire("hello");
          // this.props.compFire("hello HAL");
        }}>FIRE</button>
      <Ducks />
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(playerFire, dispatch) }
// }

function mapDispatchToProps(dispatch) {
  return {
    playerFire: bindActionCreators(actionCreators.playerFire, dispatch),
    compFire: bindActionCreators(actionCreators.compFire, dispatch),
   }
}




function mapStateToProps(store) {
  return {
    playerBoard: store.gameReducer.playerBoard,
    compBoard: store.gameReducer.compBoard,
    userDuckHealth: store.gameReducer.userDuckHealth,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
