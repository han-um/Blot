<template>
        <a v-on:click="changeCurrent(index)" v-bind:class="{ now: index == this.$store.state.crntStcIndex }">{{text}} </a>
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
    // 현재 선택한 문장 전역변수화 Vuex
    changeCurrent (num) {
      this.$store.commit('SET_CRURRENT_SENTENCE_INDEX', this.index)
      this.$store.commit('SET_CRURRENT_SENTENCE_TEXT', this.text)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
 .now {
  padding: 5px;
  line-height: 2.5;
  border-radius: 30px;
  color: white;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
}
</style>
