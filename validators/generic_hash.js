const crypto = require("crypto");

module.exports = {
    games: [],
    validateScore(game, name, score, metaData, validation){
      var validateObj = {
          game,
          metaData,
          name,
          score
      };

      var hash = crypto.createHash("sha256")
          .update(JSON.stringify(validateObj))
          .digest("hex");

      return hash == validation;
    },
  };


