//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Act = require('./model/act');
var Pal = require('./model/pal');
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

 // post new comment to the database
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

// pals
router.route('/pals')
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
 })

 //retrieve all pals from the database
 .get(function(req, res) {
 //looks at our acts Schema
   Pal.find(function(err, pals) {
     if (err)
      res.send(err);
      //responds with a json object of our database pals.
      res.json(pals)
   });
 });

 // get a specific pal's profile
router.route('/pals/:_id/profile')
  .get(function(req, res) {
  //looks at our pals Schema
    Pal.findOne({ _id: req.params._id }, function(err, pal) {
      if (err)
      res.send(err);
      //responds with a json object of our database pals.
      res.json(pal);
    });
  })

  // update a specific pals
    .put(function(req, res) {
    //looks at our pals Schema
      Pal.findById({ _id: req.params._id }, function(err, pal) {
        if (err)
        res.send(err);
        //responds with a json object of our database pals.
        (req.body.first_name) ? pal.first_name = req.body.first_name : null;
        (req.body.last_name) ? pal.last_name = req.body.last_name : null;

        //save pal
         pal.save(function(err) {
         if (err)
           res.send(err);
           res.json({ message: 'Pal has been updated' });
         });
      });
    })

  //   //Delete a pal
  .delete(function(req, res) {
  //looks at our acts Schema
    Pal.remove({ _id: req.params._id }, function(err, comment) {
      if (err)
      res.send(err);
      //responds with a json object of our database pals.
      res.json({ message: 'Pal successfully deleted!' });
    });
  })


router.route('/pals/:_id/acts/:act')
  .put(function(req, res) {
  //looks at our pals Schema
    Pal.findOne({ _id: req.params._id }, function(error, pal){
      if(error){
          res.json(error);
      }
      else if(pal == null){
          res.json('no such user!')
      }
      else {
          pal.acts.push( req.params.act );
          pal.save( function(err, data){
          if(err)
            res.send(err);
          else
            res.json(data);
          });
      }

    });
  });

  
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
