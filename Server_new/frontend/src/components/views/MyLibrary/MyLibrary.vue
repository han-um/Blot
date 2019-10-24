<template>
  <div>
    <section class="content">
        <div class="page-title-box">
                <h2>내 서재</h2>
                <small>참여중인 프로젝트와 즐겨찾기한 프로젝트를 한눈에 확인할 수 있습니다.</small>
        </div>
        <div class="row">
            <div class="col-md-2 col-xs-4 white-box">
                <div class="box-header"></div>
            
            </div>
            <div class="col-md-5 col-xs-8 white-box">
                <div class="box-header"></div>
                <div class="col-md-6 p-2">
                    <router-link to="/projview/5d84a8e73c9f67a60a0d42f1/">
                    <div class="each-box">
                        <div class="img-box"></div>
                        <div class="title-box">프로젝트 이름 1</div>
                    </div>
                    </router-link>
                </div>
                <div class="col-md-6 p-2">
                    <div class="each-box">
                        <div class="img-box"></div>
                        <div class="title-box">프로젝트 이름 1</div>
                    </div>
                </div>
                <div class="col-md-6 p-2">
                    <div class="each-box">
                        <div class="img-box"></div>
                        <div class="title-box">프로젝트 이름 1</div>
                    </div>
                </div>
            </div>
            <div class="col-md-5 hidden-xs white-box">
                <div class="box-header"></div>
            
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyLibrary',
  data () {
    return {
      FavoriteProj: []
    }
  },
  methods: {
    getFavoriteProj () {
      axios.get('/api/user/' + this.$session.get('username') + '/project')
      .then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    // 이 페이지는 로그인되어있어야만 사용할 수 있음
    if (!this.$session.has('username')) {
      this.$router.replace(this.$route.query.redirect || '/login/')
    }
    // Mounted
    this.getFavoriteProj()
  }
}
</script>

<style scoped>
.content {
        padding:40px;
    }
    .white-box {
      padding:0px;
      background-color:#343434;
      height:80vh;
      -webkit-box-shadow: -1px 2px 6px -1px rgba(0,0,0,0.57);
-moz-box-shadow: -1px 2px 6px -1px rgba(0,0,0,0.57);
box-shadow: -1px 2px 6px -1px rgba(0,0,0,0.57);
    }
    .box-header {
        background-color:#4E4E4E;
        height:40px;
    }
    .p-2 {
        padding:1px;
    }
    .each-box {
        // border:2px solid white;
    }
    .img-box {
        background: url(/static/img/photo2.png) no-repeat center center/cover;
        height:100px;
        background-color:white;
    }
    .title-box {
        height:40px;
        text-align: center;
        line-height: 40px;
        color:white;
        font-size:12px;
        font-weight:300;
    }
</style>
