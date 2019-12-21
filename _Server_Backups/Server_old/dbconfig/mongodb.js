// dbconfig/mongodb.js
var USERNAME = "root";
var PASSWORD = "2013";
var HOST = "ec2-52-78-12-142.ap-northeast-2.compute.amazonaws.com";
var PORT = "27017";
var DBNAME = "blotMongo";
module.exports = 'mongodb://'+USERNAME+':'+PASSWORD+'@'+HOST+':'+PORT+'/'+DBNAME+'?authSource=admin';