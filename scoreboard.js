const { Score } = require('./collections/scores');
const { validateScore } = require('./validator');

async function getGameOptions() {
    let games = await Score.findGameOptions();
    return games;
}

async function insertNewScore(game, name, score, metaData, validation = "") {
    if (validateScore(game, name, score, metaData, validation)) {
        return await Score.create({
            game,
            name,
            score,
            metaData,
            date: Date.now()
        });
    } else {
        console.log(`Score submission for ${game} for name ${name} failed to validate and was rejected`);
    }
    return false;    
}

async function getGame(game, limit, ascending) {
    return await Score.findByGame(game, limit, ascending);
}

module.exports = {
    getGameOptions,
    insertNewScore,
    getGame
};