<template>
<ul class="nav navbar-nav">
    <button v-on:click="addProject" class="trans-input-button">프로젝트 등록하기</button>
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
    // 프로젝트 정보를 블록체인 상에 등록하기 위해 서버에 대납 요청을 보내는 로직
    addProject() {
      var payload = {'projectId': 'projectId7', 'writerId': 'kim', 'deadline': '2019.11.03', 'reward': 30}
      this.$store.dispatch('CREATE_NEW_PROJECT', payload)
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
