
/**
 * @param {object} board A safe-to-modify copy of the computer's hitsAndMisses board from the store
 * @param {array} availableShots A READ-ONLY array of shots available to the computer
 * @param {object} targetingInfo An object of details on how to target the ship we're trying to sink
 * @returns {array} An index from the array of available shots
*/
function chooseFireLocation(board, availableShots, targetingInfo) {
  // just random for now, will expand to have logic for targeting a specific ship
  const index = Math.floor(Math.random() * availableShots.length);
  return index;
}

/**
 * @param {object} board A safe-to-modify copy of the computer's hitsAndMisses board from the store
 * @param {object} playerBoard A READ-ONLY reference to the player's ducksBoard
 * @param {number} x X-coordinate of shot
 * @param {number} y Y-coordinate of shot
 * @returns {object} A result object containing data to control the AI behavior
*/
function takeShot(hitsBoard, playerDucksBoard, x, y) {
  const resolver = { G: 'goose', D: 'duck', B: 'duckling' };
  const success = /[G|D|B]/;
  const data = { hitsBoard, hit: false, target: null };
  // check for hit
  if (success.test(playerDucksBoard[x][y])) {
    hitsBoard[x][y] = 'H';
    data.hit = true;
    data.target = resolver[playerDucksBoard[x][y]];
  }
  else hitsBoard[x][y] = 'M';
  return data;
}

/**
 * Updates the board
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

   // make sure that we didn't hit something that we already hit before
   if (hmBoard[row][col] === 'H'){
    hit=false;
   } else {    
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

  }

  } else {
    hit=false;
    hmBoard[row][col] = 'M';
  }

  return hit;
}

export { chooseFireLocation, takeShot, checkHit };