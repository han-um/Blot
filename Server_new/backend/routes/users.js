require('dotenv').config()
require('./index');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
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

db.User.sync();
db.Library.sync();


const Klaytn = require('../blockchain/contract');
const myKlaytn = Klaytn();

const cron = require('node-cron');

const mongoose = require('mongoose');
const Project = require('../models/project');
const Sentence = mongoose.model('Sentence',require('../models/sentence'));
const Trans = mongoose.model('Trans', require('../models/trans'));


function mReduceDetect() {
    cron.schedule(' * * 1 * *', () => {
        db.User.findAll({
            attributes: ['userId'],
        }).then( async result => {
            for(var i = 0; i < result.length; i++) {
                console.log(result[i].userId);
                try {
                    var trust = await myKlaytn.getTrust(result[i].userId); 
                    if(trust - 25 < 0) {
                        if(trust != 0) {
                            await myKlaytn.setTrust('monthly', result[i].userId, -25, 2);
                        }
                    } 
                    else await myKlaytn.setTrust('monthly', result[i].userId, -25, 2);
                    //console.log(result[i].userId+'의 신뢰점수 : '+trust);
                } catch(err) {
                    console.log('[신뢰도 차감 에러]'+result[i].userId+'가 존재하지 않습니다.');
                }
            }
        }).catch(err => {
            console.log(err);
        });
    });
}
// 월별감소 감지 off
// mReduceDetect();


// 회원가입 POST: userId(사용자계정) password(비밀번호) email(이메일계정) wAddr(지갑주소)
router.post('/', function(req, res, next){
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if(err) console.error(err);
        else {
            db.User.create({
                userId: req.body.userId,
                password: hash,
                email: req.body.email,
                wAddr: req.body.wAddr,
                image: req.body.image
            }).then(async result => {
                await myKlaytn.userSignUp(req.body.userId, req.body.wAddr);
                res.send(result);
            }).catch(err => {
                console.error(err);
            });
        }
    });
});

// 즐겨찾기등록 POST: projId(프로젝트아이디) userId(사용자계정)
router.post('/bookmark', function(req, res, next){
    db.User.findOne({
        attributes: ['id'],
        where: { userId: req.body.userId }
    }).then(result => {
        db.Library.create({
            projId: req.body.projId,
            userId: result.id
        }).then(result => {
            res.send(result);
        }).catch(err => {
            console.error(err);
        })
    }).catch(err => {
        console.error(err);
    });
});

// 지갑주소 반환하기 GET: userId(사용자계정)
router.get('/:userId/wallet/', async function(req, res, next){
    try {
        var wAddr = await myKlaytn.getWalletAddress(req.params.userId);
        res.send(wAddr);  
    } catch(err) {
        res.send(false);
    }
});

// 즐겨찾기 프로젝트아이디 가져오기 GET: userId(사용자계정)
router.get('/:userId/project', function(req, res, next){
    db.User.findOne({
        attributes: ['id'],
        where: { userId: req.params.userId }
    }).then(result => {
        db.Library.findAll({
            attributes: ['projId'],
            where: { userId: result.id }
        }).then(async result => {
            var array = []
            for(var i = 0; i < result.length; i++) {
                var projId = result[i].projId;
                await Project.findOne({'_id': projId}, {'title': true, 'description': true, 'icon': true, 'color': true, 'image': true}, function(err, doc) {
                    if(err) { console.log('err'); return; }
                    else {
                        var data = { _id: doc._id, title: doc.title, description: doc.description, icon: doc.icon, color: doc.color, image: doc.image };
                        array.push(data);
                    }
                });
            }
            if(array.length === 0) res.send(false);
            else res.send(array);
        }).catch(err => {
            console.error(err);
        });
    });
});

// 프로젝트 즐겨찾기 등록여부 확인 GET: projId(프로젝트아이디) userId(사용자계정)
router.get('/:userId/project/:projId', function(req, res, next){
    db.User.findOne({
        attributes: ['id'],
        where: { userId: req.params.userId }
    }).then(result => {
        db.Library.findOne({
            where: { projId: req.params.projId, userId: result.id }
        }).then(result => {
            if(result == null) res.send(false);
            else res.send(true);
        }).catch(err => {
            console.error(err);
        });
    });
});

// 로그인
router.get('/:userId/password/:password', function(req, res, next){
    db.User.findOne({
        attributes: ['password'],
        where:{ userId: req.params.userId }
    }).then(result => {
        if(result == null) res.send(false);
        else {
            bcrypt.compare(req.params.password, result.password, function(err, ans) {
            res.send(ans);
            });
        }
    }).catch(err => {
        console.error(err);
    });
});

// 회원정보확인
router.get('/:userId', function(req, res, next){
    db.User.findOne({
        attributes: ['userId','email','image'],
        where:{ userId: req.params.userId }
    }).then(result => {
        res.send(result);
    })
});

module.exports = router;
