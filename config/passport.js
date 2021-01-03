const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const config = require('./config');

const User = mongoose.model('User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt_secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload._id, (err, user) => {
        if (err) {
          console.log(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, user);
      });
      console.log(jwtPayload);
    })
  );
};
