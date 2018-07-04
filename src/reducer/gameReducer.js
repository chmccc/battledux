import * as actionType from '../actions/actionTypes';
import { chooseFireLocation, takeShot } from './gameLogic';
import createBoard from './randomBoard';
// import { Object } from 'core-js';

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
};

const gameReducer = (state = initialState, action) => {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case actionType.PLAYER_FIRE:
      // Check to see if we hit any of the opponent's ships
      // It will also update the objects that we pass it!
      let ducksBoard = cloneBoard([...state.compBoard.ducksBoard]);
      let hitsAndMissesBoard = cloneBoard([...state.compBoard.hitsAndMissesBoard]);
      let compDuckHealth = {...state.compDuckHealth};
      let hit = checkHit(action.payload['col'], action.payload['row'], ducksBoard, hitsAndMissesBoard, compDuckHealth )
      

      console.log(`hit: ${hit}`);

      // TODO:: update the stats
      let playerStats = {...state.playerStats}
      if (hit) {
        playerStats.shots+=1;
        playerStats.hit+=1;
      }

      const newState = { compDuckHealth, compBoard:{ducksBoard, hitsAndMissesBoard}, playerStats };

      ducksBoard = cloneBoard([...state.playerBoard.ducksBoard]);
      hitsAndMissesBoard = cloneBoard([...state.playerBoard.hitsAndMissesBoard]);
      let compAvailableShots = cloneBoard([...state.compAvailableShots]);

      newState['playerBoard'] = {ducksBoard, hitsAndMissesBoard};
      newState['compAvailableShots'] = compAvailableShots
      newState['userDuckHealth'] = Object.assign({}, state.userDuckHealth);
      newState['userName'] = state.userName;
      newState['currentPlayer'] = state.currentPlayer;

      return newState;

    case actionType.COMP_FIRE:
      const shotIndex = chooseFireLocation(
        cloneBoard(state.compBoard.hitsAndMissesBoard),
        state.compAvailableShots,
        null, // TODO: add targeting logic
      );
      const [x, y] = state.compAvailableShots[shotIndex];
      const newCompAvailableShots = cloneAndSplice(state.compAvailableShots, shotIndex);
      let newHitsAndMissesBoard = cloneBoard(state.playerBoard.hitsAndMissesBoard);
      const result = takeShot(newHitsAndMissesBoard, state.playerBoard.ducksBoard, x, y);
      newHitsAndMissesBoard = result.hitsBoard;
      console.log(result);
      const newUserDuckHealth = { ...state.userDuckHealth };
      if (result.hit) newUserDuckHealth[result.target]--;      }
      const newPlayerBoard = { ...state.playerBoard, hitsAndMissesBoard: newHitsAndMissesBoard,  }
      return { ...state,
        playerBoard: newPlayerBoard,
        compAvailableShots: newCompAvailableShots,
        userDuckHealth: newUserDuckHealth,
      }
    case actionType.END_GAME:
      // save, win, or lose, we gotta update the DB
      return;
    default:
      return state;
  }
}

// this will update the board
/**
 * 
 * @param {string} col : '1' 
 * @param {string} row : '7'
 * @param {Array of Arrays} dBoard : value is string  
 * @param {Array of Arrays} hmBoard  : value is string
 * @param {Obj} health 
 * @param {Obj} stats 
 */
const checkHit = (col, row, dBoard, hmBoard, health) => {
  let hit;
  let boardVal = dBoard[row][col];
  if ( boardVal !== 'W' ) { //it's a HIT
    hit=true;
    hmBoard[row][col] = 'H';

    if( boardVal === 'G'){
      health.goose -= 1;
      if (health.goose < 0) health.goose = 0;
    } else if (boardVal==='D') {
      health.duck -= 1;
      if (health.duck < 0) health.duck = 0;
    } else if (boardVal==='B') {
      health.duckling -= 1;
      if (health.duckling < 0) health.duckling = 0;
    }

  } else {
    hit=false;
    hmBoard[row][col] = 'M';
  }

  return hit;
}

export default gameReducer;
