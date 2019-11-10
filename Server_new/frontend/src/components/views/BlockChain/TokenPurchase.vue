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
                        <input type="text" v-model="inpToken" placeholder="금액을 입력하세요..."><br>
                        <div class="small-icon"><i class="ri-bit-coin-line"></i></div><div class="small-text"> 원화 금액 <b>{{calcToken}}</b></div><br>
                        <!--
                        <div class="small-icon"><i class="ri-bit-coin-line"></i></div><div class="small-text"> 구매 후 전체 Blot <b>s</b></div>
                        -->
                    </div>
                    <div class="button-box">
                        <button v-on:click="addInpToken(10000)">+10000blot</button>
                        <button v-on:click="addInpToken(20000)">+20000blot</button>
                        <button v-on:click="addInpToken(50000)">+50000blot</button>
                        <button v-on:click="addInpToken(100000)">+100000blot</button>
                        <button v-on:click="setInpToken(0)">RESET</button>
                    </div>
                    <div class="type-box">
                        <div class="type-inner"><div class="icon"><i class="ri-bit-coin-line"></i></div> 신용카드 결제 </div>
                        <div class="type-inner"><div class="icon"><i class="ri-bit-coin-line"></i></div> 휴대폰 소액결제 </div>
                        <div class="type-inner"><div class="icon"><i class="ri-bit-coin-line"></i></div> 간편결제 </div>
                    </div>
                    <div class="submit-btn" v-on:click="purchaseToken()">구매하기</div>
                    <div class="back-btn">돌아가기</div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import Caver from 'caver-js'
// import contractInfo from './contractInfo'
// const cav = new Caver('https://api.baobab.klaytn.net:8651/')

export default {
  name: 'TokenPurchase',
  data () {
    return {
      inpToken: null,
      calcToken: null
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
      var payload = {'userAddress': this.$store.state.crntWalletId, 'klayNum': this.inpToken / 10000}
      this.$store.dispatch('PURCHASE_BLOT_TOKEN', payload)
      alert('!!')
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
        margin-top:100px;
        bottom:0px;
        height:50px;
        background-color:#FBC02D;
        padding:12px;
        font-size:17px;
    }
    .back-btn{
        bottom:0px;
        height:50px;
        background-color:#6B6B6B;
        padding:12px;
        font-size:17px;
    }

</style>
