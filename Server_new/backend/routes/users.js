require('dotenv').config()
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

router.get('/', function(req, res, next){
    db.User.findAll().then(function(results) {
        res.send(results);
    }).catch(function(err) {
        console.error(err);
    });
});

router.get('/create/:u_id', function(req, res){
  db.User.create({
      user_id: req.params.u_id,
      password: '1111',
      email: 'abcd@gmail.com',
      w_addr: 'adsf#2@wwke#12'
  }).then(result => {
      res.send(result);
  }).catch(err => {
      console.error(err);
  });
});


module.exports = router;
