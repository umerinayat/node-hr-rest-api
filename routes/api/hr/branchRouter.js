const express = require('express');
const branchesController = require('../../../controllers/hr/branchesController');

function routes(Branch) {
  const branchRouter = express.Router();
  const controller = branchesController(Branch);

  branchRouter.route('/branches').post(controller.post).get(controller.get);

  // middleware
  branchRouter.use('/branches/:id', (req, res, next) => {
    Branch.findById(req.params.id, (err, branch) => {
      if (err) {
        return res.send(err);
      }
      if (branch) {
        req.branch = branch;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  branchRouter
    .route('/branches/:id')
    .get(controller.show)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.remove);

  return branchRouter;
}

module.exports = routes;
