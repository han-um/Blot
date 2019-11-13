<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <div class="col-md-6">
        <div class="col-md-12" style="padding-left:0px; padding-right:0px;">
         <div class="main-box">
            <div class="inner">
                <br><span class="title">같이 번역하고, 블록체인으로 저장하고, <br>보상을 받으세요. </span>
                <br><router-link to="/mylibrary"><span class="email">내 서재 살펴보기</span></router-link>
                <div class="row">
                    <div class="main-info-container">
                        <div class="col-md-4">
                            <div class="main-info-box">
                                <span class="green"><i class="ri-arrow-up-s-fill"></i> {{allProjectNum}}개</span>의 프로젝트<br>
                                <span class="sub">여태까지 생성됨</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="main-info-box">
                                <span class="green"><i class="ri-arrow-up-s-fill"></i> {{allTagNum}}</span>의 태그<br>
                                <span class="sub">여태까지 생성됨</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="main-info-box">
                                <span class="green"><i class="ri-arrow-up-s-fill"></i> 12명</span>의 참여자<br>
                                <span class="sub">번역 진행중</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </div>
        <div class="col-md-6" style="padding:15px 7px 0px 0px;">
            <div class="blot-box box">
                <div class="box-header with-border"><i class="ri-file-info-line"></i> 등록된 태그</div>
                <div class="box-body">
                    <TagBox></TagBox>
                </div>
            </div>
        </div>
        <div class="col-md-6" style="padding:15px 0px 0px 7px;">
            <div class="blot-box box">
                <div class="box-header with-border"><i class="ri-file-info-line"></i> 프로젝트 즐겨찾기 순위</div>
                <div class="box-body">
                    <div class="pop-box" v-for="project in popProjectList" v-on:click="gotoProject(project._id)">
                        <div class="icon"><i v-bind:class="project.icon"></i></div>
                        <div class="title">{{project.title}}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-md-6">
          <div class="row">
              <div class="col-md-6" style="padding-left:0px;">
                <div class="carousel-inner">
                          <div class="item active">
                            <div class="image-box" style="background-image:url('/static/img/note1.png')">
                                 <div class="text-box">
                                    <span class="small-alert" style="background-color:white;color:#5D5D5D">사용법</span><br>
                                    <span class="big-text">보상 시스템과<br>번역 지분</span><br>
                                    <small>튜토리얼 참여하기</small>
                                </div>
                            </div>
                          </div>
                        </div>
              </div>
              <!--공지사항-->
              <div class="col-md-6" style="padding-left:0px;padding-bottom:15px;">
                      <div id="carousel-example-generic1" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div class="item active">
                            <div class="image-box" style="background-image:url('/static/img/note2.png')">
                                <div class="text-box">
                                    <small>21 Jan, 2019</small><br>
                                    <span class="big-text">번역블록<br>시스템<br><b>변경점</b></span>
                                </div>
                            </div>
                          </div>
                          <div class="item">
                            <div class="image-box" style="background-image:url('/static/img/note3.png')">
                                <div class="text-box">
                                    <small>19 Jan, 2019</small><br>
                                    <span class="big-text">시스템<br>점검<br><b>안내</b></span>
                                </div>
                            </div>
                          </div>
                        </div>
                        <a class="left carousel-control" href="#carousel-example-generic1" data-slide="prev">
                          <i class="ri-arrow-left-s-line"></i>
                        </a>
                        <a class="right carousel-control" href="#carousel-example-generic1" data-slide="next">
                          <i class="ri-arrow-right-s-line"></i>
                        </a>
                      </div>
              </div>
              <!--공지사항 끝-->
              <!--내 프로젝트-->
              <div v-if="showCarousel1" class="col-md-6" style="padding-left:0px;">
                      <div id="carousel-example-generic2" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div v-for="(project, index) in popProjectList" v-bind:class="{active : index == 0}" class="item">
                            <div class="image-box" v-bind:style="{ backgroundImage: 'url(/api/files/attachedFiles/' + project.image + ')' }" v-on:click="gotoProject(project._id)">
                                <div class="text-box proj1">
                                    <span class="small-alert" style="background-color:white;color:#5D5D5D">인기 프로젝트</span><br>
                                    <span class="big-text">{{project.title}}</span><br>
                                    <div class="small"> {{project.description}}</div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <a class="left carousel-control" href="#carousel-example-generic2" data-slide="prev">
                          <i class="ri-arrow-left-s-line"></i>
                        </a>
                        <a class="right carousel-control" href="#carousel-example-generic2" data-slide="next">
                          <i class="ri-arrow-right-s-line"></i>
                        </a>
                      </div>
              </div>
              <!--내 프로젝트 끝-->
              <!--전체 프로젝트-->
              <div v-if="showCarousel2" class="col-md-6" style="padding-left:0px;">
                      <div id="carousel-example-generic3" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div v-for="(project, index) in allProjectList" v-bind:class="{active : index == 0}" class="item">
                            <div class="image-box" v-bind:style="{ backgroundImage: 'url(/api/files/attachedFiles/' + project.image + ')' }" v-on:click="gotoProject(project._id)">
                                <div class="text-box proj2">
                                    <span class="small-alert" style="background-color:white;color:#5D5D5D">추천 프로젝트</span><br>
                                    <span class="big-text">{{project.title}}</span><br>
                                    <div class="small">{{project.description}}</div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <a class="left carousel-control" href="#carousel-example-generic3" data-slide="prev">
                          <i class="ri-arrow-left-s-line"></i>
                        </a>
                        <a class="right carousel-control" href="#carousel-example-generic3" data-slide="next">
                          <i class="ri-arrow-right-s-line"></i>
                        </a>
                      </div>
              </div>
              <!--전체 프로젝트 끝-->
          </div>
      </div>
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
import axios from 'axios'
import TagBox from '../widgets/TagBox'
export default {
  name: 'Dashboard',
  components: {
    TagBox
  },
  data () {
    return {
      allProjectNum: 0,
      allProjectList: [],
      popProjectList: [],
      allTagNum: 0,
      showCarousel2: false,
      showCarousel1: false
    }
  },
  computed: {
  },
  methods: {
    gotoTagProject(route) {
      this.$router.replace(this.$route.query.redirect || '/projview/' + route + '/')
    },
    async getAllProject() {
      await axios.get('/api/project').then(res => {
        this.allProjectNum = res.data.length
        this.allProjectList = res.data
      })
      this.showCarousel2 = true
    },
    async getPopProject() {
      await axios.get('/api/project/info/popular').then(res => {
        this.popProjectList = res.data
      })
      this.showCarousel1 = true
    },
    async getAllTag() {
      await axios.get('/api/project/tags').then(res => {
        this.allTagNum = res.data.length
      })
    },
    gotoProject(route) {
      this.$router.replace(this.$route.query.redirect || '/projView/' + route + '/')
    }
  },
  mounted () {
    this.getAllProject()
    this.getAllTag()
    this.getPopProject()
  }
}
</script>
<style scoped>
.tempimg {
}
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
   .main-box {
        width:100%;
        height:70vh;
        background-color:white;
        background-size:cover;
        background-image:url('/static/img/mainback.png');
        color:#E5E5E5;
    }
    
    .main-box .inner {
        position:absolute;
        width:100%;
        height:70vh;
        text-align: left;
        padding:40px;
        padding-top:35vh;
        line-height: 30px;
    }
    .main-box .inner .title {
        font-size:26px;
        font-weight: 100;
    }
    .main-box .inner a{
        color:#E5E5E5;
    }
    .main-info-container {
        margin-top:70px;
        font-size:14px;
        font-weight: 100;
        line-height: 17px;
        padding-left:20px;
    }
    .main-info-box .green {
        color:#5CD590;
        font-weight: 600;
        font-size: 16px;
    }
    .main-info-box .sub {
        font-size: 12px;
        font-weight: 600;
    }
    .carousel.slide {
        height:45vh;
    }
    .carousel-inner {
        height:45vh;
    }
    .carousel-inner .item {
        height:45vh;
    }
    .carousel-inner .item .image-box {
        height:45vh;
        background-size:cover;
    }
    .image-box .text-box {
        color:white;
        padding-top:70px;
        padding-left:30px;
    }
    .image-box .text-box .small {
        font-weight: 100;
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
        width:80%;
    }
    .image-box .text-box .big-text{
        font-size:30px;
        font-weight: 100;
        line-height: 36px;
    }
    .proj1.text-box {
        height:45vh;
        background-color:rgba(0,0,0,0.4);
        color:white;
        padding-top:130px;
        padding-left:30px;
    }
    .proj2.text-box {
        height:45vh;
        background-color:rgba(0,0,0,0.4);
        color:white;
        padding-top:50px;
        padding-left:30px;
        padding-right:30px;
        padding-bottom:30px;
    }
    .blot-box {
        padding-top:5px;
        height:20vh;
        overflow-x:scroll;
        overflow-y:scroll;
    }
    .pop-box {
        margin-bottom:5px;
        border-bottom: 1px solid #C5C5C5;
    }
    .pop-box .icon {
        padding-left:3px;
        padding-right:3px;
        border: 1px solid #C5C5C5;
        display: inline-block;
    }
    .pop-box .title {
        display: inline-block;
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
        width:90%;
        font-size:13px;
        color:#6B6B6B;
    }
</style>
