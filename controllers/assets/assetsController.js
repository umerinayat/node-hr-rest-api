function assetsController(Asset) {
  function post(req, res) {
    const asset = new Asset(req.body);
    asset.save();
    return res.status(201).json(asset);
  }

  function get(req, res) {
    const { query } = req.body;
    Asset.find(query, (err, assets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(assets);
    });
  }

  function show(req, res) {
    return res.json(req.asset);
  }

  function put(req, res) {
    const { asset } = req;
    asset.name = req.body.name;
    asset.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(asset);
    });
  }

  function patch(req, res) {
    const { asset } = req;
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      asset[key] = value;
    });
    asset.save((err) => {
      if (err) {
        return req.send(err);
      }
      return res.json(asset);
    });
  }

  function remove(req, res) {
    req.asset.remove((err) => {
      if (err) {
        return req.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return {
    post,
    show,
    get,
    put,
    patch,
    remove,
  };
}

module.exports = assetsController;
