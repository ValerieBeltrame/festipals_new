var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Act = require('./act');

var PalsSchema = new Schema({
  first_name: { type: 'String', required: true  },
  last_name: { type: 'String', required: true },
  e_mail: { type: 'String', required: true },
  password: { type: 'String' },
  pals: [{ type: Schema.Types.ObjectId, ref: 'Pal' }],
  acts: [{ type: Schema.Types.ObjectId, ref: 'Act' }],
  pendingActInvites: [{invitingPal: { type: Schema.Types.ObjectId, ref: 'Pal'}, actID: {type: Schema.Types.ObjectId, ref: 'Act'} }],
  pendingPalRequests: [{invitingPal: { type: Schema.Types.ObjectId, ref: 'Pal' }}],
});

module.exports = mongoose.model('Pal', PalsSchema);
