<template>
  <div>
                   <div class="detail-box">
                   <!--디테일 표시 상자-->
                   <div class="preview-box" v-bind:style="{ backgroundImage: 'url(/api/files/attachedFiles/' + image + ')' }">
                          <div class="inner">
                              <i v-bind:class="resultList.icon"></i>
                              <br><div class="preview-title">{{resultList.title}}</div>
                              <br><span v-if="resultList.valid" class="preview-overview"><i class="ri-pie-chart-line"></i> 번역 진행중</span>
                              <span v-if="!resultList.valid" class="preview-overview"><i class="ri-award-fill"></i> 번역 완료됨</span>
                          </div>
                    </div>
                   <div class="info-icon-box row">
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-percent-line"></i><br>
                           <small>전체 진행도</small><br>
                           <div class="value">{{transPer}}</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-group-fill"></i><br>
                           <small>참여자 수</small><br>
                           <div class="value">{{transCnt}}</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-pages-line"></i><br>
                           <small>원문 분량</small><br>
                           <div class="value">{{originalSize}}</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-heart-2-line"></i><br>
                           <small>즐겨찾기 수</small><br>
                           <div class="value">{{favoriteNum}}</div>
                         </div>
                       </div>
                  </div>
                   <!---->
                  <div class="desc-box">
                      <div class="icon-box"><i class="ri-calendar-line"></i></div> <div class="title-box">마감일</div><br>
                      <div class="small">{{end}}</div>
                      <div class="icon-box"><i class="ri-calendar-line"></i></div> <div class="title-box">태그</div><br>
                      <div class="small"><span class="tags" v-for="eachTag in resultList.tags" v-on:click="gotoTagProject(eachTag)"> #{{eachTag}} </span></div>
                      <div class="icon-box"><i class="ri-calendar-line"></i></div> <div class="title-box">상세설명</div><br>
                      <div class="small">{{resultList.description}}</div>
                  </div>
               </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailBox',
  props: {
    projectId: {
      type: String
    }
  },
  data () {
    return {
      resultList: [],
      transPer: 0,
      transCnt: 0,
      originalSize: 0,
      favoriteNum: 0,
      end: '',
      image: '1573054850793.jpg'
    }
  },
  methods: {
    gotoTagProject(route) {
      this.$router.replace(this.$route.query.redirect || '/tagproj/' + route + '/')
    }
  },
  mounted () {
  },
  watch: {
    // 컴포넌트에 바인딩된 ProjectId가 달라지면, 바로 정보도 바뀐다.
    projectId: function (val) {
      axios.get('/api/project/projInfo/' + this.projectId)
      .then(res => {
        this.resultList = res.data
        console.log(res.data)
        this.end = this.$moment(res.data.end).format('YYYY년 MM월 DD일')
        this.image = res.data.image
      })
      axios.get('/api/project/' + this.projectId + '/summary')
      .then(res => {
        this.transPer = res.data.transPer
        this.transCnt = res.data.transCnt
        this.originalSize = res.data.kb
        this.favoriteNum = res.data.like
      })
    }
  }
}
</script>

<style scoped>
    .detail-box {
        background-color:#EFEFEF;
        height:76vh;
        width:100%;
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
        width:100%;
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
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
    .desc-box {
        background-color:white;
        margin:10px;
        font-size:15px;
        padding:20px;
        color:#6B6B6B;
        height:39vh;
        overflow-x: scroll;
        width:calc(100% - 20px);
    }
    .desc-box .icon-box {
        display: inline-block;
        vertical-align: middle;
    }
    .desc-box .title-box {
        display: inline-block;
        font-weight: 600;
        font-size:12px;
    }
    .desc-box .small {
       font-size: 13px;
        border-top:1px solid #C5C5C5;
        padding-top:5px;
        margin-top:5px;
        margin-bottom:15px;
    }
    .tags {
       //text-decoration: underline;
    }
    .preview-overview i {
        font-size:15px!important;
    }
</style>
