<template>
  <div>
    <div class="outer-box">
        <div class="log-icon"><i v-bind:class="icon"></i></div>
        <div class="log-text"><b>{{title}}</b><br><small>{{text}}</small></div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'LogBox',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'ri-loader-3-line'
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
    .outer-box {
      background-color:#FBC02D;
      border-radius: 20px;
      padding:10px;
      padding-left:20px;
      padding-right:20px;
      color:white;
      width:100%;
      margin-bottom:7px;
    }
    .outer-box .log-icon {
      display:inline-block;
      vertical-align: top;
      font-size:20px;
    }
    .outer-box .log-text { 
        display:inline-block;
        width:80%;
        line-height: 12px;
        padding-top:6px;
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
    }
</style>
