const Validator = require('validator');
const isEmpty = require('../is-empty');

function validateDesignationInputs(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Designation name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateDesignationInputs;
