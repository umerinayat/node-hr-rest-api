const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInputs(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  // eslint-disable-next-line camelcase
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
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
};
