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
          {{sentences[0].raw_text}}
          <OriginalText text="abcde" index="1"></OriginalText>
          
          <a class="now">
                                    The background property in CSS can accept comma separated values. "Multiple" backgrounds, if you will. You can also think of them as layered backgrounds since they have a stacking order. </a><br><br><a>
                                    Unfortunately, that's not valid. I'm not entirely sure why. A while back when I whined on Twitter about it I got a variety of ideas/reasons/excuses. None of them rang quite true for me. It's true you cannot comma-separate background-color, but I don't think that's relevant here as I'm comma separating the background shorthand not specifically background-color (not to mention ordering those values the other way around works fine).</a> <br><br> <a>
                                    I suspect the real reason that was decided is because it would be too easy for authors to screw up. background: green, url(image.jpg); would "fail" in a sense in that it would just flood the background green. Forcing the color to be last makes the color kind of like a "fallback" rather than a layer like any other.
                                    </a><br><br>
          <a>
                                    Unfortunately, that's not valid. I'm not entirely sure why. A while back when I whined on Twitter about it I got a variety of ideas/reasons/excuses. None of them rang quite true for me. It's true you cannot comma-separate background-color, but I don't think that's relevant here as I'm comma separating the background shorthand not specifically background-color (not to mention ordering those values the other way around works fine).</a> <br><br> <a>
                                    I suspect the real reason that was decided is because it would be too easy for authors to screw up. background: green, url(image.jpg); would "fail" in a sense in that it would just flood the background green. Forcing the color to be last makes the color kind of like a "fallback" rather than a layer like any other.
                                    </a><br><br><a>
                                    Unfortunately, that's not valid. I'm not entirely sure why. A while back when I whined on Twitter about it I got a variety of ideas/reasons/excuses. None of them rang quite true for me. It's true you cannot comma-separate background-color, but I don't think that's relevant here as I'm comma separating the background shorthand not specifically background-color (not to mention ordering those values the other way around works fine).</a> <br><br> <a>
                                    I suspect the real reason that was decided is because it would be too easy for authors to screw up. background: green, url(image.jpg); would "fail" in a sense in that it would just flood the background green. Forcing the color to be last makes the color kind of like a "fallback" rather than a layer like any other.
                                    </a><br><br>
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
        font-size:12px;
    }
 .box-body > .now {
    padding: 5px;
    line-height: 2.5;
    border-radius: 30px;
    color: white;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
}
    
</style>
