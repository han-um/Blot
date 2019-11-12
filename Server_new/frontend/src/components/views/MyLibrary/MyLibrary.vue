<template>
  <div>
    <section class="content">
        <div class="page-title-box">
                <h2>내 서재</h2>
                <small>참여중인 프로젝트와 즐겨찾기한 프로젝트를 한눈에 확인할 수 있습니다.</small>
        </div>
        <div class="row">
            <div class="col-md-2 col-xs-4 white-box cat-box">
                <!--<div class="box-header"></div>-->
                <div class="cat" v-on:click="selectMenu('Added')" v-bind:class="{now : (nowMenu === 'Added')}">내가 등록한</div>
                <div class="cat" v-on:click="selectMenu('Favorite')" v-bind:class="{now : (nowMenu === 'Favorite')}">즐겨찾기</div>
            </div>
            <div class="col-md-5 col-xs-8 white-box">
                <!--<div class="box-header"></div>-->
                <!--각 프로젝트 항목-->
            <transition-group enter-active-class="animated fadeIn" tag="div">
                <div v-if="nowMenu == 'Added'" v-for="(eachProject, index) in currentList" class="col-md-6 p-2" v-bind:key="eachProject._id">
                    <router-link :to="{path: '/projview/' + eachProject._id + '/'}">
                    <div class="each-box"  v-on:mouseover="selectProject(index, 0)">
                        <div class="img-box" v-bind:style="{ backgroundImage: 'url(/api/files/attachedFiles/' + eachProject.image + ')' }"></div>
                        <div class="title-box">{{eachProject.title}}</div>
                    </div>
                    </router-link>
                </div>
                <div v-show="nowMenu == 'Favorite'" v-for="(eachProject, index) in currentFavList" class="col-md-6 p-2" v-bind:key="eachProject._id">
                    <router-link :to="{path: '/projview/' + eachProject._id + '/'}">
                    <div class="each-box"  v-on:mouseover="selectProject(index, 1)">
                        <div class="img-box" v-bind:style="{ backgroundImage: 'url(/api/files/attachedFiles/' + eachProject.image + ')' }"></div>
                        <div class="title-box">{{eachProject.title}}</div>
                    </div>
                    </router-link>
                </div>
            </transition-group>
                <!---->
            </div>
            <div class="col-md-5 hidden-xs white-box">
                <!--<div class="box-header"></div>-->
                  <DetailBox :projectId="nowProject"></DetailBox>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import DetailBox from '../../widgets/DetailBox'
export default {
  name: 'MyLibrary',
  data () {
    return {
      currentList: [],
      currentFavList: [],
      nowProject: '',
      nowMenu: 'Added'
    }
  },
  components: {
    DetailBox
  },
  methods: {
    getFavoriteProj () {
      axios.get('/api/user/' + this.$session.get('username') + '/project')
      .then(res => {
        this.currentFavList = res.data
      })
    },
    getAddedProj () {
      axios.get('/api/project/user/' + this.$session.get('username'))
      .then(res => {
        this.currentList = res.data
      })
    },
    selectProject(index, type) {
      if (type) {
        this.nowProject = this.currentFavList[index]._id // 1
      } else {
        this.nowProject = this.currentList[index]._id // 0
      }
    },
    selectMenu(input) {
      this.nowMenu = input
    }
  },
  mounted () {
    // 이 페이지는 로그인되어있어야만 사용할 수 있음
    if (!this.$session.has('username')) {
      this.$router.replace(this.$route.query.redirect || '/login/')
    }
    // Mounted
    this.getFavoriteProj()
    this.getAddedProj()
  }
}
</script>

<style scoped>
.content {
        padding:40px;
    }
    .white-box {
      padding:0px;
      background-color:#EFEFEF;
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
        // background-color:#6B6B6B;
        height:40px;
        text-align: center;
        line-height: 40px;
        color:#6B6B6B;
        font-size:12px;
        font-weight:300;
    }
    .cat-box .cat {
        color:#6B6B6B;
        text-align: center;
        padding-left:10px;
        padding-right:10px;
        padding-bottom:7px;
        padding-top:12px;
        margin-left:15px;
        margin-right:15px;
        width:calc(100%-30px);
        font-size:12px;
    }
    .now {
        color:#6B6B6B!important;
        border-bottom:2px solid #6B6B6B;
    }
    .title-box {
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
    }
</style>
