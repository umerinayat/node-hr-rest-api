const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeModel = new Schema({
  name: { type: String },
  branch: { type: String },
  department: { type: String },
  designation: { type: String },
});

module.exports = mongoose.model('Employee', employeeModel);
