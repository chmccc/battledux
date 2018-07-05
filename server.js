const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/controller');

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log("REQUEST RECEIVED. BODY: \n", req.body);
  next();
});

// 

app.get('/users', controller.showUsers);

app.get('/games', controller.showGames);

app.post('/create', controller.createGame);

app.get('/load/:userid', controller.loadGame);

app.post('/update', controller.updateGame);

app.post('/login', controller.login, controller.loadGame);

app.listen(5000, () => console.log('Listening on port 5000!'));