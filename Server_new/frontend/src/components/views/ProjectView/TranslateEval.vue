<template>
    <div>
        <TranslationText></TranslationText>
    </div>
</template>

<script>
// import axios from 'axios'
import TranslationText from './TranslationText'
export default {
  name: 'TranslateEval',
  component: {
    TranslationText
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
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
