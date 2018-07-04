import * as actionType from '../actions/actionTypes';
import { chooseFireLocation } from './gameLogic';
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

/**
* Deep clones the availableShots array and splices out the item at the provided index
*/
const cloneAndSplice = (array, index) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i !== index) newArray.push([...array[i]]);
  }
  return newArray;
};

/** Takes a board-like object (array of arrays of 'W', 'H', 'M', etc) and returns a deep copy of it */
const cloneBoard = board => board.reduce((acc, e) => {
  acc.push([...e]);
  return acc;
}, []);

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
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      // do some stuff with PURE FUNCTIONS ONLY
      // this is also where we check for sunk ducks
      return;
    case actionType.COMP_FIRE:
      console.log('triggered COMP_FIRE')
      // how do we trigger this??
      // do some stuff with PURE FUNCTIONS ONLY
      // pick a (random) place to fire
      const shotIndex = chooseFireLocation();
      const [x, y] = state.compAvailableShots[shotIndex];
      // this is where we remove the last shot from available shots
      const newCompAvailableShots = cloneAndSplice(state.compAvailableShots, shotIndex);
      let newHitsAndMissesBoard = cloneBoard(state.playerBoard.hitsAndMissesBoard);
      const result = takeShot(newHitsAndMissesBoard, state.playerBoard.ducksBoard, x, y);
      newHitsAndMissesBoard = result.hitsBoard;
      const newUserDuckHealth = { ...state.userDuckHealth };
      if (result.hit) {
        // register a hit on the target
        newUserDuckHealth[result.target]--;
      }
      // return all modified state, including:
      // newHitsAndMissesBoard, newCompAvailableShots, newPlayerDucksBoard, newUserDuckHealth
      const newPlayerBoard = { ...state.playerBoard, hitsAndMissesBoard: newHitsAndMissesBoard,  }
      return { ...state,
        playerBoard: newPlayerBoard,
        compAvailableShots: newCompAvailableShots,
        userDuckHealth: newUserDuckHealth,
      }
    case actionType.END_GAME:
      // save, win, or lose, we gotta update the DB
    default:
      return state;
  }
}

export default gameReducer;