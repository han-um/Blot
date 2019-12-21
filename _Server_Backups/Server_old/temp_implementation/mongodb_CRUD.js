/*
  * 몽고디비 package 설치(이미 본철이 코드에는 설치되어있음)
  npm install mongodb

  * Nodejs에서 몽고 디비 사용법 (CRUD)
  https://nesoy.github.io/articles/2017-04/Nodejs-MongoDB

  * 몽고디비 메뉴얼
  https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/#db.collection.insertOne

  현재, EC2의 blotMongo 데이터베이스 안에 testCollection 이라는 collection 만들어서 CRUD 테스트중
*/

// dbconfig/mongodb.js
var USERNAME = "root";
var PASSWORD = "2013";
var HOST = "ec2-52-78-12-142.ap-northeast-2.compute.amazonaws.com";
var PORT = "27017";
var DBNAME = "blotMongo";

// MongoDBClient : NoSQL데이터베이스 연결에 사용
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var MongoConfig = 'mongodb://'+USERNAME+':'+PASSWORD+'@'+HOST+':'+PORT+'/'+DBNAME+'?authSource=admin';
var ObjectId = require('mongodb').ObjectID;

var dbo;

MongoClient.connect(MongoConfig,  { useNewUrlParser: true }, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }

   dbo = database.db('blotMongo');
   console.log("success");

   var testCollection = dbo.collection('testCollection');



/*
  // Insert 예제
   testCollection.insert({ name:'스타워즈7', director:'JJ 에이브럼스', year:2015}).then(function(results) {
       // console.log('== Resolved\n', results);
       console.log('Promise Based Insert Result : ', results);
    }, function(err) {
       console.log('== Rejected\n', err);
    });
*/

/*
  // update 예제
  testCollection.update({name:'스타워즈7'}, {$set:{name:'어벤져스'}}).then(function(results) {
    // console.log('== Resolved\n', results);
    console.log('Promise Based update Result : ', results);
  }, function(err) {
    console.log('== Rejected\n', err);
  });
*/



  // 실제 project collection에 들어갈 document 형식으로 insert 해보기
  var val = '문서 설명';
  const num = 123;
  const date = new Date();

  var sql = {"title":"Spider Man3","description":val,"idUser":num,"date":{"start":date,"end":"2020-05-26T15:02:00.000Z"},"doc":{"all":"Original Text here. sentence1. sentence2. sentenc3.","sentences":[{"text":"I burst out laughing so hard that even more people looked over in our direction.","trans":[{"text":"문장1","idUser":1,"AgreeUser":[2]},{"text":"문장1","idUser":2,"AgreeUser":[1]}]},{"text":"I tried to straighten my face.","trans":[{"text":"문장2","idUser":1,"AgreeUser":[2]}]},{"text":"Sorry, I mumbled."},{"text":"I think I am getting hysterical."},{"text":"Do you know something?"},{"text":"I could have looked at his face all night."},{"text":"The way his eyes wrinkled at the corners."},{"text":"That place where his neck met his shoulder."},{"text":"What?"},{"text":"Sometines, Clark, you are pretty much the only thing that makes me want to get up in the morning."},{"text":"Then let us go somewhere."},{"text":"The words were out almost before I knew what i wanted to say."},{"text":"What?"},{"text":"Let us go somewhere."},{"text":"Let us have a week where we just have fun."},{"text":"You and me."},{"text":"None of these..."},{"text":"He waited."},{"text":"Areses?"},{"text":"...areses."},{"text":"Say yes, Will."},{"text":"Go on."},{"text":"His eyes did not leave mine."}]}};

// Insert 예제
 testCollection.insertOne(sql).then(function(results) {
     // console.log('== Resolved\n', results);
     console.log('Promise Based Insert Result : ', results);
  }, function(err) {
     console.log('== Rejected\n', err);
  });

  database.close();
});
