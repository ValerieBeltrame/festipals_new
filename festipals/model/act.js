var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actsSchema = new Schema({
  title: { type: 'String', required: true },
  starts: {
    time: { type: 'Date' },
    date: { type: 'Date' } },
  ends: {
    time: { type: 'Date'},
    date: { type: 'Date'} },
  description: { type: 'String', required: true },
  country: { type: 'String', required: true },
  stage: { type: 'String', required: true },
});

module.exports = mongoose.model('Act', actsSchema);
