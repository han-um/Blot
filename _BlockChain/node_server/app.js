var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var path = require('path');

// ========================= BlockChain Data ===================================
// caver 인스턴스 만들기
var Caver = require('caver-js');
const config = {
    rpcURL: 'https://api.baobab.klaytn.net:8651'
};
const cav = new Caver(config.rpcURL);

const feePayer = {
    address : '0x4aff875cb544368fd51b8f7fda6d247582b5b87c',
    privateKey : '0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5'
};

// add fee payer account
cav.klay.accounts.wallet.add(feePayer.privateKey, feePayer.address);
// =============================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// view 경로
app.set('views', __dirname+'/views');

// html file을 load 시, html을 ejs로 rendering하기 위함
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// css, javascript 등의 정적 파일들의 기본 경로를 지정
app.use(express.static(__dirname + '/dist'));

app.post('/ajax', function(req, res) {
    const senderRawTransaction = req.body.rawTransaction;
    
    cav.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
    })
    .on('transactionHash', function(hash){
        console.log('transactionHash', hash);

        // *** TODO : txHash 값을 front에 넘겨주어서 front 쪽에서 트랜잭션을 확인 할 수 있게 해야함 ***

    })
    .on('receipt', function(receipt){
        console.log('receipt', receipt);
    })
    .on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
});

app.get('/', function (req, res) {
    res.render('homepage');
});

app.listen(3000, function() {
    console.log('Server On 3000 port!!!');
});