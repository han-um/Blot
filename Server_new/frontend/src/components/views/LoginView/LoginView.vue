<template>
  <div class="login-wrapper" style="height:100%;">
      <!-- Login Header-->
      <header class="main-header">
        <span class="logo-mini">
          <div class="logo"><i class="ri-shape-2-fill"></i> <span> blot</span></div>
        </span>
        <nav class="navbar navbar-static-top" role="navigation"></nav>
      </header>
      <div class="col-md-2"></div>
      <div class="col-md-8 align-middle div-middle">      
          <!-- Router -->
          <router-view></router-view>
      </div>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  components: {
  },
  data: function () {
    return {}
  },
  computed: {
  }
}
</script>

<style scoped>
    .login-wrapper {
      background: url(/static/img/blurwp.PNG) no-repeat center center/cover; 
    }
    .div-middle {
          margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
    }
</style>
