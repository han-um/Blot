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

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongod server'))
    .catch(e => console.error(e));

const Project = require('../models/project');
const Sentence = mongoose.model('Sentence',require('../models/sentence'));
const Trans = mongoose.model('Trans', require('../models/trans'));

// mysql connection을 따로 둠
const db = require('../setting/mysqlConnection');

// const Sequelize = require('sequelize');
// const db = {};

// express와 mysql 연결
// const sequelize = new Sequelize(process.env.MYSQL_URI);
// sequelize
//     .authenticate()
//     .then(() => console.log('Connected to mysqld server'))
//     .catch(e => console.error(e));

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Mysql 모델과 sequelize 연결
// db.User = require('../models/user')(sequelize, Sequelize);
// db.Library = require('../models/library')(sequelize, Sequelize);

// // User와 Library는 1:N 관계
// db.User.hasMany(db.Library);
// db.Library.belongsTo(db.User);

const Klaytn = require('../blockchain/contract');
const myKlaytn = Klaytn();

// 마감 로직
async function deadline(doc) {
    
    var trans = new Array();    // 번역 기록 : 누가, 어떤 원문 문장을, 몇번째로 번역했는가
    var eval = new Array();     // 평가 기록 : 누가, 어떤 원문 문장에 대한 몇번째 번역 문장을 평가했는가
    var eval_cnt = new Array(); // 하나의 최종 번역문장을 평가한 사람 수
    
    // 전체 문장 접근
    for(var j=0; j<doc.sentence.length; j++) {
        
        // STEP 1. 최종 번역 문장을 선정하기 위해 번역 문장별 평가 점수를 산출

        // 번역 문장 번호, 받은 평가 점수, 평가한 사람 리스트 저장
        var content = new Array();

        // 특정문장 평가점수 계산
        for(var k=0; k<doc.sentence[j].like.length; k++) {
            var transId = doc.sentence[j].like[k].trans_id; // 좋다고 평가한 번역 문장 id
            var user = doc.sentence[j].like[k].user;
            var flag = false;
            var trust;

            for(var l=0; l<content.length; l++) {

                // 동일한 번역 문장을 2명 이상 좋다고 평가한 경우
                if(content[l].trans == transId) {
                    try {
                        trust = await myKlaytn.getTrust(user); // @TODO user로 변경
                        trust = level(parseInt(trust));
                        content[l].score += 1 * trust;
                        content[l].eval.push(user);
                        flag = true;
                        break;
                    } catch(err) {
                        console.log('ERROR: '+'user 신뢰도 가져오기 실패');
                        return;
                    }
                }
            }
            if(flag == false) {
                try {
                    var src = new Object;
                    src['trans'] = transId;
                    trust = await myKlaytn.getTrust(user);
                    trust = level(parseInt(trust));
                    src['score'] = 1 * trust;
                    src['eval'] = new Array;
                    src['eval'].push(user);
                    content.push(src);
                } catch(err) {
                    console.log('ERROR: '+'user 신뢰도 가져오기 실패');
                    return;
                }
            }       
        }
        
        // 아무도 평가를 하지 않았다면
        if(content.length == 0) {
            eval_cnt.push(0);   
            continue;
        }
        
        //console.log('CONTENT');
        //console.log(content);

        // STEP 2. 번역 문장별 평가 점수를 토대로 최종 번역 문장 정하기

        // 최종 번역문장 인덱스 찾기
        var final = -1; // 최종 번역 문장의 실제 인덱스(DB trans 객체의 idx)
        var finalIdx = -1; // 최종 번역문장 저장되어있는 content 배열의 인덱스
        var max = -1;
        for(var k=0; k<content.length; k++) {
            if(max < content[k].score) {
                max = content[k].score;
                final = content[k].trans;
                finalIdx = k;
            } else if (max == content[k].score) {   // 평가 점수가 동일하다면, 더 많은 평가자수를 가진 문장을 채택
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

        // STEP 3. 최종 문장 번역자 찾기 && 최종 번역 문장 메모
        var trans_user;
        for(var k=0; k<doc.sentence[j].trans.length; k++) {
            if(doc.sentence[j].trans[k].idx == final) {
                trans_user = doc.sentence[j].trans[k].user;
                doc.sentence[j].trans_text = doc.sentence[j].trans[k].text;
                break;
            }
        }

        // STEP 4. 최종 번역 문장을 기준으로 번역자와 평가자를 trans, eval 배열에 메모

        // 번역 활동 기록
        var sflag = false;
        for(var k=0; k<trans.length; ++k) {
            // 다른 문장도 번역해서 최종 번역 문장으로 선정된 사람이라면
            if(trans[k].name === trans_user) {
                trans[k].sIdx.push(j);      // j번째 문장을 번역했음 >> 정보 추가
                trans[k].tIdx.push(final);  // fianl번째 번역 문장 >> 정보 추가
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
                    // 다른 문장도 평가해서 최종 번역 문장으로 선정된 사람이라면
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

    // STEP 5. 번역자 및 평가자 신뢰도 조정 및 보상금 분배
    
    // 프로젝트 아이디 세팅 pId
    var pId = new String();
    var pRaw = JSON.stringify(doc._id);
    for(var i = 1; i < pRaw.length-1; i++) pId += pRaw[i];  // TODO : 이게 뭐하는 작업인지 알아볼 것


    // 프로젝트 등록자 및 보상금 세팅
    try {
        var obj = await myKlaytn.getProjectInfo(pId);
        var obj2 = JSON.parse(JSON.stringify(obj));
        var pUser = obj2['0'];  // 번역 프로젝트 등록자

        var reward = obj2['2']; // 번역 프로젝트 총 보상금
        reward = Number(reward);
        var usedTransReward = 0;
        var usedEvalReward = 0;
    } catch(err) {
        console.log('ERROR: '+pId+'의 프로젝트 정보 가져오기 실패');
        return;
    }
        
    // 번역 기록
    for(var i = 0; i < trans.length; i++) {
        var translatorId = trans[i].name;
      
        // 번역자 신뢰도 조정
        var totalTrust = 8*trans[i].sIdx.length;
        try {
            var trust = await myKlaytn.getTrust(translatorId);
            if(2000-trust >= totalTrust){
                await myKlaytn.setTrust(pId, translatorId, totalTrust, 0);
                console.log(translatorId+'에게 문장 번역에 대한 신뢰도 점수'+totalTrust+'점 추가');
            } else if(2000-trust > 0 && 2000-trust < totalTrust) {
                await myKlaytn.setTrust(pId, translatorId, 2000-trust, 0);
                console.log(translatorId+'에게 문장 번역에 대한 신뢰도 점수 '+2000-trust+'점 추가');
            }
        } catch(err) {
            console.log('ERROR : 번역자 '+translatorId+'의 신뢰도 조정 실패');
            return;
        }

        var sentenceList = trans[i].sIdx;
        var translationList = trans[i].tIdx;
        
        // 한 번역자가 번역한 문장들의 총 지분 계산
        var totalShare = 0;
        for(var j = 0; j < trans[i].sIdx.length; j++)
            totalShare += doc.sentence[trans[i].sIdx[j]].ratio;
        
        // 이 번역자에게 지급할 보상금 계산
        console.log('share1 :'+ totalShare);
        userReward = reward * 0.8 * totalShare;
        console.log('보상금 :'+ userReward);
        usedTransReward += parseInt(userReward);
        
        // 번역기록
        await myKlaytn.setTranslation(pId, translatorId, sentenceList, translationList, parseInt(userReward));
        console.log('번역기록 저장', pId, translatorId, sentenceList, translationList, parseInt(userReward));
        var wAddr = await myKlaytn.getWalletAddress(translatorId);

        // 보상금 송금
        await myKlaytn.Transfer(wAddr, parseInt(userReward));
        console.log('번역자 '+ wAddr + '에게 보상금 '+ userReward + ' 송금');
    }
    
    console.log(eval_cnt);
    
    // 평가 기록
    for(var i = 0; i < eval.length; i++) {
        var evaluatorId = eval[i].name;
        
        // 평가자 신뢰도 조정
        var totalTrust = eval[i].sIdx.length;
        try {
            var trust = await myKlaytn.getTrust(evaluatorId);
            if(parseInt(trust)+totalTrust <= 2000) {
                await myKlaytn.setTrust(pId, evaluatorId, totalTrust, 1);
                console.log(evaluatorId+'에게 문장 평가에 대한 신뢰도 점수'+totalTrust+'추가');
            } else if(2000-trust > 0 && 2000-trust < totalTrust) {
                await myKlaytn.setTrust(pId, translatorId, 2000-trust, 0);
                console.log(evaluatorId+'에게 문장 평가에 대한 신뢰도 점수 '+2000-trust+'점 추가');
            }
        } catch(err) {
            console.log('ERROR : 평가자 '+evaluatorId+'의 신뢰도 조정 실패');
            return;
        }
        
        var sentenceList = eval[i].sIdx;
        var translationList = eval[i].tIdx;
        
        // 한 평가자가 평가한 문장들의 총 지분 계산
        var totalShare = 0;
        for(var j = 0; j < eval[i].sIdx.length; j++)
            totalShare += doc.sentence[eval[i].sIdx[j]].ratio / eval_cnt[eval[i].sIdx[j]];
        
        // 이 평가자에게 지급할 보상금 계산
        console.log(evaluatorId);
        console.log('totalShare :'+ totalShare);
        userReward = reward * 0.1 * totalShare;
        console.log('보상금 :'+ userReward);
        usedEvalReward += parseInt(userReward);

        // 평가기록 저장
        try {
            await myKlaytn.setEvaluation(pId, evaluatorId, sentenceList, translationList, parseInt(userReward));
            console.log('평가기록 저장', pId, evaluatorId, sentenceList, translationList, parseInt(userReward));
        } catch(err) {
            console.log('ERROR : 평가기록 정보 저장 실패', pId, evaluatorId, sentenceList, translationList, parseInt(userReward));
            return;
        }

        // 보상금 송금
        try {
            var wAddr = await myKlaytn.getWalletAddress(evaluatorId);
            await myKlaytn.Transfer(wAddr, parseInt(userReward));
            console.log('평가자 '+ wAddr + '에게 보상금 '+ userReward + ' 송금');
        } catch(err) {
            console.log('ERROR : 평가자 '+ wAddr + '에게 보상금 '+ userReward + ' 송금 실패');
            return;
        }
    }
  
    var pWADDR = await myKlaytn.getWalletAddress(doc.user);

    // [번역/평가 잔여금]을 등록자에게 반환
    if((reward * 0.9) - (usedTransReward+usedEvalReward) > 0) {
        await myKlaytn.Transfer(pWADDR, parseInt((reward * 0.9) - (usedTransReward+usedEvalReward)));
        console.log('글 등록자 '+ pWADDR + '에게 보상금 '+ parseInt((reward * 0.9) - (usedTransReward+usedEvalReward)) + ' 송금');
    }
        
    // 마감 저장
    doc.valid = 0;
    doc.save(function(err){
        if(err) { console.log(err); }
        else { console.log('project was successfully finished and it was updated to DB') }
    });    
}

// 익일 마다 검사
async function endDetect() {
    // 0시 0분 1초에 실행
    cron.schedule(' 1 0 0 * * *', async () => {
        Project.find({'valid': 1, 'end':{'$gte' : moment().subtract(1, 'days'), '$lte' : moment().format()}}, async function(err, doc) {
            if(err) console.log('마감 기능 수행 오류(몽고디비 쿼리 실패) : ' + err);
            else {
                for(var i=0; i<doc.length; i++) {
                    console.log('마감대상 프로젝트 ID : '+doc[i]._id);
                    await deadline(doc[i]);
                }
            }
        });

        //잉여금 송금 TODO : 이건 번역 마감할 프로젝트들 모두 처리하고 한번만 실행
        try {
            await myKlaytn.chargeFeePayerBalance();
        } catch(err) {
            console.log('ERROR: 컨트랙트 내 잉여자금을 대납 계정에 송금하기 실패');
        }
    });
} 

// 수동 마감
router.get('/manual/:p_num', function(req, res, next) {
    Project.findOne({'_id': req.params.p_num}, async function(err, doc) {
        if(err) {
            console.log('ERROR'+p_num + '수동 마감 실패');
            res.send(false);
            return;
        } else {
            // 아직 마감을 안한 상태라면
            if(doc.valid==1) {
                try {
                    await deadline(doc);
                    res.send(true);
                } catch(err) {
                    res.send(false);
                }
            } else
                res.send(true);
        }
    });
})

// 프론트엔드 라우팅
router.get('/', function(req, res, next) { res.sendFile(path.join(__dirname, '../public', 'index.html')); });


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
        sentence.raw_text = sentences[i].raw;
        sentence.ratio = ratio.toFixed(3);
        sentenceArray.push(sentence);
    }
    proj.sentence = sentenceArray;
    
    proj.save(async function(err, project) {
        if(err) {
            console.error(err);
            res.send(false);
            return;
        }
        var _id = project._id;
        _id = JSON.parse(JSON.stringify(_id));

        /*
        try {
            await myKlaytn.createProject(_id, user, end, reward);
            console.log('프로젝트 등록');    
        }
        catch(err) {
            console.log(err);
            res.send(false);
            return;
        }*/
        console.log('projectId : '+_id);
        res.send(_id);
    });
});

// 전체 프로젝트 정보 가져오기
router.get('/', function(req, res, next){
    Project.find({}, {'_id': true, 'title': true, 'start': true, 'end': true, 'icon': true, 'color': true, 'description':true, 'image':true}, function(err, doc){
        if(err) console.log('ERROR : get(/)');
        else {
            res.send(doc);
        }
    });
});

// 특정 프로젝트 삭제하기
router.post('/delete', function(req, res, next){
    var p_num = req.body.p_num;
    Project.findOneAndDelete({_id: p_num}, function(err) {
        if(err) {
            console.log('ERROR : /delete');
            res.send(false);
            return;
        } else {
            console.log(p_num+' 프로젝트 삭제 완료');
            res.send(true);
        }
    });
});

// 프로젝트 등록시 대납서명 요청
router.post('/sign', async function(req, res, next) {
    const rawTransaction = req.body.rawTransaction;
    try {
        // transcation 대납 서명 후 블록체인에 보내기
        var result = await myKlaytn.payProxy(rawTransaction);
        console.log(result);
        if(result.status)
            console.log('Approved : Delegated Transaction');

        // transaction 관련 모든 정보 반환해주기
        res.send(result);
    } catch(err) {
        res.status(500).send('Can\'t process delegated transaction');
    }
});


// 프로젝트 문장 번역 등록하기 [프로젝트 아이디, 문장 번호, 유저계정]
router.post('/trans', function(req, res, next){
    
    var p_num = req.body.p_num;
    var s_num = req.body.s_num;
    var trans_text = req.body.trans_text;
    var userId = req.body.userId;
    
    Project.findOne({'_id':p_num}, function(err, doc) {
        if(err) { console.log('ERROR : /trans'); return; }
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
        
        if(err) console.log('ERROR : /tags');
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
        if(err) console.log('ERROR : /tags/:tag');
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
router.get('/projInfo/:p_num', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num},{'_id': true, 'title': true, 'description':true, 'start': true, 'end': true, 'icon': true, 'color': true, 'image': true, valid: true, tags: true}, function(err, doc){
        if(err) console.log('ERROR : projInfo/:p_num'+err);
        else {
            res.send(doc);
        }
    }).catch(err => {
        console.log('ERROR : projInfo/:p_num'+p_num+'일때 '+err);
    });
    
});

// 인기있는 프로젝트 정보 가져오기
router.get('/info/popular', function(req, res, next){
    // mysql에서 projectId별 즐겨찾기 수(내림차순) 가져오기
    db.sequelize.query(
        `SELECT projId, count(projId) AS cnt
        FROM BLOT.library
        group by(projId)
        order by cnt DESC`,
        { type : db.Sequelize.QueryTypes.SELECT, raw:true}
    )
    .then(result => {
        //console.log(result);

        // 인기있는 프로젝트 수는 최대 10개만 하자
        var projSize = result.length;
        if(projSize>10)
            projSize = 10;

        var projIdArray = new Array();
        var projScore = new Array();
        for(var i=0; i<projSize; i++) {
            projIdArray.push(result[i].projId);
            projScore[result[i].projId]=result[i].cnt;
        }
        
        // projIdArray에 담은 순서대로 쿼리가 진행되는 것이 아니라 정렬한 게 의미가 없어짐
        Project.find(
            {'_id': projIdArray},
            {'_id': true, 'title': true, 'description':true, 'start': true, 'end': true, 'icon': true, 'color': true, 'image': true, valid: true, tags: true}
        )
        .then(result => {
            // Oject Array에 key 추가가 안되어서 이 과정을 거침
            var result = JSON.parse(JSON.stringify(result));

            // // 프로젝트 정보에 즐겨찾기 수 정보를 넣어줌
            for(var i=0; i<result.length; i++) {
                result[i].cnt = projScore[result[i]._id];
            }

            result.sort(function(a, b) {
                return a.cnt < b.cnt; 
            })

            res.send(result);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    }).catch(err => {
        console.log(err);
        res.send(false);
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
        if(err) console.log('ERROR : Can\'t get all sentences of project.');
        else {
            res.send(doc);
        }
    }); 
});

// 프로젝트의 모든 최종 번역 문장 가져오기
router.get('/:p_num/sentence/finalTrans', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num}, {'_id': false, 'sentence.raw_text': true, 'sentence.trans_text': true}, function(err, doc){
        if(err) console.log('ERROR : Can\'t get all translation of project.');
        else {
            var trans_array = [];
            var len = doc.sentence.length;
            for(var i=0; i<len; i++) {
                if(doc.sentence[i].trans_text)
                    trans_array.push(doc.sentence[i].trans_text);
                else
                    trans_array.push(doc.sentence[i].raw_text)
            }
                
            res.send(trans_array);
        }
    }); 
});

// 프로젝트 문장의 번역 데이터 가져오기
router.get('/:p_num/sentence/:s_num/trans', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    Project.findOne({'_id':p_num},{'_id': false, 'sentence.trans.text': true, 'sentence.trans.idx': true}, function(err, doc){
        if(err) console.log('ERROR : Can\'t get translation of the sentence.');
        else {
            //res.send(doc.sentence[s_num].trans);
            //res.send(doc.sentence[s_num]);
            try {
                var array = [];
                var trans_array = [];
                var len = 0;
                if(doc.sentence[s_num].trans)
                    len=doc.sentence[s_num].trans.length;
                for(var i=0; i<len; i++) {
                    var data = { idx: i, text: doc.sentence[s_num].trans[i].text};
                    array.push(data);
                }
                shuffle(array);
                res.send(array);
            } catch(err) {
                console.log(err);
            }
        }
    }).catch(err=>{
        console.log(err);
    });
});


// 프로젝트의 번역 문장 별 평가점수 가져오기
router.get('/:p_num/sentence/:s_num/score', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    Project.findOne({'_id':p_num},{'_id': false, 'sentence.trans.user': true, 'sentence.trans.text': true, 'sentence.like': true}, async function(err, doc){
        if(err) console.log('ERROR : Can\'t get translation of the sentence.');
        else {
            
            // 번역자, 번역문장, 몇점을 받았는가
            var returnArray = new Array();

            try {
                var lenTrans = 0;
                if(doc.sentence[s_num].trans)
                    lenTrans = doc.sentence[s_num].trans.length;
                
                // 번역 문장별 평가 점수
                var scoreArray = Array.apply(null, new Array(lenTrans)).map(Number.prototype.valueOf, 0);
                var trustArray = new Array();

                // 각 번역 문장이 몇점을 얻었는지 계산
                var lenLike = 0;
                if(doc.sentence[s_num].like)
                    lenLike=doc.sentence[s_num].like.length;
                for(var i=0; i<lenLike; i++) {
                    var transId = doc.sentence[s_num].like[i].trans_id;
                    var evaluatorId = doc.sentence[s_num].like[i].user;

                    if(!trustArray[evaluatorId]) {
                        var trust = await myKlaytn.getTrust(doc.sentence[s_num].like[i].user);
                        trust = level(parseInt(trust));
                        trustArray[evaluatorId] = trust;
                    }
                    scoreArray[transId] += trustArray[evaluatorId];                    
                }

                // 각 번역 문장에 대하여
                for (var i=0; i<lenTrans; i++) {
                    var data = { transId : doc.sentence[s_num].trans[i].user, transText : doc.sentence[s_num].trans[i].text, score : scoreArray[i]};
                    returnArray.push(data);
                }

                if(returnArray.length==0) res.send(false);
                else {
                    // 내림차순 정렬해서
                    returnArray.sort(function(a, b) {
                        return a.score < b.score;
                    })

                    // 결과 전송
                    res.send(returnArray);
                }
            } catch(err) {
                console.log(err);
                res.send(false);
            }
            
        }
    }).catch(err => {
        console.log(err);
        res.send(false);
    });
});

// 프로젝트 문장의 자신의 번역 인덱스 찾기
router.get('/:p_num/sentence/:s_num/user/:userId', function(req, res, next){
    var p_num = req.params.p_num;
    var s_num = req.params.s_num;
    var userId = req.params.userId;
    
    Project.findOne({'_id':p_num},function(err, doc){
        if(err) { console.log('ERROR : Can\'t get translation index of the user'); return; }
        else {
            try {
                var len = 0;
                if(doc.sentence[s_num].like)
                    len = doc.sentence[s_num].like.length;
                
                //console.log(len);
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
            } catch(err) {
                console.log(err);
            }
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
        if(err) { console.log('ERROR : get(/:p_num/sentence/:s_num/trans/:t_num/user/:userId)'); return; }
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
    Project.find({}, {'title': true, 'description': true, 'icon': true, 'color': true, 'image': true}, function(err, doc) {
        if(err) { console.log('ERROR : /keyword/:key'); return; }
        else {
            var array = [];
            for(var i = 0; i < doc.length; i++) {
                var title = doc[i].title;
                
                if(title.match(req.params.key) !== null) {
                    var data = { _id: doc[i]._id, title: doc[i].title, description: doc[i].description, icon: doc[i].icon, color: doc[i].color, image: doc[i].image }
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
        if(err) { console.log('ERROR : /:p_num/deadline'); return; }
        else {
            if(doc.valid === 0) res.send(true);
            else res.send(false);
        }
    });
});

// 특정유저가 등록한 프로젝트ObjectId, 제목, 요약, 아이콘, 색상 조회
router.get('/user/:userId', function(req, res, next) {
    Project.find({'user': req.params.userId}, {'title': true, 'description': true, 'icon': true, 'color': true, 'image': true, valid: true}, function(err, doc) {
        if(err) { console.log('ERROR : /user/:userId'); return; }
        else {
            var array = [];
            for(var i = 0; i < doc.length; i++) {
                 var data = { _id: doc[i]._id, title: doc[i].title, description: doc[i].description, icon: doc[i].icon, color: doc[i].color, image: doc[i].image, valid: doc[i].valid };
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
    var projectId = req.params.p_num;
    var result = await myKlaytn.getReliabilityLog();
    
    var array = [];
    
    for(var i = 0; i < result.length; i++) {
        var obj = JSON.parse(JSON.stringify(result[i]));
        if(projectId == obj.returnValues['2']) {
            var userId = obj.returnValues['3'];
            var score = obj.returnValues['4'];
            var type = obj.returnValues['5'];
            var ascore = obj.returnValues['6'];
            
            var data = {userId:userId, score:score, type:type, ascore: ascore};
            array.push(data);
        }
    }
    if(array.length == 0) res.send(false);
    else res.send(array);
});

// 사용자 신뢰도 이력 로그
router.get('/user/:userId/trust', async function(req, res, next) {
    var userId = req.params.userId;
    var result = await myKlaytn.getReliabilityLog();
    
     var array = [];
    
    for(var i = 0; i < result.length; i++) {
        var obj = JSON.parse(JSON.stringify(result[i]));
        if(userId == obj.returnValues['3']) {
            var projId = obj.returnValues['2'];
            var score = obj.returnValues['4'];
            var type = obj.returnValues['5'];
            var ascore = obj.returnValues['6'];
            var data = {projId:projId, score:score, type:type, ascore: ascore};
            array.push(data);
        }
    }
    if(array.length == 0) res.send(false);
    else res.send(array);
});


function shuffle(d) {
    for(var c = d.length-1; c>0; c--) {
        var b = Math.floor(Math.random()*(c+1));
        var a = d[c]; d[c] = d[b]; d[b] = a;
    }
    return d;
};

function level(d) {
    var ret;
    
    // 1000 점이하인 사람은 번역/평가활동을 안해서 깎이는 사람들이기 때문에
    // 1.0 이하의 ret 값을 곱해서 평가 점수에 반영한다.

    // 신뢰도의 최대값은 2000점으로 한다.

    if(d > 1000 && d <= 2000) ret = 1.0;
    else if(d > 900 && d <= 1000) ret = 0.9;
    else if(d > 800 && d <= 900 ) ret = 0.8;
    else if(d > 700 && d <= 800 ) ret = 0.7;
    else if(d > 600 && d <= 700 ) ret = 0.6;
    else if(d > 500 && d <= 600 ) ret = 0.5;
    else if(d > 400 && d <= 500 ) ret = 0.4;
    else if(d > 300 && d <= 400 ) ret = 0.3;
    else if(d > 200 && d <= 300 ) ret = 0.2;
    else if(d > 100 && d <= 200 ) ret = 0.1;
    else if(d > 0 && d <= 100 ) ret = 0.0;
    else ret = 1.0;
    
    return parseInt(ret*d);
}

// 자동 감지 off
//endDetect();

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


// async function testDeadline() {
//     var totalSupply = await myKlaytn.getTotalSupply()/10000;
//     var balance = await myKlaytn.getContractBalance();
//     console.log(totalSupply);
//     console.log(balance);

    

//     totalSupply = await myKlaytn.getTotalSupply()/10000;
//     balance = await myKlaytn.getContractBalance();
//     console.log(totalSupply);
//     console.log(balance);
// }

// testDeadline();
//testDeadline('5dc5bf0369abf82b3866fa43');

// async function test() {
//     Project.findOne({'_id': '5dc998b0acbac62b688a8929'}, async function(err, doc) {
//         if(err) {
//             console.log('ERROR'+p_num + '수동 마감 실패');
//             console.log('F');
//             return;
//         } else {
//             // 아직 마감을 안한 상태라면
//             if(doc.valid==1) {
//                 try {
//                     await deadline(doc);
//                     console.log('T');
//                 } catch(err) {
//                    console.log('F'); 
//                 }
//             } else
//             console.log('T');
//         }
//     });
// }

// test();