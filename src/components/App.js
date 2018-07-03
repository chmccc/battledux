import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerFire } from '../actions/actions';
import Ducks from './Ducks';
import Grid from './Grid.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("check this === ", this.props);
    return (
      <div className="container">
        <div id="grids-container">
          <div id="player-grid"><Grid /></div>
          <div id="cpu-grid"><Grid /></div>
        </div>
        App Component<br />
        <table>
          <tr>
            <th>
              <button id="fire" onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(playerFire());
              }}>FIRE</button>
            </th>
            <th>
              <Ducks />
            </th>
          </tr>
        </table>
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