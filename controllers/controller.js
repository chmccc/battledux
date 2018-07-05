const client = require('../model/pg');

const controller = {

  saveGame: (req, res, next) => {
    client.query(`SELECT * FROM "game"`, (err, result) => {
      if (err) return console.error(err.stack);
      console.log(result.rows);

    });
  },

  loadGame: (req, res, next) => {
    
  },

  login: (req, res, next) => {
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