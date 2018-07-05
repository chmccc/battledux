const client = require('../model/pg');

const createHitMissBoard = (n = 8) => new Array(n).fill(new Array(n).fill('W'));

const drawFowl = (board, startX, startY, vertical, direction, size, symbol) => {
  let clonedBoard = board.reduce((acc, e) => {
    acc.push([...e]);
    return acc;
  }, []);
  for (let i = 0; Math.abs(i) < size; i += direction) {
    if (vertical) {
      if (clonedBoard[startX][startY + i] !== 'W') return null;
      clonedBoard[startX][startY + i] = symbol;
    }
    else {
      if (clonedBoard[startX + i][startY] !== 'W') return null;
      clonedBoard[startX + i][startY] = symbol;
    }
  }
  return clonedBoard;
};

const placeFowl = (board, size, symbol) => {
  let clonedBoard = board.reduce((acc, e) => {
    acc.push([...e]);
    return acc;
  }, []);
  const n = board.length;
  const startX = Math.floor(Math.random() * n);
  const startY = Math.floor(Math.random() * n);
  const vertical = Boolean(Math.round(Math.random()));
  console.log('vars: ', startX, startY, vertical);
  let newBoard = clonedBoard.reduce((acc, e) => {
    acc.push([...e]);
    return acc;
  }, []);
  if (vertical) {
    // check to make sure we don't build a duck over the edge
    if (startY - (size - 1) < 0) {
      // go south (++y)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, 1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else if (startY + (size - 1) >= n) {
      // go north (--y)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, -1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else {
      // random north or south
      const direction = Math.round(Math.random()) === 0 ? -1 : 1;
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, direction, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    }
  } else {
    if (startX - (size - 1) < 0) {
      // go east (++x)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, 1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else if (startX + (size - 1) >= n) {
      // go west (--x)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, -1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else {
      // random east or west
      const direction = Math.round(Math.random()) === 0 ? -1 : 1;
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, direction, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    }
  }
  return newBoard;
}

const createDucksBoard = (n = 8, numGeese = 1, numDucks = 1, numDucklings = 1) => {
  let board = new Array(n).fill(new Array(n).fill('W'));
  // place a goose
  board = placeFowl(board, 4, 'G');
  // place a duck
  board = placeFowl(board, 3, 'D');
  // place a duckling
  board = placeFowl(board, 2, 'B');
  return board;
};

const createBoard = () => {
  const ducksBoard = createDucksBoard();
  const hitsAndMissesBoard = createHitMissBoard();
  return { ducksBoard, hitsAndMissesBoard };
}

const controller = {

  showGames: (req, res) => {
    client.query(`SELECT * FROM "game" WHERE user_id='${req.params.id}'`, (err, result) => {
      if (err) return console.error(err.stack);
      console.log(result.rows);
      return res.json(result.rows);
    });
  },

  showUserss: (req, res) => {
    client.query(`SELECT * FROM "users" WHERE id='${req.params.id}'`, (err, result) => {
      if (err) return console.error(err.stack);
      console.log(result.rows);
      return res.json(result.rows);
    });
  },

  createGame: (req, res) => {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const { userID, status, playerBoard, compBoard, turns, hits, userSunk, compSunk } = req.body;
    const values = [
      userID, status, JSON.stringify(playerBoard), JSON.stringify(compBoard), turns, hits, userSunk, compSunk, date
    ]
    client.query({
      text: `INSERT INTO "game" (user_id, status, user_board_state, comp_board_state, num_turns, num_hits, num_ships_user_sunk, num_ships_comp_sunk, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      values
    }, (err, result) => {
      if (err) return console.error(err.stack);
      return res.json(result.rows);
    });
  },

  updateUserStats: (req, res, next) => {
    const { userID, status, turns, hits, userSunk, userAccuracy } = req.body;
    const winsUpdate = status === 'W' ? 'wins + 1' : 'wins';
    const lossesUpdate = status === 'L' ? 'losses + 1' : 'losses';
    const gameAccuracy = hits / turns;
    // const newUserAccuracy = ((userAccuracy / totalGames) + gameAccuracy) * (totalGames + 1); // HELP! MATH!
    client.query(`SELECT accuracy FROM "user" WHERE id = ${userID}`, (err, result) => {
      if (err) return console.error(err.stack);
      userAccuracy = result.rows[0]
    })
    client.query(`UPDATE "user" SET wins = ${winsUpdate}, losses = ${lossesUpdate}, ships_sunk = ships_sunk + ${userSunk}, accuracy = ${newUserAccuracy} WHERE id = ${userID}`, (err) => {
      if (err) return console.error(err.stack);
      next();
    })
  },

  updateGame: (req, res) => {
    const { gameID, status, turns, hits, userSunk, compSunk } = req.body;
    client.query(`UPDATE "game" SET status = '${status}', num_turns = ${turns}, num_hits = ${hits}, num_ships_user_sunk = ${userSunk}, num_ships_comp_sunk = ${compSunk} WHERE id = ${gameID}`, (err, result) => {
      if (err) return console.error(err.stack);
      return res.json(result.rows);
    });
  },

  loadGame: (req, res) => {
    client.query(`SELECT * FROM "game" WHERE user_id='${req.params.id}' AND status='A'`, (err, result) => {
      if (err) return console.error(err.stack);
      return res.json(result.rows);
    });
  },

  wipeAll: (req, res) => {
    client.query('DELETE FROM "game"', (err) => {
      if (err) return console.error(err.stack);
      client.query('DELETE FROM "user"', (err) => {
        if (err) return console.error(err.stack);
        return res.send(205); // "205 Reset Content"
      })
    })
  },

  login: (req, res) => {
    const query = {
      text: 'INSERT INTO "user" (name, wins, losses, ships_sunk, accuracy) VALUES ($1, $2, $3, $4, $5)',
      values: [`${req.body.username}`, 0, 0, 0, 0],
    };
    client.query(`SELECT * FROM "user" WHERE name='${req.body.username}'`, (err, result) => {
      // console.log('this is result...', result);
      // done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      if (result.rowCount === 0) {
        console.log('query', query);
        client.query(query, (err, result) => {
          // done();
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          console.log(result, "is rows...");
          res.status(200).send(result.rows);
        });
      } else {
        res.status(200).send(result.rows);
      }
    });
  }
}

module.exports = controller;