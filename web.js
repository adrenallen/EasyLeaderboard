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
    var limit = req.query.pagesize || req.query.limit || 10;
    limit = Math.min(100, limit); //only allow a max of 100 at a time
    var page = req.query.page || 1;
    res.send(await getGame(game, limit, asc == "true", page));
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
    console.log(`Easy Leaderboard is running on port ${port}`);
  });

  return app;
}




module.exports = {
  startWebServer
}