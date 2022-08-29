const { countReset } = require("console");
const crypto = require("crypto");

var validators = {};

// Load up all the validators!
const validatorFiles = fs.readdirSync('./validators').filter(file => file.endsWith('.js'));
for (const file of validatorFiles) {
    const validator = require(`./validators/${file}`);
    validator.games.forEach(game => {
        validators[game] = validator.validateScore
    });
}

function validateScore(game, name, score, metaData = "", validation = "") {
    if (validators[game]) {
        return validators[game].validateScore(game, name, score, metaData, validation);
    }
    return true;
}

module.exports = {
    validateScore
}