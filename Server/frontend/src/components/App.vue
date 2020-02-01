<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      logout () {
        this.$store.commit('SET_USER', null)
        this.$store.commit('SET_TOKEN', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }

        this.$router.push('/login')
      }
    },
    mounted () {
      this.$swal('This is a Demo Version', '이 시스템은 데모입니다. <br> 일부 기능은 비활성화되어있습니다.<br><br><a href="https://github.com/han-um/Blot">https://github.com/han-um/Blot</a><br><a href="mailto:boncheolb@gmail.com">boncheolb@gmail.com</a><br>', 'warning')
    }
  }
</script>

<style>
    body {
        font-family: 'Noto Sans KR', sans-serif;
    }
</style>
