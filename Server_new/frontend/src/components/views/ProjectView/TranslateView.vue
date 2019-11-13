<template>
  <div class="blot-box box">
      <div class="box-header with-border"><i class="ri-t-box-line"></i> 내용</div>
      <div class="box-header-menu">
         <ul>
           <li v-on:click="crntMenu = 'original'" v-bind:class="{active : crntMenu === 'original'}">원본보기</li>
           <li v-on:click="crntMenu = 'translate'" v-bind:class="{active : crntMenu === 'translate'}">번역보기</li>
           <li class="icon" style="float:right" v-on:click="fontsize--" v-if="fontsize>10"><i class="ri-subtract-fill"></i></li>
           <li class="icon disabled" style="float:right" v-if="fontsize<=10"><i class="ri-subtract-fill"></i></li>
           <li class="icon" style="float:right" v-on:click="fontsize++"><i class="ri-add-line"></i></li>
           <li class="inputbox" style="float:right"><i class="ri-font-size"></i><input type="text" v-model="fontsize"></li>
         </ul>
      </div>
      <div class="box-body scrollable vh-75" v-bind:style="{ fontSize: fontsize + 'px' }">
          <br> 
          <OriginalText v-if="crntMenu === 'original'" v-for="(sentence, i) in sentences" :text="sentence.raw_text" :index="i"></OriginalText>
          <OriginalText v-if="crntMenu === 'original'" v-for="(sentence, i) in sentences" :text="sentence.raw_text" :index="i"></OriginalText>   
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import OriginalText from './OriginalText'
export default {
  name: 'TranslateView',
  components: {
    OriginalText
  },
  data () {
    return {
      fontsize: 12,
      sentences: [],
      crntMenu: 'original',
      transSentences: []
    }
  },
  methods: {
    // OriginalText에 쓸 문장 목록 초기화
    getSentences () {
      axios.get('/api/project/' + this.$route.params.id + '/sentence')
        .then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.sentences = response.data.sentence
          // 제일 처음엔 0번 문장으로 전역변수 변경
          var payload = {'index': 0, 'text': this.sentences[0].raw_text}
          this.$store.dispatch('REFRESH_CURRENT_SENTENCE', payload)
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response.statusText
        })
    },
    getTransSentences () {
        // 문장처리
    }
  },
  mounted () {
    this.getSentences()
    if (this.$store.state.crntProjEnded) {
      this.getTransSentences()
    }
  }
}
</script>

<style scoped>
    .box-body > a {
    }
    
</style>
