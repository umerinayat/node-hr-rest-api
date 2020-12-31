const express = require('express');
const departmentsController = require('../../../controllers/hr/departmentsController');

function routes(Department) {
  const departmentRouter = express.Router();
  const controller = departmentsController(Department);

  departmentRouter
    .route('/departments')
    .post(controller.post)
    .get(controller.get);

  // middleware
  departmentRouter.use('/departments/:id', (req, res, next) => {
    Department.findById(req.params.id, (err, department) => {
      if (err) {
        return res.send(err);
      }
      if (department) {
        req.department = department;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  departmentRouter
    .route('/departments/:id')
    .get(controller.show)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.remove);

  return departmentRouter;
}

module.exports = routes;
