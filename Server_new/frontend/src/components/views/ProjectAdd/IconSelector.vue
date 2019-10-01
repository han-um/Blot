<template>
  <div>
    <div v-for="(icon,index) in iconArray" class="icon-box">
        <i v-bind:class="icon"></i>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'IconSelector',
  data () {
    return {
      iconArray: [
        'ri-home-3-line', 'ri-building-2-line', 'ri-cloud-line', 'ri-bar-chart-grouped-line', 'ri-global-line',
        'ri-stack-line', 'ri-chat-3-line', 'ri-brush-4-line', 'ri-palette-line', 'ri-git-repository-private-line'
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .icon-box{
    float:left;
    width:20%;
    text-align: center;
    vertical-align: middle;
    height:40px;
    font-size:15px;
  }
  .icon-box i {
    padding:10px;
    border:1px solid red;
  }
</style>
