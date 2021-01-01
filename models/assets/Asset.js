const mongoose = require('mongoose');

const { Schema } = mongoose;

const Asset = new Schema({
  type: { type: String },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('Asset', Asset);
