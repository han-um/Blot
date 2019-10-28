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
      <div class="navbar-custom-menu" style="float:left">
          <ul class="nav navbar-nav">
              <li>
                <a>
                    <div class="hidden-xs search-logo"><i class="ri-search-2-line"></i></div>
                    <div class="search-value hidden-xs"> &nbsp;&nbsp; <b>번역 프로젝트</b>를 검색하세요</div>
                </a>
            </li>
            </ul>
        </div>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
          <user-menu :user="user"></user-menu>
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
    
    .main-header .logo {
        background:none;
    }
    .main-header .logo {
        font-family: 'Noto Sans KR', sans-serif;
        width:278px;
        text-align:left;
        padding-left:15px;
    }
    
    .logo i {
        color: #6B6B6B;
        font-weight:100;
        font-size:20px;
        padding-right:20px;
    }
    
    .logo span {
        color: #6B6B6B;
        height:30px;
        vertical-align:top;
        font-size:20px;
        font-weight:600;
    }
    
    .main-header>.navbar{
        margin-left:278px;
    }
    
    .search-logo {
        font-size:20px;
        vertical-align: middle;
        display:inline;
    }
    .search-value {
        display:inline;
        line-height: 0px;
    }
</style>
