const mongoose = require('mongoose');

const transSchema = new mongoose.Schema({
    idx: { type: Number },
    text: { type: String },
    user: { type: String },
    //liker: [{ type: String }],
});

//module.exports = mongoose.model('Trans', transSchema);
module.exports = transSchema;