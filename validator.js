const fs = require('fs');
const crypto = require("crypto");

var validators = {};

// Load up all the validators!
const validatorFiles = fs.readdirSync('./validators').filter(file => file.endsWith('.js'));
for (const file of validatorFiles) {
    const validator = require(`./validators/${file}`);
    validator.games.forEach(game => {
        if (validators[game]) {
            console.error(`Validator for game ${game} is defined a second time in /validators/${file}. Skipping second definition.`);
        } else {
            validators[game] = validator;
        }
        
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