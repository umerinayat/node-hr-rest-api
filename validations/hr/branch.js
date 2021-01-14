const Validator = require('validator');
const isEmpty = require('../is-empty');

function validateBranchInputs(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Branch name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateBranchInputs;
