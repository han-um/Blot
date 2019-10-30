const Caver = require('caver-js');
const contractInfo = require('./contractInfo');
const config = { rpcURL: 'https://api.baobab.klaytn.net:8651/'}

const cav = new Caver(config.rpcURL);

const blotTokenContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTTOKEN_ABI), contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS);
const blotProjectContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTPROJECT_ABI), contractInfo.DEPLOYED_BDEPLOYED_BLOTPROJECT_ADDRESSLOTMAIN_ADDRESS);
const blotUserContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTUSER_ABI), contractInfo.DEPLOYED_BLOTUSER_ADDRESS);
const blotMainContract = new cav.klay.Contract(JSON.parse(contractInfo.DEPLOYED_BLOTMAIN_ABI), contractInfo.DEPLOYED_BLOTMAIN_ADDRESS);

const privatekey = '0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5';

const walletInstance = cav.klay.accounts.privateKeyToAccount(privatekey);

cav.klay.accounts.wallet.add(walletInstance);

module.exports = function() {
    
    return {
        // ProjectId로 프로젝트에 걸린 보상금 조회
        getReward : async function(project) {
            var projectId = project;
            await blotProjectContract.methods.getProjectRewardByprojectId(projectId).call()
            .then( function( result ) {
                // result에 보상금이 반환됨
                //console.log(projectId + '의 보상금은 ' + result + ' BLOT');
                return result;
            });
        },

        // ProjectId로 프로젝트에 정보(글쓴이, 마감일, 보상금) 조회
        getProjectInfo : async function(project) {
            var projectId = project;
            await blotProjectContract.methods.getProjectInfoByprojectId(projectId).call()
            .then( function( result ) {
                // result에 글쓴이 아이디, 마감일, 보상금이 반환됨
                // console.log(result);
                return result;
            });
        },
        
        // userId로 사용자 신뢰 점수 조회
        getTrust : async function(user) {
            var userId = user;
            var ret;
            await blotUserContract.methods.getUserReliabilityByUserId(userId).call()
            .then( function( result ) {
                // result에 사용자 신뢰 점수가 반환됨
                //console.log(userId+' 사용자 신뢰 점수 : '+result);
                ret = result;
                
            });
            return ret;
        },
        
        
        
        // userId로 사용자 지갑 주소 조회
        getWalletAddress : async function(user) {
            var userId = user;
            await blotUserContract.methods.getUserAddressByUserId(userId).call()
            .then( function( result ) {
                // result에 사용자 지갑 주소가 반환됨
                // console.log(userId+'의 지갑 주소 :'+result);
                return result;
            });
        },
        
        // 사용자 신뢰도 조정 함수
        setTrust : async function() {
            var userId = 'kss';
            var value = 10;

            // @ NOTE : value에 양수 or 음수를 주면 신뢰도 증가/감소 가능
            await blotMainContract.methods.updateUserReliability(userId, value).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobab.klaytn.com/tx/'+txHash);
            })
            .on('error', console.error);
        },
        
        // 번역 활동 기록
        setTranslation : async function() {
            const projectId = 'projectId3';
            const translatorId = 'translatorId';
            const sentenceList = [1, 2, 3];
            const translationList = [1, 2, 3];
            const share = 20;
            
            await blotMainContract.methods.generateTranslationEvent(projectId, translatorId, sentenceList, translationList, share).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobab.klaytn.com/tx/'+txHash);
            })
            .on('error', console.error);
        },
        
        // 평가 활동 기록
        setEvaluation : async function() {
            const projectId = 'projectId3';
            const evaluatorId = 'translatorId';
            const sentenceList = [1, 2, 3];
            const translationList = [1, 2, 3];
            const share = 20;
            
            await blotMainContract.methods.blotMainContract.methods.generateEvaluationEvent(
                projectId, 
                evaluatorId, 
                sentenceList, 
                translationList, 
                share
            ).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
            })
            .on('error', console.error);
        },
        
        // 번역 마감 후 보상금 지급
        Transfer : async function() {
            const recipient = '0x4aff875cb544368fd51b8f7fda6d247582b5b87c';
            const reward = 100;
            
            await blotMainContract.methods.blotMainContract.methods.sendRewardToUser(recipient, reward).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
            })
            .on('receipt', function(receipt) {
                console.log(JSON.stringify(receipt));
            })
            .on('error', console.error);
        },
        
        // 컨트랙트 계정으로부터 대납자 계정으로 잉여 자금 보내기
        // @ NOTE : 번역 마감 후 보상금 분배, 번역/평가 활동 기록 로직 종료 후 하루 한번만 실행할 것
        chargeFeePayerBalance : async function() {
            await blotMainContract.methods.transferBalanceToOwner(recipient, reward).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
            })
            .on('receipt', function(receipt) {
                console.log(JSON.stringify(receipt));
            })
            .on('error', console.error);
        },

        // 수수료 대납
        payProxy : async function(rawTransaction) {
            const senderRawTransaction = rawTransaction;
            cav.klay.sendTransaction({
                senderRawTransaction: senderRawTransaction,
                feePayer: this._getFeePayerWalletAddress()
            })
            .on('transactionHash', function(txhash){
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
                return txhash;
            })
            .on('receipt', function(receipt){
                console.log('receipt', receipt);
            })
            .on('error', console.error);
        },


        // 번역 활동 기록 불러오기
        handleTranslationLog : async function() {
            await blotMainContract.getPastEvents('NewTranslation', {
              filter: '',
              fromBlock: 0,
              toBlock: 'latest'          
            })
            .then(function(events) {
              // @ NOTE : 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
              console.log(events);

              for(var i=0; i<events.length; i++) {
                console.log('project Id:'+JSON.stringify(events[i].returnValues.projectId));
                console.log('translator Id:'+JSON.stringify(events[i].returnValues.translatorId));
                console.log('sentenceId List:'+JSON.stringify(events[i].returnValues.sentenceId));
                console.log('translationId List:'+JSON.stringify(events[i].returnValues.translationId));
                console.log('user Share:'+JSON.stringify(events[i].returnValues.userShare));
              }
            });
          },
    
    
          //  평가 활동 기록 불러오기
          handleEvaluationLog : async function() {
            await blotMainContract.getPastEvents('NewEvaluation', {
              filter: '',
              fromBlock: 0,
              toBlock: 'latest'          
            })
            .then(function(events) {
              // 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
              console.log(events);
    
              for(var i=0; i<events.length; i++) {
                console.log('project Id:'+JSON.stringify(events[i].returnValues.projectId));
                console.log('evaluator Id:'+JSON.stringify(events[i].returnValues.evaluatorId));
                console.log('sentenceId List:'+JSON.stringify(events[i].returnValues.sentenceId));
                console.log('translationId List:'+JSON.stringify(events[i].returnValues.translationId));
                console.log('user Share:'+JSON.stringify(events[i].returnValues.userShare));
              }
            });
          },
    
    
          // 컨트랙트의 Klay 수신 내역 불러오기(토큰 구매 기록을 확인할 수 있음)
          // @ NOTE : 어느 계정 주소에서 얼마만큼의 Klay를 송금했는가 기록이 남아있음
          handleTokenPurchaseLog : async function() {
    
            await blotMainContract.getPastEvents('LogDepositReceived', {
              filter: '',
              fromBlock: 0,
              toBlock: 'latest'          
            })
            .then(function(events) {
              // 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
              console.log(events);
    
              for(var i=0; i<events.length; i++) {
                console.log('userAddress:'+JSON.stringify(events[i].returnValues.userAddress));
                console.log('klayNum:'+JSON.stringify(events[i].returnValues.klayNum));
              }
            });
          }, 
    
    
    
          // 사용자별 신뢰도 조정 기록
          // @ NOTE : 어떤 사용자의 신뢰점수가 얼마나 증가/감소하여 몇점이 되었는지 기록되어 있음(신뢰 점수 변화의 발자취 기록)
          handleReliabilityLog : async function() {
            await blotUserContract.getPastEvents('Reliability', {
              filter: '',
              fromBlock: 0,
              toBlock: 'latest'          
            })
            .then(function(events) {
              // 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
              console.log(events);
    
              for(var i=0; i<events.length; i++) {
                console.log('userId : '+JSON.stringify(events[i].returnValues.userId));
                console.log('value : '+JSON.stringify(events[i].returnValues.value));
                console.log('totalUserReliability : '+JSON.stringify(events[i].returnValues.totalUserReliability));
              }
            });
          },
    
    
          // 프로젝트 등록 기록
          /* @ NOTE : 과거부터 지금까지 등록된 프로젝트 정보 조회 가능
           *  보상금, 마감기한, 프로젝트Id 정보가 있음
           *  파라미터 순서가 이상한 이유는 블록체인 상에서 로그 데이터를 인덱싱을 고려해야했기 때문임.
           */
          handleProjectRegisterLog : async function() {
            await blotProjectContract.getPastEvents('NewProject', {
              filter: '',
              fromBlock: 0,
              toBlock: 'latest'          
            })
            .then(function(events) {
              // 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
              console.log(events);
    
              for(var i=0; i<events.length; i++) {
                console.log('reward : '+JSON.stringify(events[i].returnValues.reward));
                console.log('deadline : '+JSON.stringify(events[i].returnValues.deadline));
                console.log('projectId : '+JSON.stringify(events[i].returnValues.projectId));
              }
            });
          },

        // 사용자(수수료 대납자) 지갑 주소 반환
        _getFeePayerWalletAddress : function() {
            return cav.klay.accounts.wallet[0].address;
        }
    }    
};