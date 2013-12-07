var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');
var config = require('./config');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (!user) return done(null, false, { message: 'No match found for user: ' + username });
    user.comparePassword(password, function(err, isMatch) {
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Your username or password is incorrect' });
      }
    });
  });
}));

passport.use(new FacebookStrategy(config.facebook, function (accessToken, refreshToken, profile, done) {
  User.findOne({ facebook: profile.id }, function(err, existingUser) {
    if (existingUser) return done(null, existingUser);
    var user = new User();
    user.facebook = profile.id;
    user.profile.name = profile.displayName;
    user.profile.email = profile._json.email;
    user.profile.gender = profile._json.gender;
    user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=normal';
    user.save(function(err) {
      done(err, user);
    });
  });
}));

passport.use(new GitHubStrategy(config.github, function(accessToken, refreshToken, profile, done) {
  User.findOne({ github: profile.id }, function(err, existingUser) {
    if (existingUser) return done(null, existingUser);
    var user = new User();
    user.github = profile.id;
    user.profile.name = profile.displayName;
    user.profile.email = profile._json.email;
    user.profile.picture = profile._json.avatar_url;
    user.profile.location = profile._json.location;
    user.profile.website = profile._json.blog;
    user.save(function(err) {
      done(err, user);
    });
  });
}));

passport.use(new TwitterStrategy(config.twitter, function(accessToken, tokenSecret, profile, done) {
  User.findOne({ twitter: profile.id }, function(err, existingUser) {
    if (existingUser) return done(null, existingUser);
    var user = new User();
    user.twitter = profile.id;
    user.tokens.twitter = accessToken;
    user.profile.name = profile.displayName;
    user.profile.location = profile._json.location;
    user.profile.picture = profile._json.profile_image_url;
    user.save(function(err) {
      done(err, user);
    });
  });
}));

passport.use(new GoogleStrategy(config.google, function(accessToken, refreshToken, profile, done) {
  User.findOne({ google: profile.id }, function(err, existingUser) {
    if (existingUser) return done(null, existingUser);
    var user = new User();
    user.google = profile.id;
    user.tokens.google = accessToken;
    user.profile.name = profile.displayName;
    user.profile.email = profile._json.email;
    user.profile.gender = profile._json.gender;
    user.profile.picture = profile._json.picture;
    user.save(function(err) {
      done(err, user);
    });
  });
}));

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};


// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins
exports.ensureAdmin = function ensureAdmin(req, res, next) {
  return function(req, res, next) {
    console.log(req.user);
    if(req.user && req.user.admin === true)
      next();
    else
      res.send(403);
  };
};
