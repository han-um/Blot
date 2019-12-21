<template>
  <div>
    <section class="content">
        <div class="row">
            <div class="col-md-12" style="padding-left: 7px; padding-right: 0px;">
                <div class="blot-box box">
                     <div class="preview-box" v-bind:style="{ backgroundImage: 'url(/api/files/attachedFiles/' + infoList[0].image + ')' }">
                          <div class="inner">
                              <a v-on:click="gotoTagList()" class="back">< 돌아가기 </a><br>
                              <br><span class="name">{{this.$route.params.tag}}</span>
                              <br><span class="email">태그에 해당되는 프로젝트입니다.</span>
                          </div>
                  </div>
               </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7" style="padding-left: 7px; padding-right: 0px;">
              <div class="blot-box box">
                  <div class="box-body">
                        <!--결과 각각의 상자-->
                        <transition-group enter-active-class="animated zoomIn" tag="div">
                        <div v-for="(result, index) in infoList" v-bind:key="result._id" v-on:click="gotoProject(result._id)" v-on:mouseover="selectProject(index)" class="col-md-6 each-container">
                            <div class="each-box">
                                <div class="icon-box"><i v-bind:class="result.icon"></i></div>
                                <div class="proj-title">
                                    <h4>{{result.title}}</h4>
                                    <small>{{result.description}}</small>
                                </div>
                            </div>
                        </div>
                        </transition-group>
                        <!---->
                  </div>
              </div>
            </div>
            <div class="col-md-5"  style="padding-left: 7px; padding-right: 0px;">
              <div class="blot-box box">
                      <DetailBox :projectId="nowProject"></DetailBox>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import DetailBox from '../../widgets/DetailBox'
export default {
  name: 'TagProject',
  components: {
    DetailBox
  },
  props: ['tag'],
  data () {
    return {
      idList: [],
      infoList: [],
      nowProject: ''
    }
  },
  methods: {
    async getProjectList() {
      // STEP1 : 태그에 해당되는 프로젝트 ID 리스트를 가져옴
      await axios.get('/api/project/tags/' + this.$route.params.tag)
      .then(res => {
        this.idList = res.data
      })
      // STEP2 : ID로부터 정보를 가져와서 배열에 넣음
      for (var i = 0, eachId; (eachId = this.idList[i]); i++) {
        await axios.get('/api/project/projInfo/' + eachId)
        .then(res => {
          this.infoList.push(res.data)
        })
      }
    },
    gotoProject(route) {
      this.$router.replace(this.$route.query.redirect || '/projView/' + route + '/')
    },
    selectProject(index) {
      this.nowProject = this.infoList[index]._id
    },
    gotoTagList() {
      this.$router.replace(this.$route.query.redirect || '/taglist')
    }
  },
  mounted () {
    this.getProjectList()
    console.log(this.infoList)
  }
}
</script>

<style scoped>
    .content {
        padding:40px;
    }
    .each-box {
        width:100%;
        background-color:#EFEFEF;
        height:65px;
    }
    .each-container {
        padding:0px;
        margin:0px;
        padding-right:10px;
        padding-bottom:10px;
        cursor: pointer;
    }
    .icon-box {
        padding: 5px;
        background-color: #5CD590;
        float: left;
        width: 65px;
        height: 65px;
        vertical-align: middle;
        text-align: center;
        font-size: 40px;
        color: white;
    }
    .proj-title {
        color: #6B6B6B;
        margin: 13px;
        float: left;
        vertical-align: middle;
        display:inline;
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
        width:calc(100% - 95px)
    }
    
    .proj-title h4 {
        font-size: 15px;
        font-weight: 400;
        padding-top: 9px;
        padding-bottom: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        line-height: 10px;
    }
    
    .proj-title small {
        font-size: 12px;
        font-weight: 100;
    }
    .overflow-set {
        overflow-x: scroll;
    }
    .preview-box {
        width:100%;
        height:200px;
        background-color:white;
        background-size:cover;
    }
    
    .preview-box .inner {
        position:absolute;
        width:100%;
        height:200px;
        background-color:rgba(0,0,0,0.5);
        text-align: left;
        padding:20px;
        padding-top:100px;
        line-height: 18px;
    }
    .preview-box .inner .name {
        font-size:35px;
        color:white;
    }
    .preview-box .inner .email {
        color:white;
        font-weight: 100;
        font-size:12px;
    }
    .preview-box .inner .back {
        text-decoration: underline;
        font-weight: 600;
        color:white;
        cursor: pointer;
    }
</style>
