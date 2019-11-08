<template>
  <div v-if="this.$store.state.showPurchase" >
          <div class='container' id='login-section'>
          <!-- 로그인 -->
          <div class="row">
            <div class="col-md-8"></div>
            <div class="col-md-4">
                <div class="inner-box">
                    <div class="header">BLOT 구매</div>
                    <div class="input-box">
                        <input type="text" placeholder="금액을 입력하세요...">
                        <div class="small-icon"><i class="ri-bit-coin-line"></i></div><div class="small-text"> Blot 구매량 <b>20</b></div><br>
                        <div class="small-icon"><i class="ri-bit-coin-line"></i></div><div class="small-text"> 구매 후 전체 Blot <b>20</b></div>
                    </div>
                    <div class="button-box">
                        <button>+5000원</button>
                        <button>+10000원</button>
                        <button>+20000원</button>
                        <button>+50000원</button>
                        <button>+100000원</button>
                        <button>+500000원</button>
                    </div>
                    <div class="type-box">
                        <div class="type-inner">s</div>
                        <div class="type-inner">s</div>
                        <div class="type-inner">s</div>
                        <div class="type-inner">s</div>
                    </div>
                </div>
            </div>
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
  name: 'TokenPurchase',
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
    .inner-box{
        background-color:white;
        height:calc(100vh - 50px);
        border: 3px solid #FBC02D;
        border-top: 0px;
        color:white;
    }
    .inner-box .header {
        font-size:18px;
        text-align: right;
        padding:20px;
        padding-bottom:10px;
        background-color:#E8E8E8;
        color:#6B6B6B;
    }
    .inner-box .input-box {
        background-color:#FBC02D;
        height:175px;
        width:calc(100% - 30px);
        margin:15px;
        padding:20px;
    }
    .inner-box .input-box .small-icon{
        display:inline;
        font-size:17px;
        vertical-align: middle;
        line-height: 5px;
    }
    .inner-box .input-box .small-text{
        display:inline;
        font-weight: 300;
    }
    .inner-box .input-box input {
        background:none;
        border:none;
        color:white;
        font-size:30px;
        font-weight: 600;
        margin-top:30px;
    }
    .inner-box .input-box input::placeholder {
        color:white;
    }
    .inner-box .input-box input:focus{
        outline:none;
    }
    .button-box {
        padding-left:20px;
        padding-right:20px;
        padding-bottom:20px;
        border-bottom:2px solid #E8E8E8;
    }
    .button-box button {
        background-color:#E8E8E8;
        border:none;
        color:#6B6B6B;
        padding:10px;
        margin:0px;
        margin-bottom:8px;
        margin-left:2px;
        margin-right:2px;
    }
    .type-box {
        padding-top:20px;
        padding-left:20px;
        padding-right:20px;
    }
    .type-box .type-inner {
        border:2px solid #E8E8E8;
        width:70px;
        height:70px;
        display:inline-block;
        margin-right:5px;
    }

</style>
