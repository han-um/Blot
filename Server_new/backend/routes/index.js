const router = require('express').Router();
const Project = require('../models/project');

// 프로젝트 정보 가져오기 by project_id
router.get('/project', function(req, res, next){
    Project.find({}, {"_id": false, "title": true, "start": true, "end": true}, function(err, doc){
        if(err) console.log('err');
        else {
            //res.json(doc);
            //console.log(typeof(doc));
            res.send(doc);
            //res.render('index', { title: 'Express' });
        }
    });
});

// 프로젝트 정보 가져오기
router.get('/project/:p_num', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num},{"_id": false, "title": true, "start": true, "end": true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
        }
    });
});

// 프로젝트의 모든 원문 문장 가져오기
router.get('/project/:p_num/sentence', function(req, res, next){
    var p_num = req.params.p_num;
    Project.findOne({'_id':p_num}, {'_id': false, 'sentence.raw_text': true}, function(err, doc){
        if(err) console.log('err');
        else {
            res.send(doc);
        }
    }); 
});

// 프로젝트의 문장의 번역 데이터 가져오기
router.get('/project/:p_num/sentence/:s_num', function(req, res, next){
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
router.get('/project/:p_num/sentence/:s_num/trans/:t_num/user/:userid', function(req, res, next){
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

// 프로젝트 입력
/*
router.post('/project', function(req, res, next){
    var title = req.body.title;
    var description = req.body.description;
    var language = req.body.language;
    var tags = req.body.tags;
    var user = req.body.user;
    var end = req.body.end;
    var reward = req.body.reward;
    var all = req.body.all;
    
    // 문장 로직 처리
})
*/

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



