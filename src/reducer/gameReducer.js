import * as actionType from '../actions/actionTypes';
import {} from './gameLogic';
import createBoard from './randomBoard';

const playerBoard = createBoard();
const compBoard = createBoard();
const compAvailableShots = ((n) => {
  const shotArray = [];
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      shotArray.push([x, y]);
    }
  }
  return shotArray;
})(8);

console.log('playerboard: ', playerBoard);

const initialState = {
  playerBoard,
  compBoard,
  playerStats: {
    shots: 0,
    hits: 0,
  },
  compAvailableShots,
  userDuckHealth: {
    goose: 4,
    duck: 3,
    duckling: 2,
  },
  compDuckHealth: {
    goose: 4,
    duck: 3,
    duckling: 2,
  },
  userName: 'Admiral',
  currentPlayer: 'player',
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      // do some stuff with PURE FUNCTIONS ONLY
        // this is also where we check for sunk ducks
      return state + action.payload;
    case actionType.COMP_FIRE:
      // how do we trigger this??
      // do some stuff with PURE FUNCTIONS ONLY
        // randomly pick a place to fire
        // this is where we remove the last shot from available shots
        // check for sunk ducks
    case actionType.END_GAME:
      // save, win, or lose, we gotta update the DB
    default:
      return state;
  }
}

export default gameReducer;
