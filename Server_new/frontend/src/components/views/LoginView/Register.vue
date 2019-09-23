<template>
    <div>
      <div class="register-div" v-if="nowPage==='agree'">
          <h1>회원가입</h1>
          <div class="row title-box">
              <div class="col-xs-12 col-md-6"><div class="r-title-box">회원약관</div></div> 
              <div class="col-xs-12 col-md-6"><input type="checkbox" id="agree1" v-model="agreeChecked1"><label for="agree1"><span>회원약관에 동의합니다.(필수)</span></label></div>
          </div>
          <pre class="register-inner"> 
    제 1 조 (목적)
    1. 본 약관은 Blot 사이트가 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 Blot 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
    제 2 조 (약관의 효력과 변경)
    1. Blot 사이트는 귀하가 본 약관 내용에 동의하는 경우 Blot 사이트의 서비스 제공 행위 및 귀하의 서비스 사용 행위에 본 약관이 우선적으로 적용됩니다.
    2. Blot 사이트는 본 약관을 사전 고지 없이 변경할 수 있고 변경된 약관은 Blot 사이트 내에 공지하거나 e-mail을 통해 회원에게 공지하며, 공지와 동시에 그 효력이 발생됩니다.
          </pre>
          <div class="row title-box">
              <div class="col-xs-12 col-md-6"><div class="r-title-box">개인정보 수집 및 이용 동의</div></div> 
              <div class="col-xs-12 col-md-6"><input type="checkbox" id="agree2" v-model="agreeChecked2"><label for="agree2"><span>개인정보 수집 및 이용에 동의합니다.(필수)</span></label></div>
          </div>
          <pre class="register-inner">
    제 1 조 (목적)
    1. 본 약관은 Blot 사이트가 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 Blot 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
    제 2 조 (약관의 효력과 변경)
    1. Blot 사이트는 귀하가 본 약관 내용에 동의하는 경우 Blot 사이트의 서비스 제공 행위 및 귀하의 서비스 사용 행위에 본 약관이 우선적으로 적용됩니다.
    2. Blot 사이트는 본 약관을 사전 고지 없이 변경할 수 있고 변경된 약관은 Blot 사이트 내에 공지하거나 e-mail을 통해 회원에게 공지하며, 공지와 동시에 그 효력이 발생됩니다.
          </pre>
          <div class="row title-box">
              <div class="col-xs-12 col-md-6"><div class="r-title-box">번역 데이터의 수집 및 이용 동의</div></div> 
              <div class="col-xs-12 col-md-6"><input type="checkbox" id="agree3" v-model="agreeChecked3"><label for="agree3"><span>번역 데이터의 수집 및 이용에 동의합니다.(필수)</span></label></div>
          </div>
          <pre class="register-inner">
    제 1 조 (목적)
    1. 본 약관은 Blot 사이트가 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 Blot 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
    제 2 조 (약관의 효력과 변경)
    1. Blot 사이트는 귀하가 본 약관 내용에 동의하는 경우 Blot 사이트의 서비스 제공 행위 및 귀하의 서비스 사용 행위에 본 약관이 우선적으로 적용됩니다.
    2. Blot 사이트는 본 약관을 사전 고지 없이 변경할 수 있고 변경된 약관은 Blot 사이트 내에 공지하거나 e-mail을 통해 회원에게 공지하며, 공지와 동시에 그 효력이 발생됩니다.
          </pre>
          <br>
          <div class="login-buttons">
              <center><button v-on:click="AgreeAll">위 내용에 모두 동의합니다</button></center>
              <center><button>로그인</button><button class="agree-next-button" v-on:click="nowPage='input'" :disabled="!(agreeChecked1 && agreeChecked2 && agreeChecked3)">다음</button></center>
          </div>
      </div>
      <div class="register-div" v-if="nowPage==='input'">
          <div class="row">
          </div>
          <div class="login-buttons">
            <center><button v-on:click="nowPage='agree'">이전</button></center>
          </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Register',
  components: {
  },
  data: function () {
    return {
      agreeChecked1: false,
      agreeChecked2: false,
      agreeChecked3: false,
      nowPage: 'agree'
    }
  },
  methods: {
    AgreeAll: function (event) {
      this.agreeChecked1 = true
      this.agreeChecked2 = true
      this.agreeChecked3 = true
    }
  },
  computed: {
  }
}
</script>

<style scoped>
    input[type="checkbox"] + label {
        float: right;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #FFFFFF;
        cursor: pointer;
        padding:0px;
        margin-top:12px; /*다른데서 사용할땐 제거*/
        margin-bottom:0px;
        vertical-align: middle;
        right:50px;
    }
    
    input[type="checkbox"]:checked + label {
        color:white;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3cpath fill='none' d='M0 0h24v24H0z'/%3e%3cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='%23fff'/%3e%3c/svg%3e");
        background-size:cover;
    }
    
    input[type="checkbox"] + label span {
        padding:0px;
        margin:0px;
        line-height: 12px;
        font-size:13px;
        font-weight: 600;
        vertical-align: middle;
        position: absolute; right:40px; display: block; 
    }

    input[type="checkbox"] {
        display:none;
    }
    
    .register-div {
        color:white;
        width:100%;
    }
    
    .register-div h1 {
        font-weight: 900;
    }
    
    .register-inner {
        white-space: pre-wrap; /* CSS3*/
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-all; /* Internet Explorer 5.5+ */ 
        overflow-x: none;
        overflow-y: auto;
        height:120px;
        font-family: 'Noto Sans KR', sans-serif;
        line-height: 20px;
        font-weight: 100;
        font-size:11px;
        background:none;
        color:white;
        border-radius: 0;
        border:0.5px solid rgba(255,255,255,0.9);
    }
    .agree-box {
        vertical-align: middle;
        margin-top:10px;
        width:150px;
    }
    .r-title-box {
        font-size:20px;
        float:left;
    }
    .title-box{
        height:35px;
    }
    
    .login-buttons button {
    }
    
    .agree-next-button {
        background-color:#5CD590;
    }
    
    .agree-next-button:disabled {
        color:white;
        background-color:gray;
    }
    
</style>
