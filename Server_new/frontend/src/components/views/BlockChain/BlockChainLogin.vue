<template>
  <div v-if="this.$store.state.showBlockChainLogin" >
          <div class='container' id='login-section'>
          <!-- 로그인 -->
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8 col-centered div-middle">      
              <!--여기부터 실제 내용-->
              <div class="beforLogin white-box">
                <div id="tabs">
                    <h2>블록체인 로그인</h2>
                    <small>이 기능을 이용하려면 블록체인 로그인을 진행해야 합니다. 신뢰성을 유지하기 위하여 블록체인 정보는 서버에 저장되지 않습니다.</small><br><br>
                <div class="msg-box">
                  {{errorMsg}}
                </div><br>
                <div class="inner-box">
                  <div class="proj-submenu">
                        <a class="active">키스토어로 인증</a>
                        <a>비밀 키로 인증</a>
                    </div>
                  <!-- 키스토어로 로그인 -->
                  <div id="myKeystore">  
                    <!-- 키스토어 -->
                    <div class="form-group">
                      <label for="keystore">Keystore</label>
                      <input type="file" id="keystore" v-on:change="handleImport()">
                    </div>
                    <!-- 비밀번호 -->
                    <div class="form-group">
                      <label for="input-password">비밀번호</label>
                      <input type="password" class="form-control" id="input-password"  v-model="password" onchange="App.handlePassword()">
                      <p class="help-block" id="message"></p>
                    </div>
                    <div class="info-footer">
                    <button type="button" class="btn btn-primary" id="submit" v-on:click="$store.commit('TOGGLE_BLOCKCHAIN_LOGIN')" >돌아가기</button>
                      <button type="button" class="btn btn-primary" id="submit" v-on:click="handleLoginByKeyStore()">제출</button>
                    </div>
                  </div>
                  
                  <!-- 비밀키로 로그인
                  <div id="myPrivateKey">
                      <div class="form-group">
                        <label for="input-private-key">비밀키</label>
                        <input type="password" class="form-control" id="input-private-key">
                      </div>
                      <div class="info-footer">
                        <button type="button" class="btn btn-primary" id="submit" onclick="App.handleLoginByPrivateKey()">제출</button>
                      </div>
                  </div>-->
                </div>
              </div>
            </div>
            </div>
            <div class="col-md-2"></div>
          </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Caver from 'caver-js'
// import contractInfo from './contractInfo'
const cav = new Caver('https://api.baobab.klaytn.net:8651/')

export default {
  name: 'BlockChainLogin',
  data () {
    return {
      errorMsg: '',
      password: ''
    }
  },
  methods: {
    handleImport() {
      const fileReader = new FileReader()
      fileReader.readAsText(event.target.files[0])
      fileReader.onload = (event) => {
        console.log(event)
        try {
          if (!this.checkValidKeystore(event.target.result)) {
            this.errorMsg = '유효하지 않은 파일입니다.'
            return
          }
          this.$store.commit('SET_KEYSTORE', event.target.result)
          // this.auth.keystore = event.target.result
          this.errorMsg = 'Keystore통과. 비밀번호를 입력하세요.'
          document.querySelector('#input-password').focus()
        } catch (event) {
          this.errorMsg = 'ERROR :' + event
          return
        }
      }
    },
    checkValidKeystore(keystore) {
      const parsedKeystore = JSON.parse(keystore)
    // 파일 내용이 keystore 파일이면 가져야할 필드를 포함하고 있는지 확인
      const isValidKeystore = parsedKeystore.version &&
      parsedKeystore.id &&
      parsedKeystore.address &&
      parsedKeystore.crypto
      return isValidKeystore
    },
    handleLoginByKeyStore() {
      try {
        const privateKey = cav.klay.accounts.decrypt(this.$store.state.keystore, this.password).privateKey
        this.integrateWallet(privateKey)
        this.$store.state.accessType === 'keystore'
      } catch (e) {
        this.errorMsg = '비밀번호가 잘못되었습니다!'
      }
    },
    integrateWallet(privateKey) {
       // walletInstance는 계정 정보라고 생각하면 된다.
      const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)
        // walletInstance를 wallet에 저장하여 트랜잭션 일으킬 때, 이 계정 정보를 활용
      cav.klay.accounts.wallet.add(walletInstance)
        // walletInstance를 세션 스토리지에 저장  >> 계정이 로그인 된 상태를 유지하기 위함(페이지 이동, 새로고침해도 유지됨)
        // 세션 스토리지는 탭이 닫히거나 브라우저가 닫힐 때까지 브라우저 내의 저장공간에 walletInstance 인스턴스를 저장
      sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
      // console.log(walletInstance)
      // 최종 화면 처리
      this.endState()
    },
    endState() {
      this.$root.$emit('UserMenu') // 유저메뉴 다시 불러오기
      this.$store.commit('HIDE_BLOCKCHAIN_LOGIN') // 로그인창 가리기
      this.$swal('로그인 성공', '이제 블록체인 관련 기능을 모두 이용할 수 있습니다.', 'success')
    }
  },
  mounted () {}
}
</script>

<style scoped>
    .container {
      background-color:rgba(0,0,0,0.9);
      position:fixed;
      top:50px;
      left:0px;
      width:100%;
      height:100vh;
      z-index:2000;
    }
    .white-box {
        background-color:#242424;
        width:100%;
        padding:20px;
        padding-top:40px;
    }
    .div-middle {
        min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 90vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
    }
    
    #tabs h2 {
        padding:0px;
        margin:0px;
        color:white;
        font-size:36px;
        font-weight: 900;
    }
    #tabs small {
        color:gray;
    }
    #tabs {
        color:white;
    }
    .inner-box {
        //padding:10px;
        background-color:#4E4E4E;
    }
    .proj-submenu {
        color:white;
        border-bottom: 1px solid gray;
        width:100%;
        height:35px;
        padding-top:10px;
        padding-left:20px;
        margin-bottom:10px;
    }
    
    .proj-submenu a {
        color:white;
        padding-right:10px;
        padding-left:10px;
        padding-bottom:5px;
        font-weight: 400;
    }
    
    .proj-submenu > .active{
        font-weight: 600;
        border-bottom:solid white 2px;
    }
    #myKeystore {
        padding:20px;
    }
    .msg-box{
        width:100%;
        background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
        padding:5px;
        padding-left:30px;
    }
    .animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:none!important;animation-fill-mode:none!important;z-index:4000;}
</style>
