<template>
        
    <div class="trans-list"><span class="small-alert">번역 문장 {{index}}</span>
            <img src="/static/img/user2-160x160.jpg" alt="User Image" class="user-image circle"><b>익명</b><br> 
            <div class="contents">
            {{text}}
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
