<template>
    <div style="width:100%">
      <transition enter-active-class="animated fadeIn">
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
              <center><router-link to="/login/"><button>로그인</button></router-link><button class="agree-next-button" v-on:click="nowPage='input'" :disabled="!(agreeChecked1 && agreeChecked2 && agreeChecked3)">다음</button></center>
          </div>
      </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
      <div class="register-div" v-if="nowPage==='input'">
          <div class="row" style="padding:6px;">
              <h1>회원가입</h1>
              <div class="p-0 col-xs-12 col-md-6">
                  <h4>계정 정보 (필수)</h4>
                  <div class="inner-box">
                      <form>
                          <input type="text" v-model="inpUserId" placeholder="이름" name="username" id="username">
                          <input type="password" v-model="inpPassword" placeholder="비밀번호" name="password" id="password">
                          <input type="password" v-model="inpPasswordRe" placeholder="비밀번호 재입력" name="password-re" id="password-re">
                          <input type="text" v-model="inpEmail" placeholder="이메일" name="email" id="email">
                          <button class="email-button"><i class="ri-send-plane-fill"></i></button>
                      </form>
                      <br>
                      <input class="input-file" type="file" name="myfile" ref='userImage' id="real-file-input">
                      <label for="real-file-input" class="fake-file-input">프로필 이미지</label>
                  </div>
              </div>
              <div class="p-0 col-xs-12 col-md-6">
                  <h4>블록체인 정보</h4>
                  <div class="inner-box">
                      <button class="klaytn-button">Klaytn 계정 만들기</button>
                      <center><small><u> 공개 키를 어떻게 얻을 수 있나요? </u></small></center>
                      <input type="text"  v-model="inpWAddr" placeholder="공개 키" name="blockchain" id="blockchain">
                      <div class="caution">
                      > 입력하지 않을 경우, 열람 이외의 활동을 할 수 없습니다. <u>왜 필요한가요?</u> <br> > 블록체인 정보는 회원가입 이후에도 입력할 수 있습니다.
                      </div>
                  </div>
              </div>
          </div>
          <center><span class="error-msg">{{errorMsg}}</span></center>
          <div class="login-buttons">
            <center><button v-on:click="nowPage='agree'">이전</button><button v-on:click="RegisterPost()">회원가입</button></center>
          </div>
      </div>
      </transition>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  components: {
  },
  data: function () {
    return {
      agreeChecked1: false,
      agreeChecked2: false,
      agreeChecked3: false,
      nowPage: 'agree',
      errorMsg: '',
      inpUserId: '',
      inpPassword: '',
      inpPasswordRe: '',
      inpEmail: '',
      inpWAddr: '',
      inpImage: ''
    }
  },
  methods: {
    AgreeAll: function (event) {
      this.agreeChecked1 = true
      this.agreeChecked2 = true
      this.agreeChecked3 = true
    },
    ValidCheck: function (event) {
    },
    RegisterPost: function (event) {
      this.inpImage = this.$refs.userImage.files[0]
      const formData = new FormData()
      formData.append('userfile', this.inpImage)
      axios.post('/api/files/upload', formData).then(res => {
        axios.post('/api/user/', {userId: this.inpUserId, password: this.inpPassword, email: this.inpEmail, wAddr: this.inpWAddr, image: res.data})
        .then(res2 => {
          console.log(res2)
        })
      })
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
    
    .inner-box {
        border:0.5px solid white;
        margin:3px;
        padding:6px;
        height:200px;
    }
    
    .inner-box input {
        background-color:rgba(255,255,255,0.16);
        color:white;
        text-align:center;
        width:100%;
        margin-bottom:6px;
        font-size:12px;
        height:30px;
        border:0px;
    }
    
    #email {
        margin-bottom:0px;
        width:calc(100% - 36px)
    }
    
    .email-button {
        padding:2px;
        vertical-align: middle;
        background-color:rgba(255,255,255,0.7);
        color:gray;
        width:30px;
        height:30px;
        float:right;
        border:0px;
    }
    
    .klaytn-button {
        background-color:rgba(255,255,255,0.7);
        color:gray;
        border:0px;
        width:100%;
        height:30px;
        margin-bottom:6px;
    }
    
    #blockchain {
        margin-top:6px;
        margin-bottom:0px;
    }
    
    .caution {
        margin-top:12px;
        font-size:10px;
        font-weight: 100;
        text-align: center;
    }
    
    .error-msg {
        text-align: center;
        font-size:12px;
        color:red;
    }
    #real-file-input {
        display:none;
    }
    .fake-file-input { 
        background-color:rgba(255,255,255,0.7);
        color:gray;
        border:0px;
        width:100%;
        height:30px;
        margin-bottom:6px;
        text-align: center;
        line-height: 30px;
    }
    .fake-file-input:hover {
        background-color:rgba(255,255,255,0.9);
    }
    
</style>
