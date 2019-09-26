<template>
        
    <div class="trans-list"><span class="small-alert">번역 번호</span>
            <img src="/static/img/user2-160x160.jpg" alt="User Image" class="user-image circle"><b>익명</b><br> 
            <div class="contents">
            텍스트
            </div>
        </div>
        
</template>

<script>
// import axios from 'axios'

export default {
  name: 'TranslationText',
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
    
 .contents {
        padding-top:10px;
    }
    
    .now {
        background-color:#5CD590;
        color:white;
    }
    
    .now > .small-alert {
        background-color:white;
        color:#5CD590;
    }
    
</style>
