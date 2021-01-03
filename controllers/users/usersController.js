const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function usersController(User) {
  function register(req, res) {
    const { email, password, isAdmin } = req.body;
    const avatar = 'https://via.placeholder.com/150';

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (user) {
        return res.status(400).json({
          email: 'Email already existis',
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
            return res.status(201).json(registerdUser);
          });
        });
      });
    });
  }

  function login(req, res) {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (!user) {
        return res.status(404).json({ email: 'User not found' });
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
          return res.status(400).json({ password: 'Password incorrect' });
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
