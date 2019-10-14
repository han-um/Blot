<template>
<ul class="nav navbar-nav">
  <li class="dropdown user user-menu" >
    <a v-if="isLoggedIn" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="user.avatar" class="user-image" alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{this.$session.get('username')}}</span>
    </a>
    <a v-else v-on:click="gotoLogin">
        <span class="hidden-xs">로그인/회원가입</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{this.$session.get('username')}}</span>
          <small style="font-size:10px;"> <br> 지갑 주소 : {{this.$store.state.crntWalletId}}</small>
        </p>
      </li>
      <li class="user-footer">
        <button class="logout" v-on:click="logoutActive" >로그아웃</button>
      </li>
    </ul>
  </li>
  <li>
      <a v-if="isLoggedIn">
          <span class="hidden-xs">{{this.$store.state.crntBlots}}</span>
      </a>
  </li>
  <li>
      <a v-if="isLoggedIn && isBlockChain">
          <span class="hidden-xs">로그인됨 표시</span>
      </a>
      <a v-if="isLoggedIn && !isBlockChain">
          <span v-on:click="$store.commit('TOGGLE_BLOCKCHAIN_LOGIN')" class="hidden-xs">블록체인 로그인</span>
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
      this.$router.replace(this.$route.query.redirect || '/')
    },
    gotoLogin() {
      this.$router.replace(this.$route.query.redirect || '/login/')
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
        console.log(sessionStorage.getItem('walletInstance'))
        this.isBlockChain = true
      } else {
        this.isBlockChain = false
      }
    },
    refreshUserMenu() {
      this.checkLoggedIn()
      this.checkBlockChain()
      if (this.$session.has('username')) {
        this.$store.dispatch('REFRESH_CURRENT_WALLET_ID', 'xcx')
        this.$store.dispatch('REFRESH_CURRENT_BLOTS', 'xcx')
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
</style>
