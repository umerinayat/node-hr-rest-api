function departmentsController(Department) {
  function post(req, res) {
    const department = new Department(req.body);
    department.save();
    return res.status(201).json(department);
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
    const { department } = req;
    department.name = req.body.name;
    req.department.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(department);
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
