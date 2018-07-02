import * as actionType from '../actions/actionTypes';
import randomizedBoard from './randomBoard';

const initialState = randomizedBoard;

const gameReducer = (state = 0, action) => {
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      console.log('state: ', state);
      return state + action.payload;
    default:
      return state;
  }
}

export default gameReducer;