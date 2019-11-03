/* multer 모듈을 사용한 첨부파일 저장하기 샘플 */

// 파일은 서버 file system에 저장하고, file명은 디비에 저장하자

require('dotenv').config();
const express = require('express')
const router = express.Router();
const app = require('express')();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// express에 multer모듈 적용 (for 파일업로드)
var multer = require('multer');

// 파일시스템 접근을 위한 모듈 호출 
var fs = require("fs");

// 사용자 Id를 모르니 무작위로 생성하겠음
var userId='';

// 전송된 파일이 서버의 어느 디렉토리, 어떤 이름으로 저장될지 옵션을 줘서 저장
var storage = multer.diskStorage({
    // 전송된 파일을 저장할 디렉토리 설정
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // 전송된 파일을 어떤 이름으로 저장할 것인가
    filename: function (req, file, cb) {
        // 확장자 명을 기준으로 파일명을 오려내기
        var fileNameArray = (file.originalname).split('.');
        // 유일한 파일이름(ex 사용자 아이디)을 가지도록 파일명을 고쳐주고
        setUserId();
        var uniqueFileName = userId+'.'+fileNameArray[1];
        // 그 이름으로 전송된 파일을 저장
        cb(null, uniqueFileName);
    }
  })

var upload = multer({ storage: storage });

// 몽고디비안의 Files 스키마(collection)를 모델화한 객체     
const Files = require('../models/files');  

const mongoose = require('mongoose');

// @ NOTE
// 몽고디비 커넥션 유지를 어케하는지 몰라서
// index.js에서 몽고디비에 연결했는데 여기서 또 연결했음.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongod server'))
    .catch(e => console.error(e));


// Multer Module을 이용한 파일 업로드 테스트
// 파일 첨부 페이지(views/fileUploadTest.jade)로 렌더링
router.get('/upload', function(req, res, next){
    res.render('fileUploadTest');
});


/* @ NOTE
  *  클라이언트로 부터 파일 수신 시, 
  *  front쪽의 file input 태그의 name 속성과 upload.single('name속성명')을 일치시켜야 함 
  */
// 클라이언트로부터 파일이 post 방식으로 전송된 경우
router.post('/upload', upload.single('userfile'), function(req, res){
    /*cf. req.file object는 다음과 같은 내용을 갖는다.
    {
        fieldname: 'userfile',
        originalname: 'picture.PNG',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'uploads/',
        filename: 'userId.PNG',
        path: 'uploads\\userId.PNG',
        size: 1795
    }*/
  
    try {
        console.log(req.file);

        // 원본 파일명
        var orgFileName = req.file.originalname;
        
        // 서버에 저장된 첨부 파일명
        var secFileName = req.file.filename;
        
        // DB에 넣을 데이터를 Object에 담기
        var obj = { 'userId': userId, "orgFileName": orgFileName, "secFileName": secFileName };
    
        var newData = new Files(obj);
        newData.save(function(err){
            if(err) res.send(err); // 에러 확인
            console.log('DB에 성공적으로 file 정보를 저장');
            res.end("ok");  
        });
    } catch(err) {
        console.log(err);
    }
});


// 클라이언트가 특정 파일을 다운받고 싶어하는 경우, userId 정보를 포함해 Get 방식으로 요구 (다운로드는 쓸지 모르겠지만 일단 구현은 해둘게)
router.get('/download', function(req, res) {
    try {
        var _userId = req.query.userId;
    
        console.log(_userId);

        Files.findOne({'userId': _userId})
        .select('userId orgFileName secFileName') // 해당파일의 원래 이름과 저장된 이름을 가져옴
        .exec(function(err, data) { // 완료되면 찾은 데이터는 data에 담김 
            if(err) console.log(err);

            if(data!=null) {
                console.log(JSON.stringify(data));
                console.log(__dirname);
                
                var filePath = __dirname + "/../uploads/" + data.secFileName; // 다운로드할 파일의 경로​     

                var fileName = data.orgFileName; // 원본파일명​

                // 응답 헤더에 파일의 이름과 mime Type을 명시한다.(한글&특수문자,공백 처리)
                res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
                res.setHeader("Content-Type","binary/octet-stream");

                // filePath에 있는 파일 스트림 객체를 얻어온다.(바이트 알갱이를 읽어옵니다.)
                var fileStream = fs.createReadStream(filePath);

                // 다운로드 한다.(res 객체에 바이트알갱이를 전송한다)
                fileStream.pipe(res);
            } else
                console.log('DB에 찾으시는 파일 정보가 없습니다.');
        });
    } catch(err) {
        console.log(err);
    }
});

function setUserId() {
    userId = 'userId'+(Math.floor(Math.random() * 100) + 1);
}

module.exports = router;