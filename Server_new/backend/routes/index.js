require('dotenv').config();
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const app = require('express')();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const mongoose = require('mongoose');
const splitter = require('sentence-splitter');
const cron = require('node-cron');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

//console.log(moment().format('YYYY'));
//console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

const Klaytn = require('../blockchain/contract');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongod server'))
    .catch(e => console.error(e));

const Project = require('../models/project');
const Sentence = mongoose.model('Sentence',require('../models/sentence'));
const Trans = mongoose.model('Trans', require('../models/trans'));

const myKlaytn = Klaytn();

async function deadline(doc) {
    
    var trans = new Array();
    var eval = new Array();
    
    for(var j=0; j<doc.sentence.length; j++) {
        var content = new Array();

        // 특정문장 평가점수 계산
        for(var k=0; k<doc.sentence[j].like.length; k++) {

            var tmp = doc.sentence[j].like[k].trans_id;
            var user = doc.sentence[j].like[k].user;
            var flag = false;
            var trust;

            for(var l=0; l<content.length; l++) {
                if(content[l].trans == tmp) {
                    trust = await myKlaytn.getTrust('kss');
                    trust = level(parseInt(trust));
                    content[l].score += 1 * trust;
                    content[l].eval.push(user);
                    flag = true;
                    break;
                }
            }
            if(flag == false) {
                var src = new Object;
                src['trans'] = tmp;
                trust = await myKlaytn.getTrust('kss');
                trust = level(parseInt(trust));
                src['score'] = 1 * trust; // 1*신뢰도
                src['eval'] = new Array;
                src['eval'].push(user);
                content.push(src);
            }       
        }
        console.log('CONTENT');
        console.log(content);

        // 최종문장 찾기
        var final = -1; // 뽑힌사람의 번역 문장
        var finalIdx = -1;
        var max = -1;
        for(var k=0; k<content.length; k++) {
            if(max < content[k].score) {
                max = content[k].score;
                final = content[k].trans;
                finalIdx = k;
            }
        }

        //console.log('final : ' + final);
        //console.log('finalIdx : ' + finalIdx);

        // 최종문장 번역자 찾기 && 최종문장 등록
        var trans_user;
        for(var k=0; k<doc.sentence[j].trans.length; k++) {
            if(doc.sentence[j].trans[k].idx == final) {
                trans_user = doc.sentence[j].trans[k].user;
                doc.sentence[j].trans_text = doc.sentence[j].trans[k].text;
                //console.log(j+'번문장 번역자 : '+trans_user);
                break;
            }
        }

        // 번역활동기록
        var sflag = false;
        for(var k=0; k<trans.length; ++k) {
            if(trans[k].name === trans_user) {
                trans[k].sIdx.push(j);
                trans[k].tIdx.push(final);
                sflag = true;
                break;
            }
        }
        if(sflag === false) {
            var obj = new Object();
            trans.push(obj);
            var idx = trans.length-1;
            trans[idx].name = trans_user;
            trans[idx].sIdx = new Array();
            trans[idx].sIdx.push(j);
            trans[idx].tIdx = new Array();
            trans[idx].tIdx.push(final);
        }

        // 평가활동기록
        var eflag = false;
        if(finalIdx !== -1) {
            for(var k=0; k<content[finalIdx].eval.length; ++k) {
                var eflag = false;
                for(var l=0; l<eval.length; ++l) {
                    if(eval[l].name === content[finalIdx].eval[k]) {
                        eval[l].sIdx.push(j);
                        eval[l].tIdx.push(final);
                        eflag = true;
                        break;
                    }
                }
                if(eflag === false) {
                    var obj = new Object();
                    eval.push(obj);
                    var idx = eval.length-1;
                    eval[idx].name = content[finalIdx].eval[k];
                    eval[idx].sIdx = new Array();
                    eval[idx].sIdx.push(j);
                    eval[idx].tIdx = new Array();
                    eval[idx].tIdx.push(final);
                }         
            }
        }
    } 
    console.log('TRANS');
    console.log(trans);
    console.log('EVAL');
    console.log(eval);
    
    // 최종문장 번역자 신뢰도 올리기 trans_user
    /*
    for(var k=0; k<trans.length; k++) {
        
    }
    */
    
    var balance = await myKlaytn.getBalance('kss');
    console.log('kss의 토큰 : ' + balance);
    
    
    // 최종문장 평가자 신뢰도 올리기 Content Object

    // 최종문장 번역자 보상금 지급 [보상금 * 0.8 * 문장지분]
    // 최종문장 평가자 보상금 지급 [보상금 * 0.1 / 평가자수]

    // 블록체인에 내용기록하기 []
    
}


// 익일 마다 검사 [테스트 코드 10초마다]
cron.schedule('*/10 * * * * *', () => {
    Project.find({}, {'_id':true, 'end':true}, function(err, doc2) {
    if(err) console.log('err');
        else {
            var year = moment().format('YYYY');
            var month = moment().format('MM');
            var day = moment().format('DD');
            
            console.log('now : '+year+'-'+month+'-'+day);
            
            for(var i=0; i<doc2.length; i++) {
                var dd = doc2[i].end;
                var y = dd.getFullYear();
                var m = dd.getMonth()+1;
                var d = dd.getDate();
                
                if(year == y && month == m && day == d) {
                    
                    console.log(y+'-'+m+'-'+d);
                    
                    var _id = doc2[i]._id;
                    var trans = new Array();
                    var eval = new Array();
                    
                    Project.findOne({'_id': _id}, function(err, doc) {
                        
                        deadline(doc);
                        
                        
                        // 최종문장 평가자 신뢰도 올리기 Content Object
                        // 최종문장 번역자 신뢰도 올리기 trans_user
                            
                        // 최종문장 번역자 보상금 지급 [보상금 * 0.8 * 문장지분]
                        // 최종문장 평가자 보상금 지급 [보상금 * 0.1 / 평가자수]
                        
                        // 블록체인에 내용기록하기 []
                        
                        
                        // 번역 마감 표시
                        doc.valid = 1;
                        doc.save(function(err){
                            if(err) { console.log(err); }
                            else { console.log('updated.') }
                        });
                        

                    });
                }
            }
            //console.log(cnt);
            //console.log(doc);
        }
    });
    //console.log('running a task every two seconds');
});


// 프로젝트 정보 등록하기
router.post('/', function(req, res, next){
    var title = req.body.title;
    var description = req.body.description;
    var language = req.body.language;
    var tags = req.body.tags;
    var user = req.body.user;
    var end = req.body.end;
    var reward = req.body.reward;
    var icon = req.body.icon;
    var color = req.body.color;
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
    proj.icon = icon;
    proj.color = color;
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
        //sentence.idx = i/2;
        sentence.raw_text = sentences[i].raw;
        sentence.ratio = ratio;
        sentenceArray.push(sentence);
    }
    proj.sentence = sentenceArray;
    
    proj.save(function(err, project) {
        if(err) {
            console.error(err);
            res.send({result:0});
            return;
        }
        var _id = project._id;
        res.send(_id);
        //res.send({result:1});
    });
});

// 프로젝트 등록시 대납서명 요청


router.post('/sign', function(req, res, next) { 
    const senderRawTransaction = req.params.rawTransaction;
    
    var ret = myKlaytn.payProxy(senderRawTransaction);
    res.send(ret);
});


// 프로젝트 문장 번역 등록하기 [프로젝트 아이디, 문장 번호, 유저계정]
router.post('/trans', function(req, res, next){
    
    var p_num = req.body.p_num;
    var s_num = req.body.s_num;
    var trans_text = req.body.trans_text;
    var userId = req.body.userId;
    
    Project.findOne({'_id':p_num}, function(err, doc) {
        if(err) { console.log('err'); return; }
        else {
            var trans = new Trans();
            trans.idx = doc.sentence[s_num].trans.length;
            trans.text = trans_text;
            trans.user = userId;
            doc.sentence[s_num].trans.push(trans);
            doc.save(function(err){
                if(err) { console.log(err); res.status(500).send('update error'); }
                else { res.status(200).send("Updated");}
            });
        }
    });
});


// 전체 프로젝트 정보 가져오기
router.get('/', function(req, res, next){
    Project.find({}, {'_id': false, 'title': true, 'start': true, 'end': true, 'icon': true, 'color': true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
            //res.render('index', { title: 'Express' });
        }
    });
});

// 특정 프로젝트 정보 가져오기
router.get('/:p_num', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num},{'_id': false, 'title': true, 'start': true, 'end': true, 'icon': true, 'color': true}, function(err, doc){
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

// 프로젝트 문장의 번역 데이터 가져오기
router.get('/:p_num/sentence/:s_num/trans', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    Project.findOne({'_id':p_num},{'_id': false, 'sentence.trans.text': true, 'sentence.trans.idx': true}, function(err, doc){
        if(err) console.log('err');
        else {
            //res.send(doc.sentence[s_num].trans);
            //res.send(doc.sentence[s_num]);
            var array = [];
            var trans_array = [];
            var len = doc.sentence[s_num].trans.length;
            for(var i=0; i<len; i++) {
                var data = { idx: i, text: doc.sentence[s_num].trans[i].text};
                array.push(data);
            }
            shuffle(array);
            res.send(array);
        }
    });
});

// 프로젝트 문장의 자신의 번역 인덱스 찾기
router.get('/:p_num/sentence/:s_num/user/:userId', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    var userId = req.params.userId;
    
    Project.findOne({'_id':p_num},function(err, doc){
        if(err) { console.log('err'); return; }
        else {
            var len = doc.sentence[s_num].like.length;
            console.log(len);
            var flag = false;
            var result = -1;
            for(var i=0; i<len; i++) {
                if(doc.sentence[s_num].like[i].user == userId) {
                    result = doc.sentence[s_num].like[i].trans_id;
                    flag = true;
                    break;
                }
            }
            if(flag == false) { res.send((result).toString()) }
            else { res.send((result).toString()); }
        }
    });
});

// 프로젝트의 문장의 번역의 평가자 -> PUT
// 평가버튼을 눌렀을때 실행
router.get('/:p_num/sentence/:s_num/trans/:t_num/user/:userId', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    var t_num = req.params.t_num;
    var userId = req.params.userId;
    
    Project.findOne({'_id':p_num}, {'_id': true, 'sentence.like.user': true, 'sentence.like.trans_id': true}, function(err, doc){
        if(err) { console.log('err'); return; }
        else {
            var data = doc.sentence[s_num].like;
            //console.log(data);
            var length = Object.keys(data).length;
            var flag = false;
            var num = -1;
            for(var i=0; i<length; i++) {
                if(userId === data[i].user) {
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
                doc.sentence[s_num].like.push({user: userId, trans_id: t_num});
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

// 검색어 조회
router.get('/keyword/:key', function(req, res, next) {
    
    Project.find({}, {'title': true, 'description': true, 'icon': true, 'color': true}, function(err, doc) {
        if(err) { console.log('err'); return; }
        else {
            var array = [];
            for(var i = 0; i < doc.length; i++) {
                var title = doc[i].title;
                
                if(title.match(req.params.key) !== null) {
                    var data = { _id: doc[i]._id, title: doc[i].title, description: doc[i].description, icon: doc[i].icon, color: doc[i].color }
                    array.push(data);      
                }
            }
            if(array.length === 0) res.send(false);
            else res.send(array);
        }
    });
});

// 프로젝트가 마감유효성 조회
router.get('/:p_num/deadline', function(req, res, next) {
    Project.findOne({'_id': req.params.p_num},{'valid': true}, function(err, doc) {
        if(err) { console.log('err'); return; }
        else {
            
            if(doc.valid === 0) res.send(false);
            else res.send(true);
        }
    });
});

// 특정유저가 등록한 프로젝트ObjectId 조회
router.get('/user/:userId', function(req, res, next) {
    Project.find({'user': req.params.userId}, {'title': true, 'description': true, 'icon': true, 'color': true}, function(err, doc) {
        if(err) { console.log('err'); return; }
        else {
            var array = [];
            for(var i = 0; i < doc.length; i++) {
                var title = doc[i].title;
                
                if(title.match(req.params.key) !== null) {
                    var data = { _id: doc[i]._id, title: doc[i].title, description: doc[i].description, icon: doc[i].icon, color: doc[i].color }
                    array.push(data);      
                }
            }
            if(array.length === 0) res.send(false);
            else res.send(array);
        }
    });
})

function shuffle(d) {
    for(var c = d.length-1; c>0; c--) {
        var b = Math.floor(Math.random()*(c+1));
        var a = d[c]; d[c] = d[b]; d[b] = a;
    }
    return d;
};

function level(d) {
    var ret;
    
    if(d > 900 && d <= 1000) ret = 1.0;
    else if(d > 800 && d <= 900 ) ret = 0.9;
    else if(d > 700 && d <= 800 ) ret = 0.8;
    else if(d > 600 && d <= 700 ) ret = 0.7;
    else if(d > 500 && d <= 600 ) ret = 0.6;
    else if(d > 400 && d <= 500 ) ret = 0.5;
    else if(d > 300 && d <= 400 ) ret = 0.4;
    else if(d > 200 && d <= 300 ) ret = 0.3;
    else if(d > 100 && d <= 200 ) ret = 0.2;
    else if(d > 0 && d <= 100 ) ret = 0.1;
    else ret = 1.0;
    
    return ret;
}

module.exports = router;



