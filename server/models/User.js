var _ = require('underscore'),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy,
    check = require('validator').check,
    userRoles = require('../../client/js/routingConfig').userRoles;

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: {
    type: String,
    unique: true
  },
  provider: String,
  hashed_password: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {}
});

var User = mongoose.model('User', UserSchema);

var users = [
  {
    id:         1,
    username:   "user",
    password:   "123",
    role:   userRoles.user
  },
  {
    id:         2,
    username:   "admin",
    password:   "123",
    role:   userRoles.admin
  }
];

module.exports = {

  addUser: function(username, password, role, callback) {
    if (this.findByUsername(username)) {
      return callback("UserAlreadyExists");
    }

    var user = new User({
      username:   username,
      password:   password,
      role:       role
    });

    user.save(function(err) {
      callback(null, user);
    });
  },

  findOrCreateOauthUser: function(provider, providerId) {
    User.findOne({ $where: provider + '===' + providerId }, function(err, user) {
      if (user) {
        return user;
      } else {
        user = {
          username: provider + '_user',
          role: userRoles.user,
          provider: provider
        };
        user[provider] = providerId;

        user.save(function(err) {
          return user;
        });
      }
    });
  },

  findAll: function() {
    User.find(function(err, users) {
      return users;
    });
  },

  findById: function(id) {
    User.findById(id, function(err, user) {
      if (user) return user;
    });
  },

  findByUsername: function(username) {
    User.findOne({ username: username }, function(err, user) {
      if (user) return user;
    });
  },

  validate: function(user) {
    check(user.username, 'Username must be 1-20 characters long').len(1, 20);
    check(user.password, 'Password must be 5-60 characters long').len(5, 60);
    check(user.username, 'Invalid username').not(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

    // TODO: Seems node-validator's isIn function doesn't handle Number arrays very well...
    // Till this is rectified Number arrays must be converted to string arrays
    // https://github.com/chriso/node-validator/issues/185
    var stringArr = _.map(_.values(userRoles), function(val) { return val.toString() });
    check(user.role, 'Invalid user role given').isIn(stringArr);
  },

  localStrategy: new LocalStrategy(
    function(username, password, done) {

      var user = module.exports.findByUsername(username);

      if(!user) {
        done(null, false, { message: 'Incorrect username.' });
      }
      else if(user.password != password) {
        done(null, false, { message: 'Incorrect username.' });
      }
      else {
        return done(null, user);
      }

    }
  ),

  twitterStrategy: function() {
    if(!process.env.TWITTER_CONSUMER_KEY)    throw new Error('A Twitter Consumer Key is required if you want to enable login via Twitter.');
    if(!process.env.TWITTER_CONSUMER_SECRET) throw new Error('A Twitter Consumer Secret is required if you want to enable login via Twitter.');

    return new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:8000/auth/twitter/callback'
      },
      function(token, tokenSecret, profile, done) {
        var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
        done(null, user);
      });
  },

  facebookStrategy: function() {
    if(!process.env.FACEBOOK_APP_ID)     throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');
    if(!process.env.FACEBOOK_APP_SECRET) throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');

    return new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:8000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
        done(null, user);
      });
  },

  googleStrategy: function() {

    return new GoogleStrategy({
        returnURL: process.env.GOOGLE_RETURN_URL || "http://localhost:8000/auth/google/return",
        realm: process.env.GOOGLE_REALM || "http://localhost:8000/"
      },
      function(identifier, profile, done) {
        var user = module.exports.findOrCreateOauthUser('google', identifier);
        done(null, user);
      });
  },

  linkedInStrategy: function() {
    if(!process.env.LINKED_IN_KEY)     throw new Error('A LinkedIn App Key is required if you want to enable login via LinkedIn.');
    if(!process.env.LINKED_IN_SECRET) throw new Error('A LinkedIn App Secret is required if you want to enable login via LinkedIn.');

    return new LinkedInStrategy({
        consumerKey: process.env.LINKED_IN_KEY,
        consumerSecret: process.env.LINKED_IN_SECRET,
        callbackURL: process.env.LINKED_IN_CALLBACK_URL || "http://localhost:8000/auth/linkedin/callback"
      },
      function(token, tokenSecret, profile, done) {
        var user = module.exports.findOrCreateOauthUser('linkedin', profile.id);
        done(null,user);
      }
    );
  },
  serializeUser: function(user, done) {
    done(null, user.id);
  },

  deserializeUser: function(id, done) {
    var user = module.exports.findById(id);

    if(user)    { done(null, user); }
    else        { done(null, false); }
  }
};