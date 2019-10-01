require('dotenv').config();
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const app = require('express')();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const splitter = require('sentence-splitter');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongod server'))
    .catch(e => console.error(e));

var connection = mongoose.createConnection(process.env.MONGO_URI);

autoIncrement.initialize(connection);
const Project = require('../models/project');
const Sentence = mongoose.model('Sentence',require('../models/sentence'));
var transSchema = require('../models/trans');
transSchema.plugin(autoIncrement.plugin, {
    model: 'Trans',
    field: 'idx',
    startAt: 0,
    increment: 1
});

var Trans = connection.model('Trans', transSchema);
//const Trans mongoose.model('Trans', transSchema);
//const Trans = mongoose.model('Trans', require('../models/trans'));


// 번역 등록하기 [ProjId, SentenceIdx]
// 블록체인 트랜잭션 주기

// 프로젝트 정보 등록하기 [동작 가능] [문작작업량 작업 필요]
router.post('/', function(req, res, next){
    var title = req.body.title;
    var description = req.body.description;
    var language = req.body.language;
    var tags = req.body.tags;
    var user = req.body.user;
    var end = req.body.end;
    var reward = req.body.reward;
    var all = req.body.all;
        
    var tag = [];
    
    for(var i=0; i<tags.length; i++) {
        tag.push(tags[i]);
    }
    
    var proj = new Project();
    proj.title = title;
    proj.description = description;
    proj.language = language;
    proj.tags = tag;
    proj.user = user;
    proj.end =  end;
    proj.reward = reward;
    proj.all = all;
    
    let sentences = splitter.split(all);
    
    var totalBytes = 0;
    for(var i=0; i<sentences.length; i++) {
        if(i%2 == 1) continue;
        totalBytes += (function(s,b,j,c) {
            for(b=j=0; c=s.charCodeAt(j++); b+=c>>11?3:c>>7?2:1);
            return b;
        })(sentences[i].raw);
    }
    
    var sentenceArray = [];
    for(var i=0; i<sentences.length; i++) {
        if(i%2 == 1) continue;
        var sentence = new Sentence();
        var sentenceBytes = (function(s,b,j,c) {
            for(b=j=0; c=s.charCodeAt(j++); b+=c>>11?3:c>>7?2:1);
            return b;
        })(sentences[i].raw);
        
        var ratio = sentenceBytes / totalBytes;
        
        var trans = new Trans();
        trans.text = 'It is a test text.';
        
        sentence.raw_text = sentences[i].raw;
        sentence.ratio = ratio;
        sentence.trans.push(trans);
        sentenceArray.push(sentence);
    }
    proj.sentence = sentenceArray;
    
    proj.save(function(err) {
        if(err) {
            console.error(err);
            res.send({result:0});
            return;
        }
        res.send({result:1});
    });
});


// 프로젝트 정보 가져오기 by project_id
router.get('/', function(req, res, next){
    Project.find({}, {"_id": false, "title": true, "start": true, "end": true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
            //res.render('index', { title: 'Express' });
        }
    });
});

// 프로젝트 정보 가져오기
router.get('/:p_num', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num},{"_id": false, "title": true, "start": true, "end": true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
        }
    });
});

// 프로젝트의 모든 원문 문장 가져오기
router.get('/:p_num/sentence', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num}, {'_id': false, 'sentence.raw_text': true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
        }
    }); 
});

// 프로젝트의 문장의 번역 데이터 가져오기
router.get('/:p_num/sentence/:s_num', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    Project.findOne({'_id':p_num},{'_id': false, 'sentence.trans.text': true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc.sentence[s_num].trans);
        }
    });
});

// 프로젝트의 문장의 번역의 평가자
router.get('/:p_num/sentence/:s_num/trans/:t_num/user/:userid', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    var t_num = req.params.t_num;
    var userid = req.params.userid;
    
    Project.findOne({'_id':p_num}, {'_id': true, 'sentence.like.user': true, 'sentence.like.trans_id': true}, function(err, doc){
        if(err) { console.log('err'); return; }
        else {
            var data = doc.sentence[s_num].like;
            //console.log(data);
            var length = Object.keys(data).length;
            var flag = false;
            var num = -1;
            for(var i=0; i<length; i++) {
                if(userid === data[i].user) {
                    // trans_id 변경
                    doc.sentence[s_num].like[i].trans_id = t_num;
                    doc.save(function(err){
                        if(err) { console.log(err); res.status(500).send('update error'); }
                        else { res.status(200).send("Updated");}
                    });
                    flag = true;
                    num = i;
                    break;
                }
            }
            
            if(flag === false) {
                doc.sentence[s_num].like.push({user: userid, trans_id: t_num});
                doc.save(function(err){
                    if(err) { console.log(err); res.status(500).send('update error'); }
                    else { res.status(200).send("Updated");}
                });
            }
            //console.log(length);
            //res.send();
        }
    });
});

module.exports = router;


/*
router.post('/insert', function(req, res, next) {
    var userid = req.body.userid;
    var sex = req.body.sex;
    var city = req.body.city;
    
    var user = new User({'userid':userid, 'sex':sex, 'city.name':city});
    user.save(function(err,silence){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
        res.status(200).send("Inserted");
    });
});

router.get('/list', function(req, res, next) {
    User.find({}, function(err, docs){
        if(err) console.log('err');
        res.send(docs);
    }); 
});

router.get('/get', function(req, res, next){
    var userid = req.query.userid;
    User.findOne({'_id':userid}, function(err, doc){
        if(err) console.log('err');
        res.send(doc);
    });
});
*/
/*
router.get('/list', function(req, res, next) {
    Project.find({}, function(err, docs){
        if(err) console.log('err');
        else {
            console.log(Project.title);
        }
    });
    res.render('index', { title: 'Express' });
});
*/



