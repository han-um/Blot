const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    //idx: { type: Number },
    user: { type: String },
    trans_id: { type: Number },
});

//module.export = mongoose.model('Like', likeSchema);
module.exports = likeSchema;