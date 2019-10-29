
// BlotToken, BlotProject, BlotUser 의 컨트랙트 주소를 파일에 기록하는 용도

const fs = require('fs');
const Caver = require('caver-js');

console.log('hello');
const cav = new Caver('https://api.baobab.klaytn.net:8651/');

const config  = {
    DEPLOYED_BLOTMAIN_ABI : fs.readFileSync('./metadata/BlotMain_ABI', 'utf8').replace(/\n|\r/g, ""),
    DEPLOYED_BLOTMAIN_ADDRESS : fs.readFileSync('./metadata/BlotMain_Address', 'utf8').replace(/\n|\r/g, "")
}

const blotMainContract = new cav.klay.Contract(JSON.parse(config.DEPLOYED_BLOTMAIN_ABI), config.DEPLOYED_BLOTMAIN_ADDRESS);

const App = {

    start : async function () {
        const tokenAddress = await blotMainContract.methods.blotTokenAddress().call();
        const projectAddress = await blotMainContract.methods.blotProjectAddress().call();
        const userAddress = await blotMainContract.methods.blotUserAddress().call();

        fs.writeFile(
            './metadata/BlotToken_Address',
            tokenAddress,
            (err) => {
                if(err) throw err
                console.log("BlotToken Address 파일 기록 성공");
            }
        )

        fs.writeFile(
            './metadata/BlotProject_Address',
            projectAddress,
            (err) => {
                if(err) throw err
                console.log("BlotProject Address 파일 기록 성공");
            }
        )

        fs.writeFile(
            './metadata/BlotUser_Address',
            userAddress,
            (err) => {
                if(err) throw err
                console.log("BlotUser Address 파일 기록 성공");
            }
        )
    }
}

App.start();
