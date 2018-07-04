import * as actionType from '../actions/actionTypes';
// import {} from './gameLogic';
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


// console.log('playerboard: ', playerBoard);


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
      console.log('action.payload: ', action.payload);

      // Check to see if we hit any of the opponent's ships
      // It will also update the objects that we pass it!
      let ducksBoard = cloneBoard([...state.playerBoard.ducksBoard]);
      let hitsAndMissesBoard = cloneBoard([...state.playerBoard.hitsAndMissesBoard]);
      let compDuckHealth = {...state.compDuckHealth};
      let hit = checkHit(action.payload['col'], action.payload['row'], ducksBoard, hitsAndMissesBoard, compDuckHealth )
      
      console.log('comparing clones');
      console.log(ducksBoard === state.playerBoard.ducksBoard)

      console.log(`hit: ${hit}`);

      // TODO:: update the stats
      let playerStats = {...state.playerStats}
      if (hit) {
        pStats.shots+=1;
        pStats.hit+=1;
      }

      return { compDuckHealth, playerBoard:{ducksBoard, hitsAndMissesBoard}, playerStats };

    case actionType.COMP_FIRE:      
      
      console.log('action.payload: ', action.payload);
      return Object.assign({}, state);

      // do some stuff with PURE FUNCTIONS ONLY
        // this is also where we check for sunk ducks
      // return state + action.payload;

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

/**
* Takes a board-like object (array of arrays of 'W', 'H', 'M', etc) and returns a deep copy of it
*/
const cloneBoard = board => board.reduce((acc, e) => {
  acc.push([...e]);
  return acc;
}, []);


export default gameReducer;
