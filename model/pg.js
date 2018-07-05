// init DB

const pg = require('pg');

// outside of connect, create a function that takes in 2/3 parameters and references the connect. export that function and import it into any other files where you need to make a call/connect to the database.
// let connectionString = 'postgres://yaxdnxaj:ce9p5dqRhdWCYi_JH-bBkdgciJwYPk8k@baasu.db.elephantsql.com:5432/yaxdnxaj'

const client = new pg.Client({
  host: 'baasu.db.elephantsql.com',
  port: 5432,
  user: 'yaxdnxaj',
  password: 'ce9p5dqRhdWCYi_JH-bBkdgciJwYPk8k',
  database: 'yaxdnxaj'
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to DB');
  }
});

module.exports = client;