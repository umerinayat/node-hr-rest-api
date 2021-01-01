const mongoose = require('mongoose');

const { Schema } = mongoose;

const Branch = new Schema({
  name: { type: String },
});

module.exports = mongoose.model('Branch', Branch);
