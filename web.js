const express = require('express');

const app = express();
const cors = require('cors');
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())


const { getGameOptions, insertNewScore, getGame } = require('./scoreboard');

function registerScoreEndpoints() {
  app.get('/games', (req, res) => {
    
    getGameOptions().then(games => {
      res.send(games);
    });
  });

  app.get('/games/:game', async (req, res) => {
    var game = req.params.game;
    var asc = req.query.asc || "false";
    var limit = req.query.limit || -1;
    res.send(await getGame(game, limit, asc == "true"));
  })

  app.post('/games/submit', (req, res) => {
    if (req.body.name.length > 100) {
      req.body.name = req.body.name.substr(0, 100);
    }
    res.send(insertNewScore(req.body.game, req.body.name, req.body.score, req.body.metaData, req.body.validation));
  });
}

function startWebServer() {

  registerScoreEndpoints();

  app.listen(port, () => {
    console.log("Web server running... Port: " + port);
  });

  return app;
}




module.exports = {
  startWebServer
}