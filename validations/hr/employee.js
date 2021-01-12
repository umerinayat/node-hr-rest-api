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
    errors.personal_info = 'Employee personal information is requried.';
  }

  
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Employee address information is required.';
  }

  if (Validator.isEmpty(data.company_detail)) {
    errors.company_detail = 'Company detail information is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateEmployeeInputs;
