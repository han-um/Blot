/*------------------------------------------------------------
 헤더 파일 로드 및 사전 설정
------------------------------------------------------------*/

// *** APP정의 전 헤더 파일 임포트
// MySQL 연결 설정
    var express    = require('express');
    var mysql      = require('mysql');
    var dbconfig   = require('./dbconfig/mysql.js');
    var connection = mysql.createConnection(dbconfig);
// BodyParser : POST과정에서 사용
    var bodyParser = require('body-parser');
// ExpressSession : 세션 구현에 사용
    var expressSession = require('express-session');
// MongoDBClient : NoSQL데이터베이스 연결에 사용
    var mongo = require('mongodb');
    var MongoClient = mongo.MongoClient;
    var MongoConfig = require('./dbconfig/mongodb.js') ;
    var ObjectId = require('mongodb').ObjectID;
// Async : MongoDB 쿼리 안에서 밖으로 값을 빼낼 때 사용
    var async = require('async');

// *** APP정의 후 설정
    var app = express();
// BodyParser : POST 과정에서 사용
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
// 라우팅 및 렌더링 설정
    app.set('views', __dirname + '/template');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
// 세션 사용 설정
    app.use(expressSession({secret: '123456789b',resave: true,saveUninitialized:true}));
// Static파일(폴더) 사용 설정
    app.use(express.static('static'));
// 모델
    //var login    = require('login.js');

// 문장 분할
    var splitter = require("sentence-splitter");




/*------------------------------------------------------------
 ROUTE : 각 페이지 렌더링
------------------------------------------------------------*/

// / : INDEX
    app.get('/',function(req,res){
        
            // splitter test
            /*
            var simplePost = "Her email is Jane.Doe@example.com... I sent her an email.";
            console.log(simplePost);    
            var sentences = splitter.split(simplePost);
            
            for(var i=0; i<sentences.length; i++) {
                console.log(sentences[i].raw);
                //alert(setences[i].raw);
            }
            */
            res.render('index.html',{session_user : req.session.user});
    });

// /login : LOGIN
    app.get('/',function(req,res){
            res.render('login.html',{session_user : req.session.user});
    });

/*------------------------------------------------------------
 라우팅 및 포트 관련 설정 (중요도 낮음)
------------------------------------------------------------*/

var server = app.listen(3000, function(){
    console.log("[Server] Express server has started on port 3000")
    
    var simplePost="Her email is Jane.Doe@example.com... I sent her an email. How are you?";
    console.log(simplePost);
    let sentences = splitter.split(simplePost);
    
    console.log(sentences.length);
    for(var i=0; i<sentences.length; i++) {
        if(i%2 == 1) continue;
        console.log(sentences[i].raw);
    }
    
});
