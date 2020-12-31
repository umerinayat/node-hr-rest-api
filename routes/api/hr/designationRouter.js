const express = require('express');
const designationsController = require('../../../controllers/hr/designationsController');

function routes(Designation) {
  const designationRouter = express.Router();
  const controller = designationsController(Designation);

  designationRouter
    .route('/designations')
    .post(controller.post)
    .get(controller.get);

  // middleware
  designationRouter.use('/designations/:id', (req, res, next) => {
    Designation.findById(req.params.id, (err, designation) => {
      if (err) {
        return res.send(err);
      }
      if (designation) {
        req.designation = designation;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  designationRouter
    .route('/designations/:id')
    .get(controller.show)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.remove);

  return designationRouter;
}

module.exports = routes;
