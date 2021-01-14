const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

// Sub Documents

const personalInfo = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String },
});

const address = new Schema({
  address: { type: String },
  city: { type: String },
  zip_code: { type: String },
  province: { type: String },
  country: { type: String },
});

const bankDetail = new Schema({
  bank_name: { type: String },
  acount_holder_name: { type: String },
  account_no: { type: String },
});

const assetsDetail = new Schema({
  title: { type: String },
  reason: { type: String },
  assign_date: { type: Date },
  to_date: { type: Date },
  asset: { type: Schema.Types.ObjectId, ref: 'Asset' },
});

const companyDetail = new Schema({
  employee_id: { type: String },
  date_of_joining: { type: Date },

  Branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  Department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  Designation: {
    type: Schema.Types.ObjectId,
    ref: 'Designation',
    required: true,
  },
});

// Parent Document
const employeeModel = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personal_info: personalInfo,
  address,
  bank_detail: bankDetail,
  company_detail: companyDetail,
  assets: [assetsDetail],
});

module.exports = mongoose.model('Employee', employeeModel);
