/* eslint-disable no-param-reassign */
const express = require('express');
const passport = require('passport');
const employeesController = require('../../../controllers/hr/employeesController');
const validateEmployeeInputs = require('../../../validations/hr/employee');

function routes(User, Employee) {
  const employeeRouter = express.Router();
  //employeeRouter.use(passport.authenticate('jwt', { session: false }));
  const controller = employeesController(User, Employee);

  // employeeRouter.use('/employees', (req, res, next) => {
  //   console.log(req.user);
  //   if (req.user.isAdmin) {
  //     next();
  //   } else {
  //     // authoriaztion
  //     res.json({ msg: 'Not hr admin' });
  //   }
  // });

  employeeRouter.route('/employees').post(controller.post).get(controller.get);

  // middleware
  employeeRouter.use('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        return res.send(err);
      }
      if (employee) {
        req.employee = employee;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  employeeRouter
    .route('/employees/:id')
    .get((req, res) => res.json(req.employee))
    .put((req, res) => {
     const {errors, isValid} = validateEmployeeInputs(req.body);
      // Validation check
       if (!isValid) {
        return res.status(400).json(errors);
      }
      const { employee } = req;
      employee.personal_info = req.body.personal_info;
      employee.address = req.body.address;
      employee.bank_detail = req.body.bank_detail;
      employee.company_detail = req.body.company_detail;
      employee.assets = req.body.assets;
      req.employee.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.employee);
      });
    })
    .patch((req, res) => {
      const { employee } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        employee[key] = value;
      });
      req.employee.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.employee);
      });
    })
    .delete((req, res) => {
      req.employee.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return employeeRouter;
}

module.exports = routes;
