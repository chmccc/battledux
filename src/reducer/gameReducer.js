import * as actionType from '../actions/actionTypes';

import createBoard from './randomBoard';

const playerBoard = createBoard();
const compBoard = createBoard();


console.log('playerboard: ', playerBoard);

const initialState = {
  playerBoard,
  compBoard,
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      console.log('state: ', state);
      return state + action.payload;
    default:
      return state;
  }
}

export default gameReducer;