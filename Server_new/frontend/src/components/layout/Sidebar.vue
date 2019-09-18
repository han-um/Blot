<template>
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li class="treeview active">
          <a href="#">
              <span class="blank-line"></span>
            <i class="ri-stack-line"></i>
              <span class="blank"></span>
            <span class="treeview-title">메인화면</span>
            <span class="pull-right-container pull-right">
              <i class="fa fa-angle-left fa-fw"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li>
             <a href="index2.html"><i class="fa fa-blank"></i><span class="blank"></span>인기 프로젝트</a>
            </li>
              <li>
             <a href="index2.html"><i class="fa fa-blank"></i><span class="blank"></span>번역이 끝난 프로젝트</a>
            </li>
              <li>
             <a href="index2.html"><i class="fa fa-blank"></i><span class="blank"></span>번역을 기다리는 프로젝트</a>
            </li>
              <li>
             <a href="index2.html"><i class="fa fa-blank"></i><span class="blank"></span>태그별 프로젝트</a>
            </li>
          </ul>
        </li>
            
         <li class="treeview active">
          <a href="#">
              <span class="blank-line"></span>
            <i class="ri-stack-line"></i>
              <span class="blank"></span>
            <span class="treeview-title">메인화면</span>
            <span class="pull-right-container pull-right">
              <i class="fa fa-angle-left fa-fw"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li>
              <a href="#">
              </a>
            </li>
          </ul>
        </li>
       
        <!--TODO : 삭제할것--> 
            <!--
        <li class="header">DEBUG MENU</li>
        <router-link tag="li" class="pageLink" to="/">
          <a>
            <i class="fa fa-desktop"></i>
            <span class="page">Dashboard</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/tables">
          <a>
            <i class="fa fa-table"></i>
            <span class="page">Tables</span>
          </a>
        </router-link>

        <li class="header">ME</li>
        <router-link tag="li" class="pageLink" to="/tasks">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">Tasks</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/setting">
          <a>
            <i class="fa fa-cog"></i>
            <span class="page">Settings</span>
          </a>
        </router-link>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-folder-o"></i>
            <span class="treeview-title">Files</span>
            <span class="pull-right-container pull-right">
              <i class="fa fa-angle-left fa-fw"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li>
              <a href="#">
                <i class="fa fa-file-word-o"></i> Item 1
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-file-picture-o"></i> Item 2
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-file-pdf-o"></i> Item 3
              </a>
            </li>
          </ul>
        </li>

        <li class="header">LOGS</li>
        <router-link tag="li" class="pageLink" to="/access">
          <a>
            <i class="fa fa-book"></i>
            <span class="page">Access</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/server">
          <a>
            <i class="fa fa-hdd-o"></i>
            <span class="page">Server</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/repos">
          <a>
            <i class="fa fa-heart"></i>
            <span class="page">Repos</span>
            <small class="label pull-right bg-green">AJAX</small>
          </a>
        </router-link>

        <li class="header">PAGES</li>
        <router-link tag="li" class="pageLink" to="/login">
          <a>
            <i class="fa fa-circle-o text-yellow"></i>
            <span class="page"> Login</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/404">
          <a>
            <i class="fa fa-circle-o text-red"></i>
            <span class="page"> 404</span>
          </a>
        </router-link>
        -->
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  name: 'Sidebar',
  props: ['user'],
  mounted: function() {
    window
      .jQuery('[data-toggle="hideseek"]')
      .off()
      .hideseek()
  }
}
</script>
<style scope="local">

/* BLOT : Resize Width */   

    .main-sidebar, .left-side {
        width:310px;
    }

/* BLOT : Sidebar Style */
    .skin-black-light .main-sidebar,
    .skin-black-light .left-side {
      background: url(/static/img/blurwp.PNG) no-repeat center center/cover;
      color:white; 
    }

    .treeview-menu > li > a{
        color:white;
    }
    
    .sidebar .blank-line {
        top: 0px;
        left: 50px;
        position: fixed;
        padding: 12px;
        height: 100%;
        background-color: white;
        box-shadow: 0 0 black;
        z-index:1000;
    }
    
    .sidebar-menu > li > a {
        display: table-cell;
        width:320px;
        vertical-align: middle;
        font-size: 14px;
        color: white;
        background: rgba(1,1,1,0.3);
        height:50px;
        font-weight:600;
    }
    
    
    .sidebar .blank {
        padding: 15px;
        margin: 15px;
    }
    
    .fa, .fa-angle-left, .fa-fw {
        margin-bottom:20px;
    }
    
    .treeview-menu > li > a {
        font-size:12px;
        font-weight:100;
        padding: 3px 3px 3px 15px;
    }
    
    .treeview > ul.treeview-menu {
        padding-top:5px;
        padding-bottom:20px;
    }
    
/* Co-Pilot Style */
    .sidebar-menu > li > a {
        color:white;
      padding: 7px 7px 7px 17px;
    }

    .sidebar-menu li.active > a > .fa-angle-left,
    .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
      animation-name: rotate;
      animation-duration: 0.2s;
      animation-fill-mode: forwards;
    }

    .treeview-title {
      z-index: 1;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(-90deg);
      }
    }    
</style>
