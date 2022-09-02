const { Score } = require('./collections/scores');
const { validateScore } = require('./validator');

async function getGameOptions() {
    let games = await Score.findGameOptions();
    return games;
}

async function insertNewScore(game, name, score, metaData, validation = "") {
    return await new Promise((resolve, reject) => {
        if (validateScore(game, name, score, metaData, validation)) {
            let scoreObj = Score.create({
                game,
                name,
                score,
                metaData,
                date: Date.now()
            });
            let higherLower = getScoresHigherAndLowerThan(game, score);
            Promise.all([scoreObj, higherLower]).then((results) => {
                return resolve({
                    score: results[0],
                    ...results[1]
                });
            });
        } else {
            console.log(`Score submission for ${game} for name ${name} failed to validate and was rejected`);
            return resolve(false); 
        }        
    });
}

async function getGame(game, limit, ascending, page) {
    return await Score.findByGame(game, limit, ascending, page);
}

async function getScoresHigherAndLowerThan(game, score){
    let scoresGreater = await Score.find({game, score: {"$gt": score}}).countDocuments();
    let scoresLesser = await Score.find({game, score: {"$lt": score}}).countDocuments();
    return {
        scoresGreater,
        scoresLesser
    };
}

module.exports = {
    getGameOptions,
    insertNewScore,
    getGame
};