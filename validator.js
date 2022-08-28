const crypto = require("crypto");

function validateScore(game, name, score, metaData, validation = "") {
    switch(game) {
        case 'example-game':
            return genericHashCheck(game, name, score, metaData, validation);
    }
    return true;
}

function genericHashCheck(game, name, score, metaData, validation) {
    var validateObj = {
        name,
        score,
        game,
        metaData
    };

    var hash = crypto.createHash("sha256")
        .update(JSON.stringify(validateObj))
        .digest("hex");

    return hash == validation;
}

module.exports = {
    validateScore
}