const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentModel = new Schema({
  name: { type: String },
});

module.exports = mongoose.model('Department', departmentModel);
