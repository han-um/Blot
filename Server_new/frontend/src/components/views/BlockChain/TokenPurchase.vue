<template>
  <div v-if="this.$store.state.showPurchase" >
          <div class='container' id='login-section'>
          <!-- 로그인 -->
          <div class="row">
            <div class="col-md-7 col-lg-9" v-on:click="$store.commit('HIDE_TOKEN_PURCHASE')">
                <div class="click-box"></div>
                </div>
            <div class="col-md-5 col-lg-3">
                <div class="inner-box">
                    <div class="header">BLOT 구매 및 판매</div>
                        <div class="box-body">
                        <!--경고창-->
                        <transition-group enter-active-class="animated zoomIn" tag="div">
                        <div v-if="showAlert" class="alert alert-dismissible colors" v-bind:key="123" >
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <h4><i class="icon fa fa-check"></i>{{alertTitle}}</h4>
                            {{alertDesc}}
                          </div>
                        </transition-group>
                        <!--Klay잔고 표시-->
                        <div class="small-box" style="background-color:#5CD590">
                            <div class="inner">
                              <h3>{{this.$store.state.crntKlays}} <small>klay</small></h3>
                              <p>현재 Kalytn 잔고</p>
                            </div>
                            <div class="icon">
                              <i class="fa fa-shopping-cart"></i>
                            </div>
                            <a href="https://www.klaytn.com/" target="_blank" class="small-box-footer">
                              More info <i class="fa fa-arrow-circle-right"></i>
                            </a>
                          </div>
                        <!--토큰 구매-->
                         <div class="small-box" style="background-color:#FBC02D">
                        <div class="inner">
                          <h3>{{inpToken}} <small>Blot</small></h3>
                          <p>구매 신청</p>
                        </div>
                        <div class="icon">
                          <i class="ri-bit-coin-line"></i>
                        </div>
                        <div class="button-box">
                            <button v-on:click="addInpToken(10000)">+10000</button>
                            <button v-on:click="addInpToken(20000)">+20000</button>
                            <button v-on:click="addInpToken(50000)">+50000</button>
                            <button v-on:click="setInpToken(0)">RESET</button>
                        </div>
                        <div class="submit-btn" v-on:click="purchaseToken()">구매하기</div>
                      </div>
                        <!--토큰 판매-->
                      <div class="small-box" style="background-color:#EFEFEF;color:#C5C5C5">
                        <div class="inner">
                          이 기능은 비활성화되었습니다
                          <p>판매 신청</p>
                        </div>
                        <div class="icon">
                          <i class="ri-bit-coin-line"></i>
                        </div>
                           <div class="button-box">
                            <button v-on:click="addInpToken(10000)">+10000</button>
                            <button v-on:click="addInpToken(20000)">+20000</button>
                            <button v-on:click="addInpToken(50000)">+50000</button>
                            <button v-on:click="setInpToken(0)">RESET</button>
                        </div>
                        <div class="submit-btn" style="background-color:#EFEFEF">판매하기</div>
                      </div>
                      <!---->
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Caver from 'caver-js'
// import contractInfo from './contractInfo'
// const cav = new Caver('https://api.baobab.klaytn.net:8651/')

export default {
  name: 'TokenPurchase',
  data () {
    return {
      inpToken: 0,
      calcToken: null,
      showAlert: false,
      alertTitle: '',
      alertDesc: '',
      alertcolor: ''
    }
  },
  methods: {
    addInpToken(num) {
      this.inpToken = this.inpToken + num
    },
    setInpToken(num) {
      this.inpToken = num
    },
    purchaseToken() {
      console.log('지갑:' + this.$store.state.crntWalletId)
      var payload = {'userAddress': this.$store.state.crntWalletId, 'klayNum': this.inpToken / 10000}
      this.$store.dispatch('PURCHASE_BLOT_TOKEN', payload)
      .then(function (transactionInfo) {
        console.log(transactionInfo)
        return axios.post('/api/project/sign', {rawTransaction: transactionInfo.rawTransaction})
      })
      .then(res => {
        this.$store.dispatch('REFRESH_CURRENT_BLOTS_BY_ADDR', payload.userAddress)
        this.alertTitle = '토큰 구매 성공'
        this.alertDesc = '잔고에 토큰이 충전되었습니다.'
        this.alertColor = '#5CD590'
        this.showAlert = true
      })
      .catch(err => {
        console.log(err)
        if (sessionStorage.getItem('walletInstance') == null) {
          this.$store.commit('SHOW_BLOCKCHAIN_LOGIN')
          this.$store.commit('HIDE_TOKEN_PURCHASE')
        }
        this.alertTitle = '토큰 구매 실패'
        this.alertDesc = '충분한 Klay를 보유중 or 블록체인 로그인 여부를 확인하세요.'
        this.alertColor = '#dd4b39'
        this.showAlert = true
      })
    },
    async getKlay() {
      await this.$store.dispatch('REFRESH_KLAY_BALANCE_BY_ADDR', this.$session.get('username'))
    }
  },
  mounted () {
    this.getKlay()
  }
}
</script>

<style scoped>
    .container {
      background-color:rgba(0,0,0,0.4);
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
        border-top: 0px;
        color:white;
    }
    .inner-box .header {
        font-size:15px;
        text-align: right;
        padding:10px;
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
        padding-left:10px;
        padding-right:10px;
        padding-bottom:20px;
        border-bottom:2px solid #E8E8E8;
    }
    .button-box button {
        background-color:#E8E8E8;
        border:none;
        color:#6B6B6B;
        padding:5px;
        margin:0px;
        margin-bottom:8px;
        margin-left:2px;
        margin-right:2px;
        font-size:13px;
    }
    .type-box {
        padding-top:20px;
        padding-left:20px;
        padding-right:20px;
    }
    .type-box .type-inner {
        width:100%;
        height:30px;
        margin-bottom:10px;
        background-color:#E8E8E8;
        color:darkgray;
    }
    .type-box .type-inner .icon {
        display:inline-block;
        width:50px;
        text-align: center;
        vertical-align: middle;
        padding-top:2px;
        font-size:20px;
        background-color:#6B6B6B;
    }
    .submit-btn {
        bottom:0px;
        height:30px;
        background-color:#FBC02D;
        padding:5px;
        font-size:15px;
        text-align: center;
    }
    .back-btn{
        bottom:0px;
        height:50px;
        background-color:#6B6B6B;
        padding:12px;
        font-size:17px;
    }
    .click-box {
        height:100vh;
        width:100%;
    }
    .inner h3 small {
        color:white;
        font-size:18px;
    }
    .colors {
        background-color:#6B6B6B;
    }
</style>
