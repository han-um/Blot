<template>
    <div>
        <a v-on:click="changeCurrent(index)">{{text}}</a>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'OriginalText',
  props: ['text', 'index'],
  data () {
    return {}
  },
  methods: {
    changeCurrent (num) {
      // vuex mutation으로 현재 문장 전역변수 수정하기
      console.log(num)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
