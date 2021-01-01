const mongoose = require('mongoose');

const { Schema } = mongoose;

const Asset = new Schema({
  type: { type: String },
});

module.exports = mongoose.model('Asset', Asset);
