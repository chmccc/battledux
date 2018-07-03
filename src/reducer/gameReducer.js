import * as actionType from '../actions/actionTypes';
import createBoard from './randomBoard';
// import { Object } from 'core-js';

const playerBoard = createBoard();
const compBoard = createBoard();

// console.log('playerboard: ', playerBoard);

const initialState = {
  playerBoard,
  compBoard,
}

const gameReducer = (state = initialState, action) => {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      console.log('action.payload: ', action.payload);

      // check to see if we hit any of the opponent's ships

      
      return Object.assign({}, state);

      case actionType.COMP_FIRE:      
      console.log('action.payload: ', action.payload);
      return Object.assign({}, state);

    default:
      return state;
  }
}

// this will update the board
const checkHit = (col, row, board) => {
  
  return
}


export default gameReducer;