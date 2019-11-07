<template>
  <div v-show="this.$store.state.showProjectSearch">
      <div class="container">
          <div class="row">
               <div class="col-md-3"></div>
            <div class="col-md-6 col-centered div-middle m-0 p-0">
              <input v-model="searchInputText" v-on:input="projectSearch()" id="searchinput" class="search-input" type=text placeholder="검색하기...">
            </div>
          </div>
          <div class="row">
              <div class="col-md-2"></div>
            <div class="col-md-6 col-centered div-middle m-0 p-0">
                <div class="result-box">
                    <div class="row">
                        <!--결과 각각의 상자-->
                        <transition-group enter-active-class="animated zoomIn" tag="div">
                        <div v-for="(result, index) in resultList" v-bind:key="result._id" v-on:click="gotoProject(result._id)" v-on:mouseover="selectProject(index)" class="col-md-6 each-container">
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
              <div class="col-md-4">
               <div class="detail-box">
                   <!--디테일 표시 상자-->
                   <div class="preview-box" v-bind:style="{ backgroundImage: 'url(' + this.nowImage + ')' }">
                          <div class="inner">
                              <i v-bind:class="this.nowIcon"></i>
                              <br><span class="preview-title">{{this.nowTitle}}</span>
                              <br><span class="preview-overview">{{this.nowOverview}}</span>
                          </div>
                    </div>
                   <div class="info-icon-box row">
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-percent-line"></i><br>
                           <small>전체 진행도</small><br>
                           <div class="value">92%</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-group-fill"></i><br>
                           <small>참여자 수</small><br>
                           <div class="value">92%</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-pages-line"></i><br>
                           <small>원문 분량</small><br>
                           <div class="value">92%</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-heart-2-line"></i><br>
                           <small>즐겨찾기 수</small><br>
                           <div class="value">92%</div>
                         </div>
                       </div>
                          </div>
                   <!---->
               </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProjectSearch',
  data () {
    return {
      searchInputText: '',
      resultList: '',
      nowTitle: '',
      nowOverview: '',
      nowIcon: '',
      nowImage: ''
    }
  },
  methods: {
    projectSearch() {
      axios.get('/api/project/keyword/' + this.searchInputText)
      .then(res => {
        console.log(res.data)
        this.resultList = res.data
      })
    },
    gotoProject(route) {
      this.$router.replace(this.$route.query.redirect || '/projView/' + route + '/')
      console.log('/projView/' + route + '/')
      this.$store.commit('TOGGLE_PROJECT_SEARCH')
    },
    selectProject(index) {
      this.nowTitle = this.resultList[index].title
      this.nowOverview = this.resultList[index].description
      this.nowIcon = this.resultList[index].icon
      this.nowImage = '/api/files/attachedFiles/' + this.resultList[index].image
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
    .container {
        overflow:scroll;
      background-color:rgba(255,255,255,1);
      position:fixed;
      top:50px;
      left:0px;
      width:100%;
      height:100vh;
      z-index:2000;
    }
    .search-input {
        font-size:50px;
        border:0px;
        font-weight:700;
        width:100%;
        margin-top:20px;
        margin-bottom:20px;
    }
    .search-input:focus {
        outline:0px;
    }
    .search-input::placeholder {
        color:#6B6B6B;
    }
    .detail-box {
        margin:10px;
        background-color:#EFEFEF;
        height:73vh;
    }
    .result-box {
        margin:10px;
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
    .preview-box {
        width:100%;
        height:200px;
        background-color:white;
        background-size:cover;
    }
    
    .preview-box .inner {
        position:absolute;
        width:calc(100% - 48px);
        height:200px;
        background-color:rgba(0,0,0,0.5);
        text-align: center;
        padding:20px;
        padding-top:30px;
    }
    
    .preview-box .inner i {
        color:white;
        font-size:60px;
    }
    
    .preview-title {
        color:white;
        font-size:17px;
    }
    
    .preview-overview {
        color:white;
        font-size:12px;
        font-weight:100;
        display: inline-block; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .detail-icon {
        display:block;
        width:100%;
        height:125px;
        text-align: center;
        line-height: 15px;
        padding-top:35px;
        //border:1px solid red;
    }
    .detail-icon small{
        line-height: 10px;
        border-bottom:solid 1px #5477EB;
        color:#5477EB;
    }
    .detail-icon > .value{
        padding-top:15px;
        font-size:18px;
        font-weight: 600;
        color:#6B6B6B;
    }
    .detail-icon i {
        font-size:40px;
        color:#5477EB;
    }
    .info-icon-box {
        padding-left:20px;
        padding-right:20px;
    }
</style>
