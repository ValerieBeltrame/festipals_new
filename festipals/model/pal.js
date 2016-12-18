var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var PalsSchema = new Schema({
  first_name: { type: 'String' },
  last_name: { type: 'String' },
  e_mail: { type: 'String' },
  password: { type: 'String' },
  pals: { type: Array, default: [] },
  acts: { type: Array, default: [] },
  pendingActInvites: { type: Array, default: [] },
  pendingPalRequests: { type: Array, default: [] },
});

PalsSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Pal', PalsSchema);
