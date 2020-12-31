const mongoose = require('mongoose');

const { Schema } = mongoose;

const designationModel = new Schema({
  name: { type: String },
});

module.exports = mongoose.model('Designation', designationModel);
