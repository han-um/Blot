const Caver = require('caver-js');
const contractInfo = require('./contractInfo');
const config = { rpcURL: 'https://api.baobab.klaytn.net:8651/'}

const cav = new Caver(config.rpcURL);

const blotTokenContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTTOKEN_ABI, contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS);
const blotProjectContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTPROJECT_ABI, contractInfo.DEPLOYED_BLOTPROJECT_ADDRESS);
const blotUserContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTUSER_ABI, contractInfo.DEPLOYED_BLOTUSER_ADDRESS);

//const privatekey = '0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5';
const privatekey = '0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5';
const walletInstance = cav.klay.accounts.privateKeyToAccount(privatekey);

cav.klay.accounts.wallet.add(walletInstance);

module.exports = function() {
    
    return {
        /* 사용자 관련 */
        // 회원 가입 시, 블록체인 상에 회원 정보 저장
        userSignUp : async function(userId, walletAddress) {
          // @ NOTE : value에 양수 or 음수를 주면 신뢰도 증가/감소 가능
          return await blotUserContract.methods.userSignUp(userId, walletAddress).send({
            from : this._getFeePayerWalletAddress(),
            gas : 250000
          });
        },
        
        // userId로 사용자 신뢰 점수 조회
        getTrust : async function(userId) {
            return await blotUserContract.methods.getUserReliabilityByUserId(userId).call();
        },
        
        // userId로 사용자 지갑 주소 조회
        getWalletAddress : async function(userId) {
            return await blotUserContract.methods.getUserAddressByUserId(userId).call();
        },
        
        // 사용자 신뢰도 조정 함수
        setTrust : async function(projectId, userId, value, reason) {
            // @ NOTE : value에 양수 or 음수를 주면 신뢰도 증가/감소 가능
            // @ Params : projectId, userId, 증감수치, 변경이유(0: 번역참가, 1:평가참가, 2:월별 점수 차감)
            return await blotUserContract.methods.updateUserReliability(projectId, userId, value, reason).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            });
        },

        /* 프로젝트 관련 */
        // 프로젝트 정보 저장
        createProject : async function(projectId, writerId, deadline, reward) {
          return await blotProjectContract.methods.registerNewProject(
            projectId, 
            writerId, 
            deadline, 
            reward
          ).send({
            from : this._getFeePayerWalletAddress(),
            gas : 250000
          });
        },

        // ProjectId로 프로젝트에 걸린 보상금 조회
        getReward : async function(projectId) {
          return await blotProjectContract.methods.getProjectRewardByprojectId(projectId).call();
        },
        
        // userId로 잔고 조회
        getBalance : async function(userId) {
          return await blotUserContract.methods.getUserBalanceByUserId(userId).call();
        },

        // ProjectId로 프로젝트에 정보(글쓴이, 마감일, 보상금) 조회
        getProjectInfo : async function(projectId) {
          return await blotProjectContract.methods.getProjectInfoByprojectId(projectId).call();
        },
        
        // 번역 활동 기록
        setTranslation : async function(projectId, translatorId, sentenceList, translationList, share) {
            return await blotProjectContract.methods.generateTranslationEvent(
              projectId, 
              translatorId, 
              sentenceList, 
              translationList, 
              share
            ).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            });
        },
        
        // 평가 활동 기록
        setEvaluation : async function(projectId, evaluatorId, sentenceList, translationList, share) {
            return await blotProjectContract.methods.generateEvaluationEvent(
                projectId, 
                evaluatorId, 
                sentenceList, 
                translationList, 
                share
            ).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            });
        },
        
        // 번역 마감 후 보상금 지급
        // @params : recipient 수신자 지갑주소, reward 보상금
        Transfer : async function(recipient, reward) {
            return await blotTokenContract.methods.sendRewardToUser(recipient, reward).send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            });
        },
        
        // 컨트랙트 계정으로부터 대납자 계정으로 잉여 자금 보내기 O
        // @ NOTE : 번역 마감 후 보상금 분배, 번역/평가 활동 기록 로직 종료 후 하루 한번만 실행할 것
        chargeFeePayerBalance : async function() {
            return await blotTokenContract.methods.transferBalanceToOwner().send({
                from : this._getFeePayerWalletAddress(),
                gas : 250000
            });
        },

        // 수수료 대납
        payProxy : async function(rawTransaction) {
            return await cav.klay.sendTransaction({
                senderRawTransaction: rawTransaction,
                feePayer: this._getFeePayerWalletAddress()
            });
        },

        // 번역 활동 기록 불러오기
        getTranslationLog : async function() {
          return await blotProjectContract.getPastEvents('NewTranslation', {
            filter: '',
            fromBlock: 0,
            toBlock: 'latest'          
          });
        },
    
        //  평가 활동 기록 불러오기
        getEvaluationLog : async function() {
          return await blotProjectContract.getPastEvents('NewEvaluation', {
            filter: '',
            fromBlock: 0,
            toBlock: 'latest'          
          });

          /*
          // JSON 객체 형태로 리턴되기 때문에 결과값을 사용하려면 아래와 같이 접근해서 사용해야함
          for(var i=0; i<result.length; i++) {
            console.log('project Id:'+JSON.stringify(result[i].returnValues.projectId));
            console.log('evaluator Id:'+JSON.stringify(result[i].returnValues.evaluatorId));
            console.log('sentenceId List:'+JSON.stringify(result[i].returnValues.sentenceId));
            console.log('translationId List:'+JSON.stringify(result[i].returnValues.translationId));
            console.log('user Share:'+JSON.stringify(result[i].returnValues.userShare));
          }
          */
        },
  
        // 컨트랙트의 Klay 수신 내역 불러오기(토큰 구매 기록을 확인할 수 있음)
        // @ NOTE : 어느 계정 주소에서 얼마만큼의 Klay를 송금했는가(Peb단위로 표현) 기록이 남아있음
        getTokenPurchaseLog : async function() {
          return await blotTokenContract.getPastEvents('LogDepositReceived', {
            filter: '',
            fromBlock: 0,
            toBlock: 'latest'          
          });

          /*
          // JSON 객체 형태로 리턴되기 때문에 결과값을 사용하려면 아래와 같이 접근해서 사용해야함
          for(var i=0; i<result.length; i++) {
            console.log('userAddress:'+JSON.stringify(result[i].returnValues.userAddress));
            console.log('klayNum:'+JSON.stringify(result[i].returnValues.pebNum));
          }
          */
        }, 
  
        // 사용자별 신뢰도 조정 기록
        // @ NOTE : 어떤 사용자의 신뢰점수가 얼마나 증가/감소하여 몇점이 되었는지 기록되어 있음(신뢰 점수 변화의 발자취 기록)
        // @ returns : 
          // projectId
          // userId
          // 조정한 수치 value
          // 변경 이유(0:번역참여, 1:평가참여, 2:월별 차감) reason, 
          // 조정 후 신뢰도 점수 totalUserReliability
        getReliabilityLog : async function() {
          return await blotUserContract.getPastEvents('Reliability', {
            filter: '',
            fromBlock: 0,
            toBlock: 'latest'          
          });

          /*
          // JSON 객체 형태로 리턴되기 때문에 결과값을 사용하려면 아래와 같이 접근해서 사용해야함
          for(var i=0; i<result.length; i++) {
            console.log('projectId: : '+JSON.stringify(result[i].returnValues.projectId));
            console.log('userId : '+JSON.stringify(result[i].returnValues.userId));
            console.log('value : '+JSON.stringify(result[i].returnValues.value));
            console.log('reason: : '+JSON.stringify(result[i].returnValues.reason));
            console.log('totalUserReliability : '+JSON.stringify(result[i].returnValues.totalUserReliability));
          }
          */
        },
  
  
        // 프로젝트 등록 기록
        /* @ NOTE : 과거부터 지금까지 등록된 프로젝트 정보 조회 가능
          *  보상금, 마감기한, 프로젝트Id 정보가 있음
          *  파라미터 순서가 이상한 이유는 블록체인 상에서 로그 데이터를 인덱싱을 고려해야했기 때문임.
          */
        getProjectRegisterLog : async function() {
          return await blotProjectContract.getPastEvents('NewProject', {
            filter: '',
            fromBlock: 0,
            toBlock: 'latest'          
          });
          
          /*
          // JSON 객체 형태로 리턴되기 때문에 결과값을 사용하려면 아래와 같이 접근해서 사용해야함
          for(var i=0; i<events.length; i++) {
            console.log('reward : '+JSON.stringify(events[i].returnValues.reward));
            console.log('deadline : '+JSON.stringify(events[i].returnValues.deadline));
            console.log('projectId : '+JSON.stringify(events[i].returnValues.projectId));
          }
          */
        },

        // 사용자(수수료 대납자) 지갑 주소 반환
        _getFeePayerWalletAddress : function() {
            return cav.klay.accounts.wallet[0].address;
        }
    }    
};