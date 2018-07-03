import * as actionType from '../actions/actionTypes';
import createBoard from './randomBoard';

const playerBoard = createBoard();
const compBoard = createBoard();

console.log('playerboard: ', playerBoard);

const initialState = {
  playerBoard,
  compBoard,
  playerStats: {
    shots: 0,
    hits: 0,
  },
  compAvailableShots: []
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      // do some stuff
      // this is also where we check for sunk ducks
      return state + action.payload;
    case actionType.COMP_FIRE:
      // randomly pick a place to fire
      // do some stuff
      // this is where we remove from available shots
    case actionType.END_GAME:
      // save, win, or lose, we gotta update the DB
    default:
      return state;
  }
}

export default gameReducer;