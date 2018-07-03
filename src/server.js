const express = require('express');
const pg = require('pg');
let app = express();
// outside of connect, create a function that takes in 2/3 parameters and references the connect. export that function and import it into any other files where you need to make a call/connect to the database.
let connectionString = 'postgres://yaxdnxaj:ce9p5dqRhdWCYi_JH-bBkdgciJwYPk8k@baasu.db.elephantsql.com:5432/yaxdnxaj'

const query = {
    text: 'INSERT INTO "user" (name, wins, losses, ships_sunk, accuracy) VALUES ($1, $2, $3, $4, $5)',
    values: ['test', 0, 3, 0, 0],
};

app.get('/', function(req, res, next) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(query, function(err, result) {
            done();
            if(err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200);
        });
        client.query('SELECT * FROM "user"', function(err, result) {
            done();
            if(err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    });
});

app.listen(5000, function() {
    console.log('Listening on port 5000!');
});