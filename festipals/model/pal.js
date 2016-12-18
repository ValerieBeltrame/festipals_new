var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var PalsSchema = new Schema({
  first_name: { type: 'String', required: true  },
  last_name: { type: 'String', required: true },
  e_mail: { type: 'String', required: true },
  password: { type: 'String', required: true },
  pals: { type: Array, default: [] },
  acts: { type: Array, default: [] },
  pendingActInvites: { type: Array, default: [] },
  pendingPalRequests: { type: Array, default: [] },
});

module.exports = mongoose.model('Pal', PalsSchema);
