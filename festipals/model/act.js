var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Pal = require('./pal');

var actsSchema = new Schema({
  title: { type: 'String', required: true },
  starts: {
    time: { type: 'String' },
    date: { type: 'String' } },
  ends: {
    time: { type: 'String'},
    date: { type: 'String'} },
  description: { type: 'String', required: true },
  country: { type: 'String', required: true },
  stage: { type: 'String', required: true },
});

module.exports = mongoose.model('Act', actsSchema);
