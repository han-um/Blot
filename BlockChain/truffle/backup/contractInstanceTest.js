
// BlotToken, BlotProject, BlotUser 의 컨트랙트 주소를 파일에 기록하는 용도

const fs = require('fs');
const Caver = require('caver-js');
const contractInfo = require('./contractInfo');


const cav = new Caver('https://api.baobab.klaytn.net:8651/');

const blotTokenContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTTOKEN_ABI), contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS);
const blotProjectContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTPROJECT_ABI), contractInfo.DEPLOYED_BDEPLOYED_BLOTPROJECT_ADDRESSLOTMAIN_ADDRESS);
const blotUserContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTUSER_ABI), contractInfo.DEPLOYED_BLOTUSER_ADDRESS);
const blotMainContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTMAIN_ABI), contractInfo.DEPLOYED_BLOTMAIN_ADDRESS);

console.log('Contract Instance 모두 성공!');