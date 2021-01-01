const express = require('express');
const assetsController = require('../../../controllers/assets/assetsController');

function routes(Asset) {
  const assetsRouter = express.Router();
  const controller = assetsController(Asset);

  assetsRouter.route('/assets').post(controller.post).get(controller.get);

  // middleware
  assetsRouter.use('/assets/:id', (req, res, next) => {
    Asset.findById(req.params.id, (err, asset) => {
      if (err) {
        return res.send(err);
      }
      if (asset) {
        req.asset = asset;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  assetsRouter
    .route('/assets/:id')
    .get(controller.show)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.remove);

  return assetsRouter;
}

module.exports = routes;
