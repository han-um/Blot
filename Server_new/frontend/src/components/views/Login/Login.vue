<template>
<transition enter-active-class="animated bounceIn">
  <div class="login-form">
          <router-link to="/"><i class="ri-shape-2-fill"></i>
          <div class="logo-title">blot</div></router-link>
          <input type="text" v-model="inpUsername" placeholder="계정 이름"><br>
          <div class="password-box">
              <input type="password" v-model="inpPassword" id="password" placeholder="암호">
              <button class="login-button" v-on:click="loginActive()"><i class="ri-send-plane-fill"></i></button>
          </div>
          <div class="login-menu">
              <router-link to="register">> 회원가입</router-link>
          </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  components: {
  },
  data: function () {
    return {
      inpUsername: '',
      inpPassword: ''
    }
  },
  computed: {
  },
  methods: {
    loginActive() {
      axios.get('/api/user/' + this.inpUsername + '/password/' + this.inpPassword)
      .then(res => {
        if (res.data === true) {
          this.$session.set('username', this.inpUsername)
          console.log(this.$session.get('username'))
          this.$store.commit('SET_IS_LOGGED_IN', true)
          this.$router.replace(this.$route.query.redirect || '/')
        } else {
          this.$swal('로그인 실패', '아이디 혹은 비밀번호가 잘못되었습니다.', 'error')
        }
      })
    }
  }
}
</script>

<style scoped>
    .login-form {
        width:100%;
        text-align: center;
        align-content: center;
        align-items: center;
        color:white;
    }
    .login-form i {
        font-size:50px;
    }
    .login-form .logo-title {
        font-size:25px;
        line-height: 15px;
        font-weight: 600;
        margin-bottom:20px;
    }
    
    .login-form a {
        color:white;
    }
    
    .login-form input {
        background-color:rgba(255,255,255,0.16);
        color:white;
        text-align:center;
        margin-bottom:6px;
        font-size:12px;
        height:30px;
        border:0px;
        width:300px;
    }
    .password-box {
         display: inline-block;
        width:300px;
    }
    #password {
        margin-bottom:0px;
        width:calc(300px - 36px);
        padding-left:30px;
        float:left;
    }
    
    .login-button {
        margin:0px;
        padding:2px;
        vertical-align: middle;
        background-color:rgba(255,255,255,0.7);
        color:gray;
        width:30px;
        height:30px;
        border:0px;
        float:right;
    }
    .login-button i {
        font-size:20px;
    }
    .login-menu {
        padding:20px;
        font-size:12px;
    }
</style>
