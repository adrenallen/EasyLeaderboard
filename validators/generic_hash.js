module.exports = {
    games: ["easy-leaderboard-example"],
    validateScore(game, name, score, metaData, validation){
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
    },
  };