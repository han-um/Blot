<template>
        
    <div class="trans-list" v-on:click="evalTrans" v-bind:class="{active : this.idx === this.$store.state.crntTransIndex}"><span class="small-alert">번역 문장 {{index}}</span>
            <img src="/static/img/user2-160x160.jpg" alt="User Image" class="user-image circle"><b>익명</b><br> 
            <div class="contents">
            {{text}}
            </div>
        </div>
        
</template>

<script>
import axios from 'axios'

export default {
  name: 'TranslationText',
  props: ['text', 'index', 'idx'],
  data () {
    return {}
  },
  methods: {
    // 이 번역을 선택함 (평가함)
    evalTrans () {
      console.log(this.$session.get('username'))
      axios.get('/api/project/' + this.$route.params.id + '/sentence/' + this.$store.state.crntStcIndex + '/trans/' + this.idx + '/user/' + this.$session.get('username'))
      .then(res => {
        this.$store.commit('SET_CURRENT_TRANS_INDEX', this.idx)
      })
      console.log(this.idx)
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
    
    .active {
        background-color:#5CD590;
        color:white;
    }
    
    .active > .small-alert {
        background-color:white;
        color:#5CD590;
    }
    
</style>
