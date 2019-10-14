<template>
  <div class="overview-wrapper">
    <div class="image-box">
        <div class="inner-box">
            <center><img src="/static/img/group36.png" class="img-box hidden-xs" alt="Responsive image"></center>
        </div>
        <!--img src="/static/img/group36.png"-->
    </div>
    <div class="contents">
          프로젝트 상세요약 내용
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
      /* The image used */
      background-image: url("/static/img/photo4.jpg");
      /* Set a specific height */
      height: 300px;
      /* Create the parallax scrolling effect */
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .inner-box {
        width:100%;
        height:300px;
        background-color:rgba(120,120,120,0.7);
        padding-top:85px;
    }
    .img-box {
        width: 100%;
        max-width:600px;
        height: auto;
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
