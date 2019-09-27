require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');
const router = require('express').Router();
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


// 회원가입 POST: userId(사용자계정) password(비밀번호) email(이메일계정) wAddr(지갑주소)
router.post('/', function(req, res, next){
    db.User.create({
        user_id: req.params.userId,
        password: req.params.password,
        email: req.params.email,
        wAddr: req.params.wAddr
    }).then(result => {
        res.send(result);
    }).catch(err => {
        console.error(err);
    });
});

// 즐겨찾기등록 POST: projId(프로젝트아이디) userId(사용자계정)
router.post('/bookmark', function(req, res, next){
    db.User.findOne({
        attributes: ['id'],
        where: { userId: req.params.userId }
    }).then(result => {
        db.Library.create({
            projId: req.params.projId,
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

// 즐겨찾기 프로젝트아이디 가져오기 GET: userId(사용자계정)
router.get('/project/:userId', function(req, res, next){
    db.Library.findAll({
        attributes: ['projId'],
        where: { userId: req.params.userId }
    }).then(result => {
        res.send(result);
    }).catch(err => {
        console.error(err);
    });
});


module.exports = router;
