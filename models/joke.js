var mongoose = require('mongoose');

var jokeSchema = new mongoose.Schema({
  jokeId: { type: String, unique: true, index: true },
  name: String,
  text: String,
  reports: { type: Number, default: 0 }
});

module.exports = mongoose.model('Joke', jokeSchema);
