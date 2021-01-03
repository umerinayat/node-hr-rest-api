const express = require('express');
const usersController = require('../../../controllers/users/usersController');

function routes(User) {
  const userRouter = express.Router();
  const controller = usersController(User);

  // @route POST api/users/register
  // @desc Register user
  // @access Public
  userRouter.route('/register').post(controller.register);

  // @route POST api/users/login
  // @desc Login user / Returing JWT Token
  // @access Public
  userRouter.route('/login').post(controller.login);

  return userRouter;
}

module.exports = routes;
