const Validator = require('validator');
const isEmpty = require('../is-empty');

function validateEmployeeInputs(data) {
  const errors = {};

  data.personal_info = !isEmpty(data.personal_info) ? data.personal_info : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.bank_detail = !isEmpty(data.bank_detail) ? data.bank_detail : '';
  data.company_detail = !isEmpty(data.company_detail) ? data.company_detail : '';

  // Employe personal information
  if ( data.personal_info === '' ) {
    errors.personal_info = 'Employee personal information is requried.';
  } else {

    errors.personal_info = {};

    data.personal_info.first_name = !isEmpty(data.personal_info.first_name) ? data.personal_info.first_name : '';
    data.personal_info.last_name = !isEmpty(data.personal_info.last_name) ? data.personal_info.last_name : '';
    data.personal_info.email = !isEmpty(data.personal_info.email) ? data.personal_info.email : '';
    data.personal_info.date_of_birth = !isEmpty(data.personal_info.date_of_birth) ? data.personal_info.date_of_birth : '';
    data.personal_info.gender = !isEmpty(data.personal_info.gender) ? data.personal_info.gender : '';

    if (Validator.isEmpty(data.personal_info.first_name)) {
      errors.personal_info.first_name = 'Employee first name is required.';
    }

    if (Validator.isEmpty(data.personal_info.last_name)) {
      errors.personal_info.last_name = 'Employee last name is required.';
    }

    if (!Validator.isEmail(data.personal_info.email)) {
      errors.personal_info.email = 'Employee email is invalid.';
    }
    
    if (Validator.isEmpty(data.personal_info.email)) {
      errors.personal_info.email = 'Employee email is required.';
    }

    if(!Validator.isDate(data.personal_info.date_of_birth)) {
      errors.personal_info.date_of_birth = 'Employee date of birth is invalid';
    }

    if (Validator.isEmpty(data.personal_info.date_of_birth)) {
      errors.personal_info.date_of_birth = 'Employee date of birth is required.';
    }

    if (Validator.isEmpty(data.personal_info.gender)) {
      errors.personal_info.gender = 'Employee gender is required.';
    }


  }

  // Employee Address
  if (data.address === '') {
    errors.address = 'Employee address information is requried.';
  } else {
    errors.address = {};

    data.address.address = !isEmpty(data.address.address) ? data.address.address : '';
    data.address.city = !isEmpty(data.address.city) ? data.address.city : '';
    data.address.zip_code = !isEmpty(data.address.zip_code) ? data.address.zip_code : '';
    data.address.province = !isEmpty(data.address.province) ? data.address.province : '';
    data.address.country = !isEmpty(data.address.country) ? data.address.country : '';
   
    if (Validator.isEmpty(data.address.address)) {
      errors.address.address = 'Employee street address is required.';
    }

    if (Validator.isEmpty(data.address.city)) {
      errors.address.city = 'Employee city is required.';
    }

    if (Validator.isEmpty(data.address.zip_code)) {
      errors.address.zip_code = 'Employee zipcode is required.';
    }

    if (Validator.isEmpty(data.address.province)) {
      errors.address.province = 'Employee province is required.';
    }

    if (Validator.isEmpty(data.address.country)) {
      errors.address.country = 'Employee country is required.';
    }

  }

  // Employee Bank Detail
  if ( data.bank_detail === '' ) {
    errors.bank_detail = 'Employee bank information is requried.';
  } else {

    errors.bank_detail = {};

    data.bank_detail.bank_name = !isEmpty(data.bank_detail.bank_name) ? data.bank_detail.bank_name : '';
    data.bank_detail.acount_holder_name = !isEmpty(data.bank_detail.acount_holder_name) ? data.bank_detail.acount_holder_name : '';
    data.bank_detail.account_no = !isEmpty(data.bank_detail.account_no) ? data.bank_detail.account_no : '';

  
    if (Validator.isEmpty(data.bank_detail.bank_name)) {
      errors.bank_detail.bank_name = 'Employee bank name is required.';
    }

    if (Validator.isEmpty(data.bank_detail.acount_holder_name)) {
      errors.bank_detail.acount_holder_name = 'Employee account holder name is required.';
    }

    if (Validator.isEmpty(data.bank_detail.account_no)) {
      errors.bank_detail.account_no = 'Employee account no is required.';
    }

  }

  // Employee Company Detail
  if ( data.company_detail === '' ) {
    errors.company_detail = 'Employee company information is requried.';
  } else {

    errors.company_detail = {};

    data.company_detail.employee_id = !isEmpty(data.company_detail.employee_id) ? data.company_detail.employee_id : '';
    data.company_detail.date_of_joining = !isEmpty(data.company_detail.date_of_joining) ? data.company_detail.date_of_joining : '';
    data.company_detail.Branch = !isEmpty(data.company_detail.Branch) ? data.company_detail.Branch : '';
    data.company_detail.Department = !isEmpty(data.company_detail.Department) ? data.company_detail.Department : '';
    data.company_detail.Designation = !isEmpty(data.company_detail.Designation) ? data.company_detail.Designation : '';


    if (Validator.isEmpty(data.company_detail.employee_id)) {
      errors.company_detail.employee_id = 'Compnay employee id is required.';
    }

    if(!Validator.isDate(data.company_detail.date_of_joining)) {
      errors.company_detail.date_of_joining = 'Employee date of joining is invalid';
    }

    if (Validator.isEmpty(data.company_detail.date_of_joining)) {
      errors.company_detail.date_of_joining = 'Employee date of joining is required.';
    } 



    if (Validator.isEmpty(data.company_detail.Branch)) {
      errors.company_detail.Branch = 'Employee branch is required.';
    }

    if (Validator.isEmpty(data.company_detail.Department)) {
      errors.company_detail.Department = 'Employee department is required.';
    }

    if (Validator.isEmpty(data.company_detail.Designation)) {
      errors.company_detail.Designation = 'Employee designation is required.';
    }

  }

  return {
    errors,
    isValid: isEmpty(errors.personal_info) && isEmpty(errors.address) && isEmpty(errors.bank_detail) && isEmpty(errors.company_detail),
  };
}

module.exports = validateEmployeeInputs;
