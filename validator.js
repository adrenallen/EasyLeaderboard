const fs = require('fs');
const crypto = require("crypto");

var validators = {};

// Load up all the validators!
const validatorFiles = fs.readdirSync('./validators').filter(file => file.endsWith('.js'));
for (const file of validatorFiles) {
    const validator = require(`./validators/${file}`);
    validator.games.forEach(game => {
        if (validators[game]) {
            console.error(`Validator for game ${game} is defined again in /validators/${file}. Aggregating validation checks.`);
            validators[game].push(validator);
        } else {
            validators[game] = [validator];
        }
        
    });
}

function validateScore(game, name, score, metaData = "", validation = "") {
    if (validators[game]) {
        for (let i = 0; i < validators[game].length; i++) {
            if (!validators[game][i].validateScore(game, name, score, metaData, validation)) {
                return false;   // if any validators fail, return false
            }
        }
    }
    return true;
}

module.exports = {
    validateScore
}