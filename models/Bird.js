const mongoose = require('mongoose');

const BirdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  date: Date,
  notes: String,
});

module.exports = mongoose.model('Bird', BirdSchema);
 
