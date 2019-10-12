<template>
  <li class="dropdown user user-menu" v-if="isLoggedIn">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="user.avatar" class="user-image" alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{this.$session.get('username')}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{this.$session.get('username')}}</span>
          <small v-for="role in user.roles" :key="role">{{role}}</small>
        </p>
      </li>
      <li class="user-footer">
        <button class="logout" v-on:click="logoutActive" >logout</button>
      </li>
    </ul>
  </li>
  <li v-else>
    <button class="login" v-on:click="gotoLogin" >로그인 / 회원가입</button>
  </li>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  data () {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    logoutActive() {
      this.$session.destroy()
      this.isLoggedIn = false
      this.$router.replace(this.$route.query.redirect || '/')
    },
    gotoLogin() {
      this.$router.replace(this.$route.query.redirect || '/login/')
    }
  },
  mounted () {
    console.log(this.$session.has('username'))
    if (this.$session.has('username')) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
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
