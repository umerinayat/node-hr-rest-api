const Validator = require('validator');
const isEmpty = require('../is-empty');

function validateDeparmentInputs(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Department name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateDeparmentInputs;
