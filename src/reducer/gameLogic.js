
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

export { chooseFireLocation, takeShot };