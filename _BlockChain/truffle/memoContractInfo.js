
// BlotToken, BlotProject, BlotUser 컨트랙트에게 서로의 컨트랙트 주소를 설정해주기

const fs = require('fs');
const Caver = require('caver-js');

console.log('hello');
const cav = new Caver('https://api.baobab.klaytn.net:8651/');


const DEPLOYED_BLOTPROJECT_ABI = fs.readFileSync('./metadata/BlotProject_ABI', 'utf8').replace(/\n|\r/g, "");
const DEPLOYED_BLOTPROJECT_ADDRESS = fs.readFileSync('./metadata/BlotProject_Address', 'utf8').replace(/\n|\r/g, "");
const DEPLOYED_BLOTTOKEN_ABI = fs.readFileSync('./metadata/BlotToken_ABI', 'utf8').replace(/\n|\r/g, "");
const DEPLOYED_BLOTTOKEN_ADDRESS = fs.readFileSync('./metadata/BlotToken_Address', 'utf8').replace(/\n|\r/g, "");
const DEPLOYED_BLOTUSER_ABI = fs.readFileSync('./metadata/BlotUser_ABI', 'utf8').replace(/\n|\r/g, "");
const DEPLOYED_BLOTUSER_ADDRESS = fs.readFileSync('./metadata/BlotUser_Address', 'utf8').replace(/\n|\r/g, "");


const blotProjectContract = new cav.klay.Contract(JSON.parse(DEPLOYED_BLOTPROJECT_ABI), DEPLOYED_BLOTPROJECT_ADDRESS);
const blotTokenContract = new cav.klay.Contract(JSON.parse(DEPLOYED_BLOTTOKEN_ABI), DEPLOYED_BLOTTOKEN_ADDRESS);
const blotUserContract = new cav.klay.Contract(JSON.parse(DEPLOYED_BLOTUSER_ABI), DEPLOYED_BLOTUSER_ADDRESS);

const walletInstance = cav.klay.accounts.privateKeyToAccount('0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5');
cav.klay.accounts.wallet.add(walletInstance);

const App = {

    start : async function () {
        
        // Project Contract
        await blotProjectContract.methods.setBlotUserAddress(DEPLOYED_BLOTUSER_ADDRESS).send({
            from : walletInstance.address,
            gas : '250000'
        })
        .on('receipt', function(receipt) {
            console.log('Project Contract에 User Contract Address 기록');
        }).on('error', console.error);
        
        await blotProjectContract.methods.setBlotTokenAddress(DEPLOYED_BLOTTOKEN_ADDRESS).send({
            from : walletInstance.address,
            gas : '250000'
        }).on('receipt', function(receipt) {
            console.log('Project Contract에 Token Contract Address 기록');
        }).on('error', console.error);


        // Token Contract
        await blotTokenContract.methods.setBlotProjectAddress(DEPLOYED_BLOTPROJECT_ADDRESS).send({
            from : walletInstance.address,
            gas : '250000'
        }).on('receipt', function(receipt) {
            console.log('Token Contract에 Project Contract Address 기록');
        }).on('error', console.error);

        await blotTokenContract.methods.setBlotUserAddress(DEPLOYED_BLOTUSER_ADDRESS).send({
            from : walletInstance.address,
            gas : '250000'
        }).on('receipt', function(receipt) {
            console.log('Token Contract에 User Contract Address 기록');
        }).on('error', console.error);


        // User Contract
        await blotUserContract.methods.setBlotTokenAddress(DEPLOYED_BLOTTOKEN_ADDRESS).send({
            from : walletInstance.address,
            gas : '250000'
        }).on('receipt', function(receipt) {
            console.log('User Contract에 Token Contract Address 기록');
        }).on('error', console.error);

        await blotUserContract.methods.setBlotProjectAddress(DEPLOYED_BLOTPROJECT_ADDRESS).send({
            from : walletInstance.address,
            gas : '250000'
        }).on('receipt', function(receipt) {
            console.log('User Contract에 Project Contract Address 기록');
        }).on('error', console.error);
    }
}

App.start();
