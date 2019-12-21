const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    userId: { type: String },
    orgFileName: { type: String },
    secFileName: { type: String },
});

module.exports = mongoose.model('Files', filesSchema, 'Files');
