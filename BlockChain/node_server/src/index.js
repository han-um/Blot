/**
 * caver-js library make a connection with klaytn node.
 * You could connect to specific klaytn node by changing 'rpcURL' value.
 * If you are running a klaytn full node, set rpcURL to your node's URL.
 * ex) rpcURL: 'http://localhost:8551'
 * default rpcURL is 'https://api.baobab.klaytn.net:8651/'.
 */
import Caver from 'caver-js';

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651/'
}

const cav = new Caver(config.rpcURL)

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

    changeUI: async function (walletInstance) {
      $('#login-section').hide();
      $('#user-info').show();
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
          alert(privateKey);
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
}

window.App = App;

window.addEventListener("load", function () {
  App.start(); 
  $("#tabs").tabs().css({'overflow': 'auto'});
});

