<template>
  <div class="login-wrapper" style="height:100%;">
      <!-- Login Header-->
      <header class="main-header">
        <span class="logo-mini">
          <router-link to="/"><div class="logo"><i class="ri-shape-2-fill"></i> <span> blot</span></div></router-link>
        </span>
        <nav class="navbar navbar-static-top" role="navigation"></nav>
      </header>
      <div class="box-wrapper">
      <div class="col-md-2"></div>
      <div class="col-md-8 col-centered div-middle">      
          <!-- Router -->
          <router-view></router-view>
      </div>
      <div class="col-md-2"></div>
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
        overflow-y:scroll;
        height: 100%;
    }
    .div-middle {
        min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 90vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
    }
</style>
