const validateDesignationInputs = require('../../validations/hr/designation');


function designationsController(Designation) {
  function post(req, res) {
    const {errors, isValid} = validateDesignationInputs(req.body)
    // Validation check
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // check if Designation is already there
    Designation.findOne({name: req.body.name}, (err, d) => {
      if(err) {
        return res.send(err);
      }

      if (d) {
        errors.name = 'Designation name already exists';
        return res.status(400).json(
          errors,
        );
      }

      const designation = new Designation(req.body);
      designation.save();
      return res.status(201).json(designation);

    });

  }

  function get(req, res) {
    const { query } = req.body;
    Designation.find(query, (err, designations) => {
      if (err) {
        return res.send(err);
      }
      return res.json(designations);
    });
  }

  function show(req, res) {
    return res.json(req.designation);
  }

  function put(req, res) {
    const {errors, isValid} = validateDesignationInputs(req.body)
    // Validation check
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { designation } = req;

    // check if Designation is already there
    Designation.findOne({name: req.body.name}, (err, d) => {
      if(err) {
        return res.send(err);
      }

      if (d && req.params.id !== d.id) {
        errors.name = 'Designation name already exists';
        return res.status(400).json(
          errors,
        );
      }

      designation.name = req.body.name;
      req.designation.save((err) => {
        if (err) {
          return req.send(err);
        }
        return res.json(designation);
      });

    });

    
  }

  function patch(req, res) {
    const { designation } = req;
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      designation[key] = value;
    });
    designation.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(designation);
    });
  }

  function remove(req, res) {
    req.designation.remove((err) => {
      if (err) {
        return req.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return { post, show, get, put, patch, remove };
}

module.exports = designationsController;
