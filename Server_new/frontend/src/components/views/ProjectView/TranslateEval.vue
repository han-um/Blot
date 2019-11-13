<template>
    <div>
        <TranslationText v-if="!ended" v-for="(trans, index) in transList" :text="trans.text" :idx="trans.idx" :index="index"></TranslationText>
        <!--마감시 출력-->
        <div v-if="ended" v-for="(trans,index) in scoreTransList" class="trans-list" v-bind:class="{active : index == 0}"><span class="small-alert">투표를 통한 평가 점수 : {{trans.score}}</span>
            <b>{{trans.transId}}</b><br> 
            <div class="contents">
            {{trans.transText}}
            </div>
        </div>
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
      scoreTransList: [],
      randIndex: [],
      ended: false
    }
  },
  methods: {
    getTrans: function (event) {
      axios.get('/api/project/' + this.$route.params.id + '/sentence/' + this.$store.state.crntStcIndex + '/trans')
      .then(res => {
        this.transList = res.data
      })
    },
    getScoreTrans: function (event) {
      axios.get('/api/project/' + this.$route.params.id + '/sentence/' + this.$store.state.crntStcIndex + '/score')
      .then(res => {
        this.scoreTransList = res.data
      })
    }
  },
  mounted () {
    this.ended = this.$store.state.crntProjEnded // 전역변수의 지역변수화
    if (this.ended) { // 프로젝트가 마감상태일때만 점수순 정보를 가져옴
      this.getScoreTrans()
    }
    this.getTrans()
    this.$root.$on('TranslateEval', () => {
      this.getTrans()
      if (this.ended) { // 프로젝트가 마감상태일때만 점수순 정보를 가져옴
        this.getScoreTrans()
      }
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
     
 .contents {
        padding-top:10px;
    }
    
    .active {
        background-color:#5CD590;
        color:white;
    }
    
    .active > .small-alert {
        background-color:white;
        color:#5CD590;
    }
</style>
