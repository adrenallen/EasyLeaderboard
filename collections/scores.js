const { mongoose } = require('../mongoose_factory');
const { Schema } = mongoose;



const scoreSchema = new Schema({
  game: String,
  name: String,
  score: Number,
  metaData: String,
  date: Date
});

scoreSchema.statics.findByGame = function(game, limit = 10, ascending = true, page = 1) {
  let order = "desc";
  if (ascending) {
    order = "asc";
  }
  
  return this.find({game})
    .sort({score: order})
    .skip((page-1)*limit)
    .limit(limit)
    .exec();
}


scoreSchema.statics.findGameOptions = function(){
  return this.find().distinct('game');
}

const Score = mongoose.model(
  'Score', 
  scoreSchema,
  'scores'
);

module.exports = {
  Score
};