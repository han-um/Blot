<template>
  <header class="main-header">
    <span class="logo-mini">
      <div class="logo"><i class="ri-shape-2-fill"></i> <span> blot</span></div>
    </span>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <user-menu :user="user"></user-menu>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import UserMenu from './UserMenu'

export default {
  name: 'DashHeader',
  components: {
    UserMenu
  },
  props: ['user'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>

<style>
/* BLOT : style */
    .main-header{
     background-color:white;   
    }
    
    .skin-blue .main-header .logo {
        background:none;
    }
    .main-header .logo {
        font-family: 'Noto Sans KR', sans-serif;
        width:320px;
        text-align:left;
    }
    
    .logo i {
        color: #6B6B6B;
        font-weight:100;
        font-size:20px;
        padding-right:20px;
    }
    
    .logo span {
        color: #6B6B6B;
        height:50px;
        vertical-align:top;
        font-size:20px;
        font-weight:600;
    }
    
    .main-header>.navbar{
        margin-left:320px;
    }
</style>
