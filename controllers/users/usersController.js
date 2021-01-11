const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const validateRegisterInputs = require('../../validations/register');
const validateLoginInputs = require('../../validations/login');

function usersController(User) {
  // Register new user
  function register(req, res) {
    const { errors, isValid } = validateRegisterInputs(req.body);
    // check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password, isAdmin } = req.body;
    const avatar = 'https://via.placeholder.com/150';

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (user) {
        errors.email = 'Email Already exisits';
        return res.status(400).json({
          errors,
        });
      }
      // Register new user
      const newUser = new User({
        email,
        password,
        avatar,
        isAdmin,
      });

      bcrypt.genSalt(10, (err, salt) => {
        // eslint-disable-next-line consistent-return
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.send(err.message);
          }
          newUser.password = hash;
          newUser.save((err, registerdUser) => {
            if (err) {
              return res.send(err);
            }
            return res.status(201).json(
              {
                "_id": registerdUser._id,
                "isAdmin": registerdUser.isAdmin,
                "date": registerdUser.date,
                "email": registerdUser.email,
                "avatar": "https://via.placeholder.com/150",
              }
            );
          });
        });
      });
    });
  }

  // Login user with jwt token
  function login(req, res) {
    const { errors, isValid } = validateLoginInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      // check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Generate JWT Sign Token

          // JWT Payload
          const payload = {
            // eslint-disable-next-line no-underscore-dangle
            _id: user._id,
            email: user.email,
            avatar: user.avatar,
            // may inclues user role and level of access to system
            isAdmin: user.isAdmin,
          };

          jwt.sign(
            payload,
            config.jwt_secret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                return res.send(err);
              }
              return res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  }

  return {
    register,
    login,
  };
}

module.exports = usersController;
