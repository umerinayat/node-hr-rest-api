function branchesController(Branch) {
  function post(req, res) {
    const branch = new Branch(req.body);
    branch.save();
    return res.status(201).json(branch);
  }

  function get(req, res) {
    const { query } = req.body;
    Branch.find(query, (err, branches) => {
      if (err) {
        return res.send(err);
      }
      return res.json(branches);
    });
  }

  function show(req, res) {
    return res.json(req.branch);
  }

  function put(req, res) {
    const { branch } = req;
    branch.name = req.body.name;
    branch.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(branch);
    });
  }

  function patch(req, res) {
    const { branch } = req;
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      branch[key] = value;
    });
    branch.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(branch);
    });
  }

  function remove(req, res) {
    req.branch.remove((err) => {
      if (err) {
        return req.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return { post, show, get, put, patch, remove };
}

module.exports = branchesController;
