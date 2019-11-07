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

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongod server'))
    .catch(e => console.error(e));

const Project = require('../models/project');
const Sentence = mongoose.model('Sentence',require('../models/sentence'));
const Trans = mongoose.model('Trans', require('../models/trans'));

const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(process.env.MYSQL_URI);

sequelize
    .authenticate()
    .then(() => console.log('Connected to mysqld server'))
    .catch(e => console.error(e));

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('../models/user')(sequelize, Sequelize);
db.Library = require('../models/library')(sequelize, Sequelize);

db.User.hasMany(db.Library);
db.Library.belongsTo(db.User);

const Klaytn = require('../blockchain/contract');
const myKlaytn = Klaytn();


async function deadline(doc) {
    
    var trans = new Array();
    var eval = new Array();
    var eval_cnt = new Array();
    
    // 전체 문장 접근
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
                    trust = await myKlaytn.getTrust('nkw'); // user로 변경
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
                trust = await myKlaytn.getTrust('nkw'); // user로 벼녕
                //trust = 1000;
                trust = level(parseInt(trust));
                src['score'] = 1 * trust;
                src['eval'] = new Array;
                src['eval'].push(user);
                content.push(src);
            }       
        }
        
        if(content.length == 0) {
            eval_cnt.push(0);   
            continue;
        }
        
        console.log('CONTENT');
        console.log(content);

        // 최종 번역문장 인덱스 찾기
        var final = -1; // 최종 번역문장 인덱스
        var finalIdx = -1; // 최종 번역문장 저장되어있는 인덱스
        var max = -1;
        for(var k=0; k<content.length; k++) {
            if(max < content[k].score) {
                max = content[k].score;
                final = content[k].trans;
                finalIdx = k;
            } else if (max == content[k].score) {
                if(content[finalIdx].eval.length < content[k].eval.length ) {
                    final = content[k].trans;
                    finalIdx = k;
                }
            }
        }
        
        // 최종 번역문장 평가자 수
        if(content.length != 0) { eval_cnt.push(content[finalIdx].eval.length); }
        
        //console.log('final : ' + final);
        //console.log('finalIdx : ' + finalIdx);

        // 최종문장 번역자 찾기 && 최종문장 등록
        var trans_user;
        for(var k=0; k<doc.sentence[j].trans.length; k++) {
            if(doc.sentence[j].trans[k].idx == final) {
                trans_user = doc.sentence[j].trans[k].user;
                doc.sentence[j].trans_text = doc.sentence[j].trans[k].text;
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
    
    
    // 프로젝트 아이디 세팅 pId
    var pId = new String();
    var pRaw = JSON.stringify(doc._id);
    for(var i = 1; i < pRaw.length-1; i++) pId += pRaw[i];
    
    // 프로젝트 등록자 세팅 pUser
    var obj = await myKlaytn.getProjectInfo(pId);
    var obj2 = JSON.parse(JSON.stringify(obj));
    var pUser = obj2['0'];
    
    // 보상금 세팅
    var reward = await myKlaytn.getReward(pId);
    reward = Number(reward);
    var useTransReward = 0;
    var useEvalReward = 0;
    
    // 번역 기록
    for(var i = 0; i < trans.length; i++) {
        
        //var translatorId = trans[i].name; // 임의값
        var translatorId = 'nkw';
        
        //var trust = await myKlaytn.getTrust(translatorId);
        //if(trust + 8 > 1000) await myKlaytn.setTrust(translatorId, 1000-trust);
        //else await myKlaytn.setTrust(translatorId, 8);
        
        var sentenceList = trans[i].sIdx;
        var translationList = trans[i].tIdx;
        
        var share = 0;
        for(var j = 0; j < trans[i].sIdx.length; j++) {
            //share += parseInt(doc.sentence[trans[i].sIdx[j]].ratio);
            share += doc.sentence[trans[i].sIdx[j]].ratio;
        }
        
        share = reward * 0.8 * (share / 100);
        useTransReward += share
        share = parseInt(share);
        
        //await myKlaytn.setTranslation(projId, translatorId, sentenceList, translationList, share);
        //var wAddr = await myKlaytn.getWalletAddress(translatorId);
        //await myKlaytn.Transfer(wAddr, share);
    }
    
    console.log(eval_cnt);
    
    // 평가 기록
    for(var i = 0; i < eval.length; i++) {
        
        //var evaluatorId = eval[i].name;
        var evaluatorId = 'nkw';
        
        //var trust = await myKlaytn.getTrust(evaluatorId);
        //if(trust != 1000) await myKlaytn.setTrust(evaluatorId, 1);
        
        var sentenceList = eval[i].sIdx;
        var translationList = eval[i].tIdx;
        
        var share = 0;
        for(var j = 0; j < eval[i].sIdx.length; j++) {
            share += doc.sentence[eval[i].sIdx[j]].ratio / eval_cnt[eval[i].sIdx[j]];
        }
        
        share = reward * 0.1 * (share / 100);
        useEvalReward += share;
        share = parseInt(share);
        
        //await myKlaytn.setEvaluation(projId, evaluatorId, sentenceList, translationList, share);
        //var wAddr = await myKlaytn.getWalletAddress(evaluatorId);
        //await myKlaytn.Transfer(wAddr, share);
    }
    
    
    var pWADDR = await myKlaytn.getWalletAddress(pId);
    // 잔여금 등록자에게 반환
    // [번역 잔여금]
    if((reward * 0.8) - useTransReward > 0)
        // await myKlaytn.Transfer(pWADDR, parseInt((reward*0.8)-useTransReward));
    // [평가 잔여금]
    if((reward * 0.1) - useEvalReward > 0)
        // await myKlaytn.Transfer(pWADDR, parseInt((reward*0.8)-useEvalReward))
    // 잉여금 송금
    //await myKlaytn.chargeFeePayerBalance();
    
    
    // 마감 저장
    doc.valid = 1;
    doc.save(function(err){
        if(err) { console.log(err); }
        else { console.log('updated.') }
    });
}


// 익일 마다 검사 [테스트 코드 10초마다]
async function finish() {
        cron.schedule(' */10 * * * *', () => {
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

                        Project.findOne({'_id': _id}, async function(err, doc) {
                            await deadline(doc);
                        });
                    }
                }
            }
        });
    });
} 
finish();

// 수동 마감
router.get('/manual', function(req, res, next) {
    Project.find({}, {'_id':true, 'end':true}, function(err, doc) {
        if(err) console.log('err');
        else {
            var year = moment().format('YYYY');
            var month = moment().format('MM');
            var day = moment().format('DD');

            console.log('now : '+year+'-'+month+'-'+day);

            for(var i=0; i<doc.length; i++) {
                var dd = doc[i].end;
                var y = dd.getFullYear();
                var m = dd.getMonth()+1;
                var d = dd.getDate();

                if(year == y && month == m && day == d) {

                    console.log(y+'-'+m+'-'+d);

                    var _id = doc[i]._id;
                    var trans = new Array();
                    var eval = new Array();

                    Project.findOne({'_id': _id}, async function(err, doc) {
                        await deadline(doc);
                    });
                }
            }
        }
    });
})


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
    var image = req.body.image;
        
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
    proj.image = image;
    
    let sentences = splitter.split(all);
    
    var totalBytes = 0;
    for(var i=0; i<sentences.length; i++) {
        if(i%2 == 1) continue;
        totalBytes += (function(s,b,j,c) {
            for(b=j=0; c=s.charCodeAt(j++); b+=c>>11?3:c>>7?2:1);
            return b;
        })(sentences[i].raw);
    }
    
    proj.bytes = totalBytes.toFixed(1);
    
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
        sentence.ratio = ratio.toFixed(2);
        sentenceArray.push(sentence);
    }
    proj.sentence = sentenceArray;
    
    proj.save(async function(err, project) {
        if(err) {
            console.error(err);
            res.send({result:0});
            return;
        }
        var _id = project._id;
        _id = JSON.parse(JSON.stringify(_id));

        //console.log(_id);
        //console.log(typeof(_id));
        //await myKlaytn.createProject(_id, user, end, reward);
        res.send(_id);
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

// 프로젝트 등록시 대납서명 요청
router.post('/sign', async function(req, res, next) {
    const rawTransaction = req.body.rawTransaction;
    try {
        // transcation 대납 서명 후 블록체인에 보내기
        var result = await myKlaytn.payProxy(rawTransaction);
        // transaction 관련 모든 정보 반환해주기
        res.send(result);
    } catch(err) {
        res.status(500).send('Can\'t register transaction' + err);
    }
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

// 모든 태그리스트 가져오기
router.get('/tags', function(req, res, next){
    Project.find({}, {'_id': false, 'tags': true}, function(err, doc){
        
        var array = [];
        
        if(err) console.log('err');
        else {
            for(var i = 0; i < doc.length; i++) {
                for(var j = 0; j < doc[i].tags.length; j++) {
                    var flag = false;
                    for(var k = 0; k < array.length; k++) {
                        if(array[k] == doc[i].tags[j]) {
                            flag = true;
                            break;
                        }
                    }
                    if(flag == false) array.push(doc[i].tags[j]);
                }
            }
            if(array.length == 0) res.send(false);
            else res.send(array);
        }
    });
});

// 태그 포함하는 프로젝트 ObjectId 조회
router.get('/tags/:tag', function(req, res, next) {
    Project.find({}, {'tags' : { $elemMatch : {$in : [req.params.tag]} }}, function(err, doc){
        var array = [];
        if(err) console.log('err');
        else {
            for(var i = 0; i < doc.length; i++) {
                if(doc[i].tags.length != 0) {
                    array.push(doc[i]._id);
                }
            }
            if(array.length == 0) res.send(false);
            else res.send(array);
        }
    });
});


// 특정 프로젝트 정보 가져오기
router.get('/:p_num', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num},{'_id': false, 'title': true, 'start': true, 'end': true, 'icon': true, 'color': true, 'image': true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
        }
    });
});

// 현재 진행상황 요약
router.get('/:p_num/summary', function(req, res, next){
    
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num}, function(err, doc) {
        if(err) { console.log(err); return; }
        
        var transCnt = 0;
        for(var i = 0; i < doc.sentence.length; i++) {
            if(doc.sentence[i].trans.length != 0)
                transCnt += 1;
        }
        
        // 번역 진척도
        var transPer = transCnt / doc.sentence.length;
        transPer = transPer * 100;
        transPer = transPer.toFixed(1);
        
        // 번역 참여인원
        var translator = [];
        var transCnt = 0;
        for(var i = 0; i< doc.sentence.length; i++) {
            
            var flag = false;
            for(var j = 0; j< doc.sentence[i].trans.length; j++) {
                var flag = false;
                for(var k = 0; k < translator.length; k++){
                    if(translator[k] == doc.sentence[i].trans[j].user) {
                        flag = true;
                        break;
                    }
                }
                if(flag == false) translator.push(doc.sentence[i].trans[j].user);
            }
        }
        transCnt = translator.length;
        
        // 원본 분량
        var totalBytes = doc.bytes * 0.000977;
        var kBytes = (totalBytes * 100).toFixed(1);
        
        // 좋아요 수
        var like = 0;
        db.Library.findAndCountAll({
            where: {projId : p_num }
        }).then(result => {
            like = result.count;
            
            var data = {transPer : transPer, transCnt : transCnt, kb : kBytes, like : like };
            res.send(data);
        }).catch(err => {
            console.error(err);
        });        
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

// 특정유저가 등록한 프로젝트ObjectId, 제목, 요약, 아이콘, 색상 조회
router.get('/user/:userId', function(req, res, next) {
    Project.find({'user': req.params.userId}, {'title': true, 'description': true, 'icon': true, 'color': true, 'image': true}, function(err, doc) {
        if(err) { console.log('err'); return; }
        else {
            var array = [];
            for(var i = 0; i < doc.length; i++) {
                 var data = { _id: doc[i]._id, title: doc[i].title, description: doc[i].description, icon: doc[i].icon, color: doc[i].color, image: doc[i].image };
                array.push(data);
            }
            if(array.length === 0) res.send(false);
            else res.send(array);
        }
    });
})

// 프로젝트 번역 마감시 번역정보 정리
router.get('/:p_num/deadline/trans', async function(req, res, next) {
    var projectId = req.params.p_num;
    var result = await myKlaytn.getTranslationLog();
    var reward = await myKlaytn.getReward(projectId);
    reward = reward * 0.8;
    
    var array = [];
    
    for(var i = 0; i < result.length; i++) {
        
        var obj = JSON.parse(JSON.stringify(result[i]));
        if(projectId == obj.returnValues['2']) {
            var transId = obj.returnValues['3'];
            var share = obj.returnValues['6'];
            var blot = share;
            share /= reward;
            share *= 100;
            share = parseInt(share);
            
            var data = {transId : transId, percentage : share, blot : blot };
            array.push(data);
        }
    }
    if(array.length == 0) res.send(false);
    else res.send(array);
});

// 프로젝트 번역 마감시 평가정보 정리
router.get('/:p_num/deadline/eval', async function(req, res, next) {
    var projectId = req.params.p_num;
    var result = await myKlaytn.getEvaluationLog();
    var reward = await myKlaytn.getReward(projectId);
    reward = reward * 0.1;
    
    var array = [];
    
    for(var i = 0; i < result.length; i++) {
        var obj = JSON.parse(JSON.stringify(result[i]));
        if(projectId == obj.returnValues['2']) {
            var evalId = obj.returnValues['3'];
            var share = obj.returnValues['6'];
            var blot = share;
            share /= reward;
            share *= 100;
            share = parseInt(share);
            
            var data = {evalId : evalId, percentage : share, blot : blot};
            array.push(data);
        }
    }
    if(array.length == 0) res.send(false);
    else res.send(array);
});

// 프로젝트의 참여자 신뢰도 이력 로그
router.get('/:p_num/trust', async function(req, res, next) {
    
    var result = await myKlaytn.getReliabilityLog();
    
    
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


//============================================================================
// 예외 처리 방법
// 1. 컨트랙트 함수를 호출 구문을 try, catch 구문으로 감싼다.
// 2. catch 구문에는 잘못된 실행, 없는 데이터를 불러오라 했을 때 실행되므로
//    이 예외가 발생하면 무슨 조치를 취할지 적어줌


// // 예제 1) 단순히 블록체인 상의 데이터를 읽어오는 함수의 경우
// async function testGetTrust(userId) {
//     var userTrust; 
//     try {
//         userTrust = await myKlaytn.getTrust(userId);
//         console.log(userId+'의 신뢰도 : '+userTrust);
//     } catch(err) {
//         // 에러 이유
//         console.log(userId+'로 조회되는 신뢰 점수가 없습니다.');
//         // 에러 메세지 출력
//         console.log(err);
//     }
// }

// testGetTrust('kss');


// // 예제 2) 블록체인 상의 데이터를 변경하는 경우
// //         Transaction Hash 값을 얻어와 트랜잭션 결과를 확인할 수 있는 홈페이지 링크를 클라이언트에게 돌려줌
// async function testSetTrust(userId, value) {
//     var result; 
//     try {
//         result = await myKlaytn.setTrust(userId, value);
//         console.log('result : '+result.transactionHash);
//     } catch(err) {
//         // 에러 이유
//         console.log(userId+'의 신뢰 점수를 수정할 수 없습니다.');
//         // 에러 메세지 출력
//         console.log(err);
//     }
// }

// testSetTrust('kss', 10);

// // 예제 3) 블록체인 상의 이벤트 로그를 조회하는 경우(블록체인 상의 데이터를 조회하는 것임)
// async function testGetTranslationLog() {
//     var result; 
//     try {
//         result = await myKlaytn.getTranslationLog();
//         for(var i=0; i<result.length; i++) {
//             console.log('project Id:'+JSON.stringify(result[i].returnValues.projectId));
//             console.log('translator Id:'+JSON.stringify(result[i].returnValues.translatorId));
//             console.log('sentenceId List:'+JSON.stringify(result[i].returnValues.sentenceIdList));
//             console.log('translationId List:'+JSON.stringify(result[i].returnValues.translationIdList));
//             console.log('user Share:'+JSON.stringify(result[i].returnValues.userShare));
//         }
//     } catch(err) {
//         // 에러 이유
//         console.log('번역 기록을 가져오는 데 실패하였습니다.');
//         // 에러 메세지 출력
//         console.log(err);
//     }
// }

//testGetTranslationLog();
//============================================================================
