const mongoose = require('mongoose');

const { Schema } = mongoose;

const Attachment = new Schema({
  file_name: { type: String },
  file_path: {type : String},
  file_url: {type : String},
});

module.exports = mongoose.model('Attachment', Attachment);
