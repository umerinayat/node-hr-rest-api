/* eslint-disable no-param-reassign */
const express = require('express');
const passport = require('passport');
const employeesController = require('../../../controllers/hr/employeesController');
const validateEmployeeInputs = require('../../../validations/hr/employee');
const multer = require('multer');
const storage = require('../../../config/storage').storage;
const path = require('path');
const { json } = require('body-parser');

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



  // single image upload

  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }

  
  const employeeImageUpload = multer({
    storage: storage,
    //limits: {
      //fields: 5,
      //fieldNameSize: 50, // TODO: Check if this size is enough
      //fieldSize: 20000, //TODO: Check if this size is enough
      // TODO: Change this line after compression
      //fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    //},
    fileFilter: function (_req, file, cb) {
      checkFileType(file, cb);
    },
  });

  // Employee image upload
  employeeRouter.post('/employees/save-image', (req, res, next) => {

    const upload = employeeImageUpload.single('image');
    upload(req, res, (err) => {
      if(err) {
        console.log(err.message);
        return res.status(400).json({
          errors: {
            message: err.message
          } 
        })
      }

      console.log(req.file);
      console.log(req.file.path);

      if (!req.file) {
        res.status(500);
        return next('Problem in image uploading');
      }

      req.image = {
        filePath: req.file.path,
        filename: req.file.filename,
        fileUrl: 'url/' + req.file.filename,
      };
      next()
    });

  });
  
  employeeRouter.post('/employees/save-image', (req, res) => {
    return res.json(req.image);
  });

  

  employeeRouter.route('/employees')
  .post(controller.post)
  .get(controller.get);


  employeeRouter.route('/employees/save-attachments')
  .post(controller.saveAttachments);



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
    })
    .populate('User', '_id email avatar date')
    .populate('company_detail.Department')
    .populate('company_detail.Branch')
    .populate('company_detail.Designation');;
  });

  employeeRouter
    .route('/employees/:id')
    .get((req, res) => res.json(req.employee))
    .put((req, res) => {
      const { errors, isValid } = validateEmployeeInputs(req.body);
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
        return res.status(204).json({
          message: "Successfully deleted!"
        });
      });
    });

  return employeeRouter;
}

module.exports = routes;
