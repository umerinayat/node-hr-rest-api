const validateDeparmentInputs = require('../../validations/hr/department');

function departmentsController(Department) {
  function post(req, res) {
    const {errors, isValid} = validateDeparmentInputs(req.body);
    // Validation check
     if (!isValid) {
      return res.status(400).json(errors);
    }

     // check if Department is already there
     Department.findOne({name: req.body.name}, (err, d) => {
      if(err) {
        return res.send(err);
      }

      if (d) {
        errors.name = 'Department name already exists';
        return res.status(400).json(
          errors,
        );
      }

      const department = new Department(req.body);
      department.save();
      return res.status(201).json(department);

    });
    
   
  }

  function get(req, res) {
    const { query } = req.body;
    Department.find(query, (err, departments) => {
      if (err) {
        return res.send(err);
      }
      return res.json(departments);
    });
  }

  function show(req, res) {
    return res.json(req.department);
  }

  function put(req, res) {
    const {errors, isValid} = validateDeparmentInputs(req.body);
    // Validation check
     if (!isValid) {
      return res.status(400).json(errors);
    }
    const { department } = req;

    // check if Department is already there
    Department.findOne({name: req.body.name}, (err, d) => {
      if(err) {
        return res.send(err);
      }

      if (d && req.params.id !== d.id) {
        errors.name = 'Department name already exists';
        return res.status(400).json(
          errors,
        );
      }

      department.name = req.body.name;
      req.department.save((err) => {
        if (err) {
          return req.send(err);
        }
        return res.json(department);
      });

    });

  }

  function patch(req, res) {
    const { department } = req;
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      department[key] = value;
    });
    req.department.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(department);
    });
  }

  function remove(req, res) {
    req.department.remove((err) => {
      if (err) {
        return req.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return { post, show, get, put, patch, remove };
}

module.exports = departmentsController;
