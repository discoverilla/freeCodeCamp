var fs = require('fs');
var os = require('os');
var blessed = require('blessed');
var multiline = require('multiline');

var screen = blessed.screen({
  autoPadding: true
});

screen.key('q', function() {
  process.exit(0);
});

var home = blessed.list({
  parent: screen,
  padding: { top: 2 },
  mouse: true,
  keys: true,
  fg: 'white',
  bg: 'blue',
  selectedFg: 'blue',
  selectedBg: 'white',
  items: [
    '» REMOVE AUTHENTICATION PROVIDER',
    '» CHANGE EMAIL SERVICE',
    '» ENABLE SOCKET.IO',
    '» ADD NODE.JS CLUSTER SUPPORT',
    '» EXIT'
  ]
});

var inner = blessed.form({
  top: 'center',
  left: 'center',
  mouse: true,
  keys: true,
  width: 33,
  height: 10,
  border: {
    type: 'line',
    fg: 'white',
    bg: 'red'
  },
  fg: 'white',
  bg: 'red'
});

var success = blessed.box({
  top: 'center',
  left: 'center',
  mouse: true,
  keys: true,
  tags: true,
  width: '50%',
  height: '40%',
  border: {
    type: 'line',
    fg: 'white',
    bg: 'green'
  },
  fg: 'white',
  bg: 'green',
  padding: 1
});

success.on('keypress', function() {
  home.focus();
  home.remove(success);
});

var socketText = blessed.text({
  top: 'top',
  bg: 'red',
  fg: 'white',
  tags: true,
  content: 'Add real-time support to your application with Socket.IO.'
});

var clusterText = blessed.text({
  top: 'top',
  bg: 'red',
  fg: 'white',
  tags: true,
  content: 'Take advantage of multi-core systems using built-in {underline}cluster{/underline} module.'
});


var enable = blessed.button({
  parent: inner,
  bottom: 0,
  mouse: true,
  shrink: true,
  name: 'enable',
  content: ' ENABLE ',
  border: {
    type: 'line',
    fg: 'white',
    bg: 'red'
  },
  style: {
    fg: 'white',
    bg: 'red',
    focus: {
      fg: 'red',
      bg: 'white'
    }
  }
});


var disable = blessed.button({
  parent: inner,
  bottom: 0,
  left: 10,
  mouse: true,
  shrink: true,
  name: 'disable',
  content: ' DISABLE ',
  border: {
    type: 'line',
    fg: 'white',
    bg: 'red'
  },
  style: {
    fg: 'white',
    bg: 'red',
    focus: {
      fg: 'red',
      bg: 'white'
    }
  }
});

var cancel = blessed.button({
  parent: inner,
  bottom: 0,
  left: 21,
  mouse: true,
  shrink: true,
  name: 'cancel',
  content: ' CANCEL ',
  border: {
    type: 'line',
    fg: 'white',
    bg: 'red'
  },
  style: {
    fg: 'white',
    bg: 'red',
    focus: {
      fg: 'red',
      bg: 'white'
    }
  }
});

cancel.on('press', function() {
  home.focus();
  home.remove(inner);
  screen.render();

});

var authForm = blessed.form({
  mouse: true,
  keys: true,
  fg: 'white',
  bg: 'blue',
  padding: { left: 1, right: 1 }
});

authForm.on('submit', function(data) {
  var passportConfig = fs.readFileSync('config/passport.js').toString().split(os.EOL);
  var loginTemplate = fs.readFileSync('views/account/login.jade').toString().split(os.EOL);
  var profileTemplate = fs.readFileSync('views/account/profile.jade').toString().split(os.EOL);
  var userModel = fs.readFileSync('models/User.js').toString().split(os.EOL);
  var app = fs.readFileSync('app.js').toString().split(os.EOL);
  var secrets = fs.readFileSync('config/secrets.js').toString().split(os.EOL);

  if (facebookCheckbox.checked) {
    var index = passportConfig.indexOf("var FacebookStrategy = require('passport-facebook').Strategy;");
    passportConfig.splice(index, 1);
    index = passportConfig.indexOf('// Sign in with Facebook.');
    passportConfig.splice(index, 47);
    fs.writeFileSync('config/passport.js', passportConfig.join(os.EOL));

    index = loginTemplate.indexOf("      a.btn.btn-block.btn-facebook.btn-social(href='/auth/facebook')");
    loginTemplate.splice(index, 3);
    fs.writeFileSync('views/account/login.jade', loginTemplate.join(os.EOL));

    index = profileTemplate.indexOf("  if user.facebook");
    profileTemplate.splice(index - 1, 5);
    fs.writeFileSync('views/account/profile.jade', profileTemplate.join(os.EOL));

    index = userModel.indexOf('  facebook: String,');
    userModel.splice(index, 1);
    fs.writeFileSync('models/User.js', userModel.join(os.EOL));

    index = app.indexOf("app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));");
    app.splice(index, 4);
    fs.writeFileSync('app.js', app.join(os.EOL));
  }

  home.remove(authForm);
  home.append(success);
  success.setContent('Selected authentication providers have been removed from passportConfig.js, User.js, secrets.js, app.js, login.jade and profile.jade!');
  success.focus();
  screen.render();
});

var authText = blessed.text({
  parent: authForm,
  content: 'Selecting a checkbox adds an authentication provider. Unselecting a checkbox removes it. If authentication provider is already present, no action will be taken.',
  padding: 1,
  bg: 'magenta',
  fg: 'white'
});

var facebookCheckbox = blessed.checkbox({
  parent: authForm,
  top: 6,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'Facebook'
});

var githubCheckbox = blessed.checkbox({
  parent: authForm,
  top: 7,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'GitHub'
});

var googleCheckbox = blessed.checkbox({
  parent: authForm,
  top: 8,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'Google'
});

var twitterCheckbox = blessed.checkbox({
  parent: authForm,
  top: 9,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'Twitter'
});

var linkedinCheckbox = blessed.checkbox({
  parent: authForm,
  top: 10,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'LinkedIn'
});

var instagramCheckbox = blessed.checkbox({
  parent: authForm,
  top: 11,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'Instagram'
});

var authSubmit = blessed.button({
  parent: authForm,
  top: 13,
  mouse: true,
  shrink: true,
  name: 'submit',
  content: ' SUBMIT ',
  style: {
    fg: 'blue',
    bg: 'white',
    focus: {
      fg: 'white',
      bg: 'red'
    }
  }
});

authSubmit.on('press', function() {
  authForm.submit();
});

var authCancel = blessed.button({
  parent: authForm,
  top: 13,
  left: 9,
  mouse: true,
  shrink: true,
  name: 'cancel',
  content: ' CANCEL ',
  style: {
    fg: 'blue',
    bg: 'white',
    focus: {
      fg: 'white',
      bg: 'red'
    }
  }
});

authCancel.on('press', function() {
  home.focus();
  home.remove(authForm);
  screen.render();
});

var emailForm = blessed.form({
  mouse: true,
  keys: true,
  fg: 'white',
  bg: 'blue',
  padding: { left: 1, right: 1 }
});

emailForm.on('submit', function(data) {
  var contactCtrl = fs.readFileSync('controllers/contact.js').toString().split(os.EOL);
  var userCtrl = fs.readFileSync('controllers/user.js').toString().split(os.EOL);
  var choice = null;

  if (sendgridRadio.checked) {
    choice = 'SendGrid';
  } else if (mailgunRadio.checked) {
    choice = 'Mailgun';
  } else if (mandrillRadio.checked) {
    choice = 'Mandrill';
  }

  var index = contactCtrl.indexOf('var smtpTransport = nodemailer.createTransport(\'SMTP\', {');
  contactCtrl.splice(index + 1, 1, "  service: '" + choice + "',");
  contactCtrl.splice(index + 3, 1, '       user: secrets.' + choice.toLowerCase() +'.user,');
  contactCtrl.splice(index + 4, 1, '       pass: secrets.' + choice.toLowerCase() + '.password');
  fs.writeFileSync('controllers/contact.js', contactCtrl.join(os.EOL));

  index = userCtrl.indexOf('      var smtpTransport = nodemailer.createTransport(\'SMTP\', {');
  userCtrl.splice(index + 1, 1, "        service: '" + choice + "',");
  userCtrl.splice(index + 3, 1, '          user: secrets.' + choice.toLowerCase() + '.user,');
  userCtrl.splice(index + 4, 1, '          pass: secrets.' + choice.toLowerCase() + '.password');
  index = userCtrl.indexOf('      var smtpTransport = nodemailer.createTransport(\'SMTP\', {', (index + 1));
  userCtrl.splice(index + 1, 1, "        service: '" + choice + "',");
  userCtrl.splice(index + 3, 1, '          user: secrets.' + choice.toLowerCase() + '.user,');
  userCtrl.splice(index + 4, 1, '          pass: secrets.' + choice.toLowerCase() + '.password');
  fs.writeFileSync('controllers/user.js', userCtrl.join(os.EOL));

  home.remove(emailForm);
  home.append(success);
  success.setContent('Email Service has been switched to ' + choice);
  success.focus();
  screen.render();
});

var emailText = blessed.text({
  parent: emailForm,
  content: 'Select one of the following email service providers for {underline}contact form{/underline} and {underline}password reset{/underline}.',
  padding: 1,
  bg: 'red',
  fg: 'white',
  tags: true
});

var sendgridRadio = blessed.radiobutton({
  parent: emailForm,
  top: 5,
  checked: true,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'SendGrid'
});

var mailgunRadio = blessed.radiobutton({
  parent: emailForm,
  top: 6,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'Mailgun'
});

var mandrillRadio = blessed.radiobutton({
  parent: emailForm,
  top: 7,
  mouse: true,
  fg: 'white',
  bg: 'blue',
  content: 'Mandrill'
});

var emailSubmit = blessed.button({
  parent: emailForm,
  top: 9,
  mouse: true,
  shrink: true,
  name: 'submit',
  content: ' SUBMIT ',
  style: {
    fg: 'blue',
    bg: 'white',
    focus: {
      fg: 'white',
      bg: 'red'
    }
  }
});

emailSubmit.on('press', function() {
  emailForm.submit();
});

var emailCancel = blessed.button({
  parent: emailForm,
  top: 9,
  left: 9,
  mouse: true,
  shrink: true,
  name: 'cancel',
  content: ' CANCEL ',
  style: {
    fg: 'blue',
    bg: 'white',
    focus: {
      fg: 'white',
      bg: 'red'
    }
  }
});



emailCancel.on('press', function() {
  home.focus();
  home.remove(emailForm);
  screen.render();

});

var homeTitle = blessed.text({
  parent: screen,
  align: 'center',
  fg: 'blue',
  bg: 'white',
  content: 'Hackathon Starter (c) 2014'
});

var footer = blessed.text({
  parent: screen,
  bottom: 0,
  fg: 'white',
  bg: 'blue',
  tags: true,
  content: ' {cyan-fg}<Up/Down>{/cyan-fg} moves | {cyan-fg}<Enter>{/cyan-fg} selects | {cyan-fg}<q>{/cyan-fg} exits'
});

home.on('select', function(child, index) {
  switch (index) {
    case 0:
      home.append(authForm);
      authForm.focus();
      screen.render();
      break;
    case 1:
      home.append(emailForm);
      emailForm.focus();
      break;
    case 2:
      enableSocketIo();
      home.append(success);
      success.setContent('Socket.IO events have been added at the bottom of {underline}app.js{/underline}. To see a working example take a look at /dashboard. Be sure to run npm install socket.io');
      success.focus();
      screen.render();
      break;
    case 3:
      addClusterSupport();
      home.append(success);
      success.setContent('New file {underline}cluster_app.js{/underline} has been created. Your app is now able to use more than 1 CPU by running {underline}node cluster_app.js{/underline}, which in turn spawns multiple instances of {underline}app.js{/underline}');
      success.focus();
      screen.render();
      break;
    default:
      process.exit(0);
  }
});




screen.render();


function addClusterSupport() {

  var fileContents = multiline(function() {
/*
var os = require('os');
var cluster = require('cluster');

cluster.setupMaster({
  exec: 'app.js'
});

cluster.on('exit', function(worker) {
  console.log('worker ' + worker.id + ' died');
  cluster.fork();
});

for (var i = 0; i < os.cpus().length; i++) {
  cluster.fork();
}
*/
  });

  fs.writeFileSync('cluster_app.js', fileContents);
}

function enableSocketIo() {
  var fileContents = multiline(function() {
    /*


     */
  });
}