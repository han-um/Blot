<template>
  <div class="blot-box box">
      <div class="box-header with-border"><i class="ri-t-box-line"></i> 내용</div>
      <div class="box-header-menu">
         <ul>
           <li class="active">원본보기</li>
           <li class="icon" style="float:right" v-on:click="fontsize--" v-if="fontsize>10"><i class="ri-subtract-fill"></i></li>
           <li class="icon disabled" style="float:right" v-if="fontsize<=10"><i class="ri-subtract-fill"></i></li>
           <li class="icon" style="float:right" v-on:click="fontsize++"><i class="ri-add-line"></i></li>
           <li class="inputbox" style="float:right"><i class="ri-font-size"></i><input type="text" v-model="fontsize"></li>
         </ul>
      </div>
      <div class="box-body scrollable vh-75" v-bind:style="{ fontSize: fontsize + 'px' }">
          <br> 
          <OriginalText v-for="(sentence, i) in sentences" :text="sentence.raw_text" :index="i"></OriginalText>
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
      sentences: []
    }
  },
  methods: {
    getSentences () {
      axios.get('/api/project/' + this.$route.params.id + '/sentence')
        .then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.sentences = response.data.sentence
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response.statusText
        })
    }
  },
  mounted () {
    this.getSentences()
  }
}
</script>

<style scoped>
    .box-body > a {
    }
    
</style>
