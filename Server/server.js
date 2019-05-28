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
    var MongoConfig = require('./dbconfig/mongodb.js') 
// Async : MongoDB 쿼리 안에서 밖으로 값을 빼낼 때 사용
    var async = require('async');
    
    
// *** APP정의 후 설정
    var app = express();
// BodyParser : POST 과정에서 사용
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: false })); 
// 라우팅 및 렌더링 설정
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
// 세션 사용 설정
    app.use(expressSession({secret: '123456789b',resave: true,saveUninitialized:true}));
// Static파일(Public폴더) 사용 설정 
    app.use(express.static('public'));

/*------------------------------------------------------------
 실제 각 주소로 접근시 동작하는 함수 (라우팅)
------------------------------------------------------------*/

// / : INDEX 페이지 렌더링
    app.get('/',function(req,res){
            res.render('index.html',{session_user : req.session.user});
    });

// login : 로그인 페이지 렌더링
    app.get('/login',function(req,res){
            // 만약 세션이 있다면 메인 페이지로 강제이동
            if(req.session.user){
               res.redirect('/');
            // 세션이 없다면 로그인 가능
            }else{
                res.render('login.html');
            }
    });

// mylibrary : 내 서재 페이지 렌더링
// 기능 : 해당 유저가 어떤 책들을 서재에 저장했는지 불러온다.
    app.get('/mylibrary',function(req,res){
            // 만약 세션이 없다면 로그인 페이지로 보내기
            /*
            var a = new Object();
            if(!req.session.user){
                res.redirect('/login');
            }else{
                var id = req.session.user.id;
                var sql = 'SELECT * FROM mylibrary WHERE idUser = ?';
                console.log('View Mylibrary Attempt : ',id, "from session");
                connection.query(sql, id, function(err, result, fields){
                    if(err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                            callback(null,result);
                            // 쿼리를 보낸 후 아래 실행
                            console.log('MyLibrary Result : ',id, result);
                            res.render('mylibrary.html',{session_user : req.session.user, userProjects:result});
                    }
                });
            }
            */
         res.render('mylibrary.html',{session_user : req.session.user});
    });


// testsql : SQL 테스트 페이지 (나중에 주석처리)
    app.get('/testsql',function(req,res){
        connection.query('SELECT * from Users', function(err, rows) {
        if(err) throw err;
        console.log('The solution is: ', rows.username);
        res.render('login.html', {rows : rows});
        //res.send(rows);
        });
    });  

// testmongo : MongoDB 테스트 페이지 (나중에 주석처리)
        app.get('/testmongo',function(req,res){  
             console.log('Testmongo Called');
            MongoClient.connect(MongoConfig, { useNewUrlParser: true },function(err, db){  
              if (err) throw err;
              var dbo = db.db("blotMongo");
              //Async로 내부 값을 빼기 위해 포장
            async.parallel([
            function(callback){ 
              // 내용물. 쿼리 송신
              dbo.collection("projects").find({}).toArray(function(err, result) {
                if (err) throw err;
                  console.log('Testmongo-Async Returned');
                // 쿼리 안에서 Async로 반환
                  return callback(err, result);
              });
              db.close();
             }
             ], function(err, result) {
                console.log('Testmongo-Async Recieved');
              if (err) throw err;
              // 여기에서 Async로 빼낸 값을 사용할 수 있음
                console.log('MongoData : ',result);
             });//Async Close
            });
    });  

// loginActive : 로그인 함수
// 기능1 : POST로 ID,PW 파라미터를 받아 로그인 결과 반환
// 기능2 : 세션에 유저 정보 저장
    app.post('/loginActive', function(req, res){
    var sql = 'SELECT * FROM Users WHERE Users.username = ? AND Users.password = ?';
    var id = req.body.id;//파라미터로 가져옴
    var pw = req.body.pw;
        console.log('login Attempt : ',id);
        connection.query(sql, [id,pw], function(err, result, fields){
            if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                // 쿼리를 보낸 후 아래 실행
                // 우선, 계정이 있는지 확인
                if(result.length){
                    console.log('login success : ',result[0].idUser,result[0].username,result[0].nickname);
                    // 세션에 저장
                    req.session.user = {
                        id: result[0].idUser,
                        name: result[0].nickname,
                        authorized: true
                    };
                }else{ // 계정이 없다면 (로그인 실패)
                    console.log('login failed : ',id);
                }
                res.send(result);
            }
        });

    });

// logout : 로그아웃 함수
    app.get('/logout', function(req, res){
        // 만약 세션이 있다면 로그아웃 후 메인 페이지로
        if(req.session.user){
            req.session.destroy();
            res.redirect('/');
        // 세션이 없다면 메인페이지로
        }else{
             res.redirect('/');
        }
     });


/*------------------------------------------------------------
 라우팅 및 포트 관련 설정 (중요도 낮음)
------------------------------------------------------------*/

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
