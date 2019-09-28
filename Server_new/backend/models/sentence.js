const mongoose = require('mongoose');
const Trans = require('./trans');
const Like = require('./like');

const sentenceSchema = new mongoose.Schema({
    raw_text: { type: String },
    google_text: { type: String, default: null },
    ratio: { type: Number, default: null },
    //trans: [ transSchma ],
    trans: [ {type: Trans, default: null} ],
    //like: [ likeSchema ],
    like: [ {type: Like, default: null} ],
});

//module.export = mongoose.model('Sentence', sentenceSchema);
module.exports = sentenceSchema;