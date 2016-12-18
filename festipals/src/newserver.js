//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Act = require('./model/act');
var Pal = require('./model/pal');

// for hashing the password
var bcrypt = require('bcryptjs');

// controllers
var actController = require('./controllers/ActController');

//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;
//db config
mongoose.connect('mongodb://testuser:testuser123@ds113938.mlab.com:13938/festipals');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'festipals'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(pal, done) {
  done(null, pal._id);
});

passport.deserializeUser(function(id, done) {
  Pal.findById(id, function(err, pal) {
    done(err, pal);
  });
});

// passport routes
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, e_mail, password, done) {
    // check in mongo if a user with username exists or not
    Pal.findOne({ 'e_mail' :  e_mail },
    function(err, pal) {
      // In case of any error, return using the done method
      if (err)
        return done(err);
      // Username does not exist, log error & redirect back
      if (!pal){
        console.log('User Not Found with e_mail ' + e_mail);
        return done(null, false,
              req.flash('message', 'User Not found.'));
      }
      // User exists but wrong password, log the error
      if (!isValidPassword(pal, password)){
        console.log('Invalid Password');
        return done(null, false,
            req.flash('message', 'Invalid Password'));
      }
      // User and password both match, return user from
      // done method which will be treated like success
      return done(null, user);
    }


);

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, e_mail, password, done) {
    findOrCreatePal = function(){
      // find a user in Mongo with provided username
      Pal.findOne({'e_mail':e_mail},function(err, pal) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (pal) {
          console.log('User already exists');
          return done(null, false,
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newPal = new Pal();
          // set the user's local credentials
          newPal.password = createHash(password);
          newPal.email = req.param('e_mail');
          newPal.firstName = req.param('first_name');
          newPal.lastName = req.param('last_name');

          // save the user
          newPal.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newPal);
          });
        }
      });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreatePal);
  })
);

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// check password
var isValidPassword = function(pal, password){
  return bCrypt.compareSync(password, pal.password);
}

/* GET login page. */
router.get('/', function(req, res) {
  // Display the Login page with any flash message, if any
  res.render('index', { message: req.flash('message') });
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash : true
}));

/* GET Registration Page */
router.get('/signup', function(req, res){
  res.render('register',{message: req.flash('message')});
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash : true
}));

/* Handle Logout */
router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});


/* GET Home Page */
router.get('/home', isAuthenticated, function(req, res){
  res.render('home', { pal: req.pal });
});

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

//=======================================================




//adding the /comments route to our /api router
router.route('/acts')
 //retrieve all acts from the database
 .get(function(req, res) {
 //looks at our acts Schema
   Act.find(function(err, acts) {
     if (err)
     res.send(err);
     //responds with a json object of our database acts.
     res.json(acts)
   });
 })
 // post new act to the database
 .post(function(req, res) {
 var act = new Act();
   //body parser lets us use the req.body
   act.title = req.body.title;
   act.description = req.body.description;
   act.country = req.body.country;
   act.stage = req.body.stage;
  //  act.starts.time = req.body.starts.time;
  //  act.starts.date = req.body.starts.date;
  //  act.ends.time = req.body.ends.time;
  //  act.ends.date = req.body.ends.date;
   act.save(function(err) {
     if (err)
       res.send(err);
       res.json({ message: 'Act successfully added!' });
     });
 });

//=====Pals======
// router.route('/login')
// .get(function(req, res) {
// //looks at our acts Schema
//   Pal.findOne({ email: req.body.e_mail }, function(err, pal) {
//     if (!pal) {
//       res.render('login.jade', { error: 'Invalid email or password.' });
//     } else {
//       if (req.body.password === user.password) {
//         res.redirect('/dashboard');
//       } else {
//         res.render('login.jade', { error: 'Invalid email or password.' });
//       }
//     }
// });

// get all pals from database as JSON
router.route('/pals')
 //retrieve all pals from the database
 .get(function(req, res) {
 //looks at our acts Schema
   Pal.find(function(err, pals) {
     if (err)
      res.send(err);
      //responds with a json object of our database pals.
      res.json(pals)
   });
 })

 // add new pal to database
 .post(function(req, res) {
 var pal = new Pal();
   //body parser lets us use the req.body
   pal.first_name = req.body.first_name;
   pal.last_name = req.body.last_name;
   pal.e_mail = req.body.e_mail;

   // hashing the password
   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(req.body.password, salt);
   pal.password = hash;

   pal.save(function(err) {
     if (err)
       res.send(err);
       res.json('New pal was saved!');
     });
 });

// find a specific pal
router.route('/pals/:_id')
  .get(function(req, res) {
  //looks at our pals Schema
    Pal.find({ _id: req.params._id }, function(err, pals) {
      if (err)
      res.send(err);
      //responds with a json object of our database pals.
      res.json(pals);
    });
  });

//
// // update a specific pals
//   .put(function(req, res) {
//   //looks at our pals Schema
//     Pal.findById({ _id: req.params._id }, function(err, pal) {
//       if (err)
//       res.send(err);
//       //responds with a json object of our database pals.
//       (req.body.first_name) ? pal.first_name = req.body.first_name : null;
//       (req.body.last_name) ? pal.last_name = req.body.last_name : null;
//
//       //save pal
//        pal.save(function(err) {
//        if (err)
//          res.send(err);
//          res.json({ message: 'Pal has been updated' });
//        });
//     });
//   })
//
//   //Delete a pal
//   .delete(function(req, res) {
//   //looks at our acts Schema
//     Pal.remove({ _id: req.params._id }, function(err, comment) {
//       if (err)
//       res.send(err);
//       //responds with a json object of our database pals.
//       res.json({ message: 'Pal successfully deleted!' });
//     });
//   })

  // add an act to a pal
  // router.route('/pals/:_id/acts')
  //   .get(function(req, res) {
  //   //looks at our pals Schema
  //
  //   Pal.find({ _id: req.params._id }, function(err, pals) {
  //     if (err)
  //     res.send(err);
  //     //responds with a json object of our database pals.
  //     res.json(pals);
  //   });
      // var foundAct = Act.find({ _id: req.params.actid }, function(err, pals) {
      //   if (err)
      //   res.send(err);
      //   //responds with a json object of our database pals.
      //   res.json(pals);
      // });
      //
      // if(foundAct != null) {
      //   Pal.update()({palid: req.params.palid}, {$push: {"act": foundAct}});
      //   res.json({ message: 'act was added to your user'});
      // }
    //
    // });
