const mongoose = require('mongoose');
const Sentence = require('./sentence');

/*
const transSchema = new mongoose.Schema({
    //idx: { type: Number },
    text: { type: String },
    user: { type: String },
    //liker: [{ type: String }],
});

const likeSchema = new mongoose.Schema({
    //idx: { type: Number },
    user: { type: String },
    trans_id: { type: String },
});

const sentenceSchema = new mongoose.Schema({
    //idx: { type: Number },
    raw_text: { type: String },
    google_text: String,
    ratio: { type: Number },
    trans: [transSchema],
    like: [likeSchema],
});
*/

const projectSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    language: { type: String },
    tags: [{ type: String }],
    user: { type: String },
    start: { type: Date, default: Date.now },
    end: { type: Date },
    reward: { type: Number},
    icon: { type: String },
    valid: { type: Number, default: 1},
    all: { type: String },
    //sentence: [sentenceSchema],
    sentence: [ Sentence ],
});

module.exports = mongoose.model('Project', projectSchema, 'Project');
