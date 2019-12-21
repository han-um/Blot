/**
 * caver-js library make a connection with klaytn node.
 * You could connect to specific klaytn node by changing 'rpcURL' value.
 * If you are running a klaytn full node, set rpcURL to your node's URL.
 * ex) rpcURL: 'http://localhost:8551'
 * default rpcURL is 'https://api.baobab.klaytn.net:8651/'.
 */
import Caver from 'caver-js';
import contractInfo from './contractInfo';

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651/'
}

const cav = new Caver(config.rpcURL);

const blotMainContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTMAIN_ABI, contractInfo.DEPLOYED_BLOTMAIN_ADDRESS);
const blotUserContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTUSER_ABI, contractInfo.DEPLOYED_BLOTUSER_ADDRESS);
const blotProjectContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTPROJECT_ABI, contractInfo.DEPLOYED_BLOTPROJECT_ADDRESS);
const blotTokenContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTTOKEN_ABI, contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS);



const App = {

    auth: {
        accessType: 'keystore',
        keystore: '',
        password: ''
      },

    // 세션을 통해 계정 인증 여부(계정 인증을 이미 했는지 안했는지)를 확인
    // >> 했다면 세션에 저장된 wallet instance 정보를 caver instance의 wallet에 추가
    start: async function () {
      // 세션 스토리지에 wallet instace 정보가 있는지 확인
      const walletFromSession = sessionStorage.getItem('walletInstance');
      
      if(walletFromSession) {
        try {
          cav.klay.accounts.wallet.add(JSON.parse(walletFromSession));
          this.changeUI(JSON.parse(walletFromSession));
        } catch (err) {
          sessionStorage.removeItem('walletInstance');
        }
      }
    },


    aaa: async function() {  
      const sender = this.getWallet();

      const userId = 'ggg';

      try {
        // transacetion sernder first signature
        const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: sender.address,
          to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
          data: blotMainContract.methods.userSignUp(userId, sender.address).encodeABI(),
          gas: '500000'
        }, sender.privateKey);
  
        // send first signature to fee payer in server
        $.ajax({
          url:'http://localhost:3000/ajax',
          dataType: 'json',
          type:'POST',
          data: {'rawTransaction': senderRawTransaction },
          success: function(msg) {
            alert('In Ajax');
            console.log(msg);
          }
        });
      } catch(err){
        console.error(err);
      }
      


      // // 로그인한 사용자의 아이디를 kss, 지갑 주소를 아래 정보라 가정
      // const userId = 'kss';
      // const walletAddress = this.getWallet().address;

      // // 가스 수수료 대납자
      // const payerAddress = this.getWallet().address;

      // await blotMainContract.methods.userSignUp(userId, walletAddress).send({
      //   from : payerAddress,
      //   gas : 250000
      // })
      // .on('transactionHash', function(txHash) {
      //   console.log('transaction 결과 보고 싶으면 여기 >> https://baobab.scope.klaytn.com/tx/'+txHash);
      // })
      // .on('receipt', function(receipt) {
      //   console.log(JSON.stringify(receipt));
      // })
      // .on('error', console.error);
    },

    // 사용자 로그인 후 화면 갱신
    changeUI: async function (walletInstance) {
      $('#login-section').hide();
      $('#function-section').show();
      $('#user-wallet').text('Hello, sir! '+walletInstance.address);
    },

    // keystore file 읽어오기
    handleImport: async function () {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = (event) => {
          try {
            if (!this.checkValidKeystore(event.target.result)) {
              $('#message').text('유효하지 않은 keystore 파일입니다.');
              return;
            }
            this.auth.keystore = event.target.result;
            $('#message').text('keystore 통과. 비밀번호를 입력하세요.');
            document.querySelector('#input-password').focus();
          } catch (event) {
            $('#message').text('ERROR : '+event);
            return;
          }
        }
      },

      // 첨부한 파일이 keystore가 맞는지 확인
      checkValidKeystore: function (keystore) {
        const parsedKeystore = JSON.parse(keystore);

        // 파일 내용이 keystore 파일이면 가져야할 필드를 포함하고 있는지 확인
        const isValidKeystore = parsedKeystore.version &&
          parsedKeystore.id &&
          parsedKeystore.address &&
          parsedKeystore.crypto;
    
        return isValidKeystore;
      },

      // caver 객체의 wallet 멤버에서 사용자 지갑정보를 가져옴
      getWallet: function () {
        if(cav.klay.accounts.wallet.length) {
          return cav.klay.accounts.wallet[0];
        }
      },

      // 비밀번호 App.auth 객체에 저장
      handlePassword: async function () {
        this.auth.password = event.target.value;
      },

      // 입력한 계정이 올바른지 확인
      handleLoginByKeyStore: async function () {
        try {
          const privateKey = cav.klay.accounts.decrypt(this.auth.keystore, this.auth.password).privateKey;
          this.integrateWallet(privateKey);
          this.auth.accessType === 'keystore'
        } catch (e) {
          $('#message').text('비밀번호가 일치하지 않습니다.');
        }
      },

      // 입력한 계정이 올바른지 확인
      handleLoginByPrivateKey: async function () {
        try {
          const privateKey = $('#input-private-key').val();
          this.integrateWallet(privateKey);
          this.auth.accessType === 'privateKey'
        } catch (e) {
          alert('ERROR : PRIVATE KEY, '+e);
        }
      },

      // 계정 정보를 세션 스토리지에 저장 
      integrateWallet: function (privateKey) {
        // walletInstance는 계정 정보라고 생각하면 된다.
        const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);

        // walletInstance를 wallet에 저장하여 트랜잭션 일으킬 때, 이 계정 정보를 활용
        cav.klay.accounts.wallet.add(walletInstance);
    
        // walletInstance를 세션 스토리지에 저장  >> 계정이 로그인 된 상태를 유지하기 위함(페이지 이동, 새로고침해도 유지됨)
        // 세션 스토리지는 탭이 닫히거나 브라우저가 닫힐 때까지 브라우저 내의 저장공간에 walletInstance 인스턴스를 저장
        sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));

        this.changeUI(walletInstance);
      },

      // 인증 정보 없애기
      reset: function () {
        this.auth = {
          accessType: '',
          keystore:'',
          password:''
        };
      },

      // 로그아웃
      handleLogout: async function () {
        this.removeWallet();
        location.reload();  // 페이지 새로고침    
      },

      // 세션 스토리지에서 wallet Instance 정보 삭제, caver Instance에서 wallet Instance 정보 삭제
      removeWallet: function () {
        cav.klay.accounts.wallet.clear();
        sessionStorage.removeItem('walletInstance');
        this.reset();
      },



      /*
      * 사용자 정보 관련 기능들
      */

      // TODO : 사용자 회원 가입


      /* 사용자 ID로 사용자 지갑 주소 조회 */

      // 사용자ID가 주어지면 사용자 지갑주소를 반환하는 함수
      getUserWalletAddressByUserId: async function (userId) {
        try {
           return await blotMainContract.methods.getUserAddressByUserId(userId).call();
        } catch(e) {
          alert(e);
        }
      },

      // 사용자 Id로 지갑 주소 조회
      handleWalletAddressQueryByUserId: async function() {
        
        // 로그인한 사용자의 아이디를 xcx라 가정
        const userId = 'xcx'; 

        // 스마트 컨트랙트에서 userId로 지갑 주소 조회
        var userWalletAddress = await this.getUserWalletAddressByUserId(userId);
        $('#user-wallet-address-by-userId').text(userWalletAddress);
      },

      

      /* 사용자 ID로 잔고 조회 */

      // 사용자Id를 가지고  스마트 컨트랙트 내 계정 잔고 조회
      getUserBalanceByUserId: async function (userId) {
        try {
           return await blotMainContract.methods.getUserBalanceByUserId(userId).call();
        } catch(e) {
          alert(e);
        }
      },

      // 사용자 ID로 잔고 조회
      handleBalanceQueryByUserId: async function() {

        // 로그인한 사용자의 아이디를 xcx라 가정
        const userId = 'xcx';
        
        // 스마트 컨트랙트에서 userId로 잔고 조회
        var userBalance = await this.getUserBalanceByUserId(userId);
        $('#user-balance-by-userId').text(userBalance);
      },



      /* 사용자 지갑주소로 잔고 조회 */

      // 사용자 지갑주소를 가지고 스마트 컨트랙트 내 계정 잔고 조회
      getUserBalanceByUserWalletAddress: async function (userWalletAddress) {
        try {
          return await blotMainContract.methods.getUserBalanceByUserAddress(userWalletAddress).call();
        } catch(e) {
          alert(e);
        }
      },

      // 사용자 지갑주소로 잔고 조회
      handleBalanceQueryByUserWallet: async function() {
        // 사용자 지갑주소를 가져와서
        var userWalletAddress = this.getWallet().address;

        if(userWalletAddress) {
          // 스마트 컨트랙트에서 userId로 잔고 조회
          var userBalance = parseInt(await this.getUserBalanceByUserWalletAddress(userWalletAddress));
          $('#user-balance-by-user-wallet').text(userBalance);
        }
        else
          alert('There is no wallet address!');
      },



      /* 사용자 Id로 신뢰 점수 조회 */
      
      // 사용자 Id를 가지고 스마트 컨트랙트 내 신뢰 점수 조회
      getUserReliabilityByUserId: async function (userId) {
        try {
           return await blotMainContract.methods.getUserReliabilityByUserId(userId).call();
        } catch(e) {
          alert(e);
        }
      },

      // 사용자 Id로 신뢰 점수 조회
      handleReliabilityQueryByUserId: async function() {
      
        // 로그인한 사용자의 아이디를 xcx라 가정
        const userId = 'xcx';
      
        // 스마트 컨트랙트에서 userId로 신뢰 점수 조회
        var userReliability = await this.getUserReliabilityByUserId(userId);
        $('#user-reliability-by-userId').text(userReliability);
      },


      /* 사용자 지갑 주소 변경 */
      // TODO : 스마트 컨트랙트 수정 후 구현
      handleChangeAddress: async function() {

        // userId를 가져왔다고 가정하고
        
        // 새로운 지갑 주소
        // const newAddress = $('#newAddress').val();

        // blotMainContract.methods.replaceOldToNewUserAddress(this.userId, newAddress).call();
      },


      // 서버에 있는 Fee Payer에게 가스비 대납을 부탁
      sendSignedTransactionToFeePayer : async function(senderRawTransaction) {
        $.ajax({
          url:'http://localhost:3000/ajax',
          dataType: 'json',
          type:'POST',
          data: {'rawTransaction': senderRawTransaction },
          success: function(msg) {
            alert('In Ajax');
            console.log(msg);
          }
        });
      },

      /* 회원 가입 시, 블록체인 내 사용자 정보 생성 */

      handleSignUp: async function() {

        const sender = this.getWallet();

        // 로그인한 사용자의 아이디를 xcx, 지갑 주소를 아래 정보라 가정
        const userId = 'xcx';
        const walletAddress = sender.address;

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.userSignUp(userId, walletAddress).encodeABI(),
            gas: '500000'
          }, sender.privateKey);

          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);

        } catch(err){
          console.error(err);
        }

        // *** TODO : server로부터 txHash 값 받아오면 "https://baobab.scope.klaytn.com/tx/'+txHash"를 사용자에게 보여주면 좋겠음 ***

        /*
        await blotMainContract.methods.userSignUp(userId, walletAddress).send({
          from : payerAddress,
          gas : 250000
        })
        .on('transactionHash', function(txHash) {
          console.log('transaction 결과 보고 싶으면 여기 >> https://baobab.scope.klaytn.com/tx/'+txHash);
        })
        .on('receipt', function(receipt) {
          console.log(JSON.stringify(receipt));
        })
        .on('error', console.error);
        */
      },




      /* 사용자 신뢰도 향상시키기 */

      handleAddReliability: async function() {

        const sender = this.getWallet();

        // 신뢰도를 증가시킬 사용자 아이디를 xcx, 향상시킬 신뢰 점수를 1 이라 가정
        const userId = 'xcx';
        const value = 1;

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.updateUserReliability(userId, value).encodeABI(),
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);
        } catch(err){
          console.error(err);
        }

      },
      
      


      /* 프로젝트 등록 */

      handleRegisterProject: async function() {

        const sender = this.getWallet();

        // 프로젝트 정보를 아래와 같이 가정
        const projectId = 'projectId3';
        const writerId = 'xcx';
        const deadline = '2019.11.20';
        const reward = 10000;

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.registerNewProject(projectId, writerId, deadline, reward).encodeABI(),
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);

        } catch(err){
          console.error(err);
        }

      },





      /* 프로젝트 보상금 조회 */

      handleQueryProjectReward: async function() {

        // 프로젝트 아이디를 가정
        const projectId = 'projectId3';

        await blotMainContract.methods.getProjectRewardByprojectId(projectId).call({
          from : this.getWallet().address,
        })
        .then(function(result){
          alert(projectId+'의 보상금은 ' + result + ' BLOT');  
        });
      },




      /* 프로젝트 정보 조회 */

      handleQueryProjectInfo: async function() {

        // 프로젝트 아이디를 가정
        const projectId = 'projectId3';

        await blotMainContract.methods.getProjectInfoByprojectId(projectId).call({
          from : this.getWallet().address,
        })
        .then(function(result){
          // result에 글쓴이, 마감기한, 보상금 정보가 Object로 담겨있음 
          alert(JSON.stringify(result));
        });
      },




      /* 프로젝트 보상금 분배 */

      handleDistributeReward : async function() {

        const sender = this.getWallet();

        // 누구에게 얼마를 줄지 가정
        const recipient = '0x4aff875cb544368fd51b8f7fda6d247582b5b87c';
        const reward = 100;

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.sendRewardToUser(recipient, reward).encodeABI(),
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);
          
        } catch(err){
          console.error(err);
        }

      },




      /* 프로젝트 마감 후 번역 기록 */

      handleStoreTranslationReport : async function() {

        const sender = this.getWallet();

        const projectId = 'projectId3';
        const translatorId = 'translatorId';
        const setenceList = [1, 2, 3];  // 몇번째 문장
        const translationList = [1, 2, 3];  // 몇번째 번역
        const listSize = 3; // 위 리스트 사이즈
        const share = 20; // 지분(%)

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.generateTranslationEvent(projectId, translatorId, setenceList, translationList, listSize, share).encodeABI(),
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);
          
        } catch(err){
          console.error(err);
        }

      },



      /* 프로젝트 마감 후 평가 기록 */

      handleStoreEvaluationReport : async function() {

        const sender = this.getWallet();

        const projectId = 'projectId3';
        const evaluatorId = 'evaluatorId';
        const setenceList = [1, 2, 3];  // 몇번째 문장
        const translationList = [1, 2, 3];  // 몇번째 번역을 평가했다
        const listSize = 3; // 위 리스트 사이즈
        const share = 20; // 지분(%)

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.generateEvaluationEvent(projectId, evaluatorId, setenceList, translationList, listSize, share).encodeABI(),
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);
          
        } catch(err){
          console.error(err);
        }

      },




      /* 토큰 구매 1 Klay == 10000 BLOT 으로 교환 */

      handleBuyTokens : async function() {

        const sender = this.getWallet();

        // 토큰을 지급할 구매자 지갑주소와 지불할 금액(단위 클레이)을 입력받아야 함
        const buyerAddress = this.getWallet().address;
        const klayNum = 1;  // 1 클레이 만큼 바꾼다 가정

        const pebNum = cav.utils.toPeb(klayNum, 'KLAY');

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.purchaseToken(buyerAddress, klayNum).encodeABI(),
            value : pebNum,
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);
          
        } catch(err){
          console.error(err);
        }


      },



      /* 토큰 환불 1 Klay == 10000 BLOT 으로 교환 */

      handleRefundTokens : async function() {

        const sender = this.getWallet();

        // 토큰을 환불할 구매자 지갑주소와 BLOT 수를 입력받아야 함
        const buyerAddress = this.getWallet().address;
        const BlotNum = 10000;  // 10000 BLOT 단위로 바꿔줌

        try {
          // transacetion sernder first signature
          const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: sender.address,
            to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
            data: blotMainContract.methods.sellToken(buyerAddress, BlotNum).encodeABI(),
            gas: '500000'
          }, sender.privateKey);
    
          // send first signature to fee payer in server
          this.sendSignedTransactionToFeePayer(senderRawTransaction);
          
        } catch(err){
          console.error(err);
        }

      },


      /* 여기서 부터는 이벤트 로그 기록 조회하는 기능*/


      /*  번역 활동 기록 불러오기 */

      handleTranslationLog : async function() {

        await blotMainContract.getPastEvents('NewTranslation', {
          filter: '',
          fromBlock: 0,
          toBlock: 'latest'          
        })
        .then(function(events) {
          // 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
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


      /*  평가 활동 기록 불러오기 */

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


      /*  컨트랙트에서 Klay 수신 내역 불러오기(토큰 구매 및 투자 기록) */

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



      /* 사용자별 신뢰도 조정 기록 */

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


      /* 프로젝트 등록 기록 */

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


      /* 토큰 송금 기록 */

      handleTokenTransactionLog : async function() {

        await blotTokenContract.getPastEvents('Transfer', {
          filter: '',
          fromBlock: 0,
          toBlock: 'latest'          
        })
        .then(function(events) {
          // 반환 결과 전체를 보면 로그 기록이 어느 블록에 저장되었는지부터 시작해서 정보가 쫙 뜸
          console.log(events);

          for(var i=0; i<events.length; i++) {
            console.log('sender Id : '+JSON.stringify(events[i].returnValues.from));
            console.log('recipient : '+JSON.stringify(events[i].returnValues.to));
            console.log('value : '+JSON.stringify(events[i].returnValues.value));
          }
        });
      },


        
      

}

window.App = App;

window.addEventListener("load", function () {
  App.start(); 
  $("#tabs").tabs().css({'overflow': 'auto'});
});

