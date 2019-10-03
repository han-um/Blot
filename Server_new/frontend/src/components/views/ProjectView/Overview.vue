<template>
  <div class="overview-wrapper">
    <div class="image-box">
    </div>
<div class="inner">
            이 프로젝트는 현재 번역 진행중입니다
        </div>
      <div class="contents">
          asdasdas
        </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'ProjectViewOverview',
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>
<style scoped>
    .overview-wrapper{
        overflow: hidden;
    }
    .image-box {
        position:relative;
        background: url(/static/img/photo4.jpg) no-repeat center center/cover; 
        filter: blur(8px);
        -webkit-filter: blur(8px);
        transform: scale(1.1);
        width:100%;
        height:300px;
        z-index:1
    }
    .inner {
        position:relative;
        filter: blur(0);
        -webkit-filter: blur(0);
        width:100%;
        height:300px;
        color:white;
        z-index:2;
        font-size:40px;
        top:-300px;
    }
    .contents {
        width:100%;
        height:100px;
    }
</style>
