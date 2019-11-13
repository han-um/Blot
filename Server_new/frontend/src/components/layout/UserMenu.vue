<template>
<ul class="nav navbar-nav">
  <li class="dropdown user user-menu" >
    <a v-if="isLoggedIn" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="this.$store.state.crntUserImg" class="user-image" alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{this.$session.get('username')}}</span>
    </a>
    <a v-else v-on:click="gotoLogin">
        <span class="hidden-xs"><i class="ri-login-box-line"></i></span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="padding:0px;height:auto;min-height:85px;padding-bottom:15px;">
        <div class="preview-box" v-bind:style="{ backgroundImage: 'url(' + this.$store.state.crntUserImg + ')' }">
            <div class="inner">
               <br><span class="name">{{this.$session.get('username')}}</span>
               <br><span class="email">{{this.$store.state.crntWalletId}}</span>
            </div>
        </div>
      </li>
      <li class="user-footer">
        <button class="myinfo" v-on:click="gotoMyInfo" >내 정보</button>
        <button class="logout" v-on:click="logoutActive" >로그아웃</button>
      </li>
    </ul>
  </li>
    <li class="line"> </li>
  <li>
      <a v-if="isLoggedIn"  v-on:click="$store.commit('TOGGLE_TOKEN_PURCHASE')">
          <div class="hidden-xs token-logo"><i class="tokenIcon ri-money-dollar-circle-line"></i></div>
          <div class="token-value hidden-xs"> {{this.$store.state.crntBlots}}</div>
      </a>
  </li>
    <li class="line"> </li>
  <li>
      <a v-if="isLoggedIn"  v-on:click="logoutActive">
          <span class="hidden-xs"><i class="ri-logout-box-line"></i></span>
      </a>
  </li>
  <li>
      <a v-if="isLoggedIn && isBlockChain">
          <span class="hidden-xs"><div class="fixed-box"><img class="klaytnlogo" src="/static/img/klaytn.png"></div></span>
      </a>
      <a v-if="isLoggedIn && !isBlockChain" v-on:click="$store.commit('TOGGLE_BLOCKCHAIN_LOGIN')">
          <span class="hidden-xs"><i class="yellow ri-login-circle-line"></i></span>
      </a>
  </li>
</ul>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  data () {
    return {
      isLoggedIn: false,
      isBlockChain: false
    }
  },
  methods: {
    logoutActive() {
      // 세션 삭제
      this.$session.destroy()
      // 세션스토리지 삭제
      sessionStorage.removeItem('walletInstance')
      this.isLoggedIn = false
      this.$store.commit('SET_IS_LOGGED_IN', false)
      this.$store.commit('HIDE_BLOCKCHAIN_LOGIN')
      this.$store.commit('HIDE_TOKEN_PURCHASE')
      this.$router.replace(this.$route.query.redirect || '/')
    },
    gotoLogin() {
      this.$router.replace(this.$route.query.redirect || '/login/')
    },
    gotoMyInfo() {
      this.$router.replace(this.$route.query.redirect || '/myinfo/')
    },
    checkLoggedIn() {
      // 로그인 체크
      if (this.$session.has('username')) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
    checkBlockChain() {
      // 블록체인 로그인 체크
      if (sessionStorage.getItem('walletInstance')) {
        this.isBlockChain = true
      } else {
        this.isBlockChain = false
      }
    },
    refreshUserMenu() {
      this.checkLoggedIn()
      this.checkBlockChain()
      if (this.$session.has('username')) {
        this.$store.dispatch('REFRESH_CURRENT_WALLET_ID', this.$session.get('username'))
        this.$store.dispatch('REFRESH_CURRENT_BLOTS_BY_ID', this.$session.get('username'))
        this.$store.dispatch('REFRESH_CURRENT_USER_IMAGE', this.$session.get('username'))
      }
    }
  },
  mounted () {
    console.log(this.$session.has('username'))
    this.refreshUserMenu()
    this.$root.$on('UserMenu', () => {
      this.refreshUserMenu()
    })
  }
}
</script>
<style scoped>
    .logout {
        width:100%;
        border:0px;
        background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
        color:white;
        height:30px;
    }
    .login {
        padding:5px;
        margin-top:10px;
        margin-right:10px;
        border:0px;
        background:none;
        color:
    }
.dropdown-menu {
  color:black;
}
    .user-header p span, small{
        color:black;
    }
    
    .navbar-nav > li > a > span > i {
        font-size:20px;
    }
    
    .token-value {
        display:inline;
        line-height: 0px;
        color:#FBC02D;
    }
    
    .yellow {
        color:#FBC02D;
        font-weight:900;
    }
    
    .klaytnlogo {
        width:15px;
          position: relative;
  -webkit-animation: mymove 1s infinite; /* Safari 4.0 - 8.0 */
  animation: mymove 1s infinite;
  animation-direction: alternate;
    }
    
/* Safari 4.0 - 8.0 */
@-webkit-keyframes mymove {
  from {width: 18px; height:18px;}
  to {width: 20px; height:20px}
}

@keyframes mymove {
  from {width: 18px; height:18px;}
  to {width: 20px; height:20px}
}
    .fixed-box {
        width:30px;
    }
    .token-logo {
        font-size:20px;
        vertical-align: middle;
        display:inline;
        color:#FBC02D;
    }
    .line {
      width:1px;
      border-left:1px solid #C5C5C5;  
      vertical-align: middle;
        height:20px;
        margin-top:15px;
    }
    .preview-box {
        width:100%;
        height:200px;
        background-color:white;
        background-size:cover;
    }
    
    .preview-box .inner {
        position:absolute;
        width:100%;
        height:200px;
        background-color:rgba(0,0,0,0.5);
        text-align: left;
        padding:20px;
        padding-top:120px;
        line-height: 18px;
    }
    .preview-box .inner .name {
        font-size:35px;
        color:white;
    }
    .preview-box .inner .email {
        color:white;
        font-weight: 100;
        font-size:10px;
    }
    .myinfo {
        width:100%;
        border:0px;
        background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
        color:white;
        height:30px;
        margin-bottom:10px;
    }
</style>
