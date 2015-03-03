var mongoose = require('mongoose');
var secrets = require('../config/secrets');

var commentSchema = new mongoose.Schema({
    rank: { type: Number, default: -Infinity },
    upVotes: { type: Array, default: [] },
    author: {},
    comments: { type: Array, default: [] }
});

module.exports = mongoose.model('Comment', commentSchema);