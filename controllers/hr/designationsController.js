function designationsController(Designation) {
  function post(req, res) {
    const designation = new Designation(req.body);
    designation.save();
    return res.status(201).json(designation);
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
    const { designation } = req;
    designation.name = req.body.name;
    req.designation.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(designation);
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
