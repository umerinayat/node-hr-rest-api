const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateEmployeeInputs(data) {
  const errors = {};

  data.personal_info = !isEmpty(data.personal_info) ? data.personal_info : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  
  // eslint-disable-next-line camelcase
  data.company_detail = !isEmpty(data.company_detail)
    ? data.company_detail
    : '';

  
  if (Validator.isEmpty(data.personal_info)) {
    errors.personal_info = 'Employee personal information is requried';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 50 })) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = 'Passwords must match';
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'Confirm password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateEmployeeInputs;
