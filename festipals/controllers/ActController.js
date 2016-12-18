var Act = require('../model/pal');


  var createUserAccount = function (req, res) {
       Act.find(function(err, acts) {
         if (err)
         res.send(err);
         //responds with a json object of our database acts.
         res.json(acts)
       });
  }
