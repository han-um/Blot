<template>
    <div>
        <TranslationText v-for="(trans, index) in transList" :text="trans.text" :index="index"></TranslationText>
    </div>
</template>

<script>
import axios from 'axios'
import TranslationText from './TranslationText'
export default {
  name: 'TranslateEval',
  components: {
    TranslationText
  },
  data () {
    return {
      transList: [],
      randIndex: []
    }
  },
  methods: {
    getTrans: function (event) {
      axios.get('/api/project/' + this.$route.params.id + '/sentence/' + this.$store.state.crntStcIndex)
      .then(res => {
        this.transList = res.data
        // 랜덤 출력을 위한 인덱싱 배열 초기화
        this.randIndex = new Array(this.transList.length)
        for (var i = 0; i < this.transList.length; i++) {
          this.randIndex[i] = i
        }
        this.randIndex = this.randIndex.sort(function() { return 0.5 - Math.random() })
        console.log(this.randIndex)
      })
    }
  },
  mounted () {
    this.$root.$on('TranslateEval', () => {
      this.getTrans()
    })
  }
}
</script>

<style scoped>
    .trans-list {
        padding:20px;
    }
    .trans-list > .contents {
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
