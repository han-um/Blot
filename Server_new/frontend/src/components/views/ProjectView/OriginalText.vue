<template>
        <a v-on:click="changeCurrent(index)" v-bind:class="{ now: index == this.$store.state.crntStcIndex }">{{text}} </a>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OriginalText',
  props: ['text', 'index'],
  data () {
    return {}
  },
  methods: {
    // 현재 선택한 문장 전역변수화 Vuex
    changeCurrent (num) {
      // EVAL에서 사용할 문장 정보 선택
      this.$store.commit('SET_CRURRENT_SENTENCE_INDEX', this.index)
      this.$store.commit('SET_CRURRENT_SENTENCE_TEXT', this.text)
      this.$root.$emit('TranslateEval')
      // EVAL에서 사용할 기존 평가정보 가져오기
      axios.get('/api/project/' + this.$route.params.id + '/sentence/' + this.$store.state.crntStcIndex + '/user/' + this.$session.get('username'))
      .then(res => {
        this.$store.commit('SET_CURRENT_TRANS_INDEX', res.data)
      })
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
