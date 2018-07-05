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

app.get('/save', controller.saveGame);

app.post('/login', controller.login);

app.post('/', function(req, res, next) {
    // pg.connect(connectionString, function(err, client, done) {
    //     if (err) {
    //         console.log("not able to get connection " + err);
    //         res.status(400).send(err);
    //     }
    //     client.query(query, function(err, result) {
    //         done();
    //         if(err) {
    //             console.log(err);
    //             res.status(400).send(err);
    //         }
    //         res.status(200);
    //     });
    //     client.query('SELECT * FROM "user"', function(err, result) {
    //         done();
    //         if(err) {
    //             console.log(err);
    //             res.status(400).send(err);
    //         }
    //         res.status(200).send(result.rows);
    //     });
    // });
});

app.listen(5000, () => console.log('Listening on port 5000!'));