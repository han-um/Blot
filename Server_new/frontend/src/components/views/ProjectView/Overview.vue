<template>
  <div class="overview-wrapper">
    <div class="image-box" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
        <div class="inner-box">
            <center><img v-if="this.$store.state.crntProjEnded" src="/static/img/group37.png" class="img-box hidden-xs" alt="Responsive image">
            <img v-if="!this.$store.state.crntProjEnded" src="/static/img/group36.png" class="img-box hidden-xs" alt="Responsive image">
            </center>
        </div>
        <!--img src="/static/img/group36.png"-->
    </div>
    <div class="contents">
        <div class="row" v-if="this.$store.state.crntProjEnded">
            <div class="col-md-9 p-0">
                    <div class="col-md-7 p-0">
                         <div class="blot-box box">
                            <div class="box-header with-border"><i class="ri-t-box-line"></i> 프로젝트 개요</div>
                            <div class="box-body h-300">
                                {{description}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 p-0">
                        <div class="blot-box box yellow-border">
                            <div class="box-header with-border"><i class="ri-t-box-line"></i> 번역 지분</div>
                            <div class="box-body h-300">
                                <apexchart v-if="drawTransChart" width="100%" height="300px" type="donut" :options="transChartOptions" :series="transSeries"></apexchart>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 p-0">
                            <div class="blot-box box yellow-border">
                                <div class="box-header with-border"><i class="ri-t-box-line"></i> 평가 지분</div>
                                <div class="box-body h-300">
                                    <apexchart  v-if="drawEvalChart" width="100%" height="300px" type="donut" :options="evalChartOptions" :series="evalSeries"></apexchart>
                                </div>
                            </div>
                        </div>
                    <div class="col-md-7 p-0">
                         <div class="blot-box box">
                            <div class="box-header with-border"><i class="ri-t-box-line"></i> 프로젝트 정보</div>
                            <div class="box-body h-300">
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-percent-line"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">번역 진행률</span>
                                              <span class="info-box-number">{{transPer}}%</span>
                                                  <span class="progress-description">
                                                    전체 원문 대비 <br>번역이 작성된 문장의 비율
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-group-fill"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">번역 참여자</span>
                                              <span class="info-box-number">{{transCnt}}명</span>
                                                  <span class="progress-description">
                                                    전체 프로젝트에 <br>번역을 작성한 번역자 수
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-pages-line"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">원문 크기</span>
                                              <span class="info-box-number">{{originalByte}}K</span>
                                                  <span class="progress-description">
                                                    전체 원문의 크기
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-heart-2-line"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">즐겨찾기</span>
                                              <span class="info-box-number">{{favoriteNum}}</span>
                                                  <span class="progress-description">
                                                    이 프로젝트를 <br> 즐겨찾기한 사람의 수
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="col-md-12 p-0">
                         <div class="blot-box box">
                            <div class="box-header with-border"><i class="ri-t-box-line"></i> openAPI</div>
                            <div class="box-body h-300">
                                <div class="box box-warning">
                                <div class="box-header with-border">
                                  <h3 class="box-title" style="padding-top:13px;font-size:12px;">번역 지분 : 프로젝트에 참여한 번역자별 지분 정보 </h3>

                                  <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                  </div>
                                  <!-- /.box-tools -->
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body" style="font-size:12px;">
                                    {{nowUrl}}/api/project/{{this.$route.params.id}}/deadline/trans
                                </div>
                                <!-- /.box-body -->
                              </div>
                            <div class="box box-warning">
                                <div class="box-header with-border">
                                  <h3 class="box-title" style="padding-top:13px;font-size:12px;">평가 지분 : 각 번역에 평가한 평가자별 지분 정보 </h3>

                                  <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                  </div>
                                  <!-- /.box-tools -->
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body" style="font-size:12px;">
                                    {{nowUrl}}/api/project/{{this.$route.params.id}}/deadline/eval
                                </div>
                                <!-- /.box-body -->
                              </div>
                            <div class="box box-warning">
                                <div class="box-header with-border">
                                  <h3 class="box-title" style="padding-top:13px;font-size:12px;">신뢰도 이력 : 프로젝트를 통해 변경된 신뢰점수 이력 </h3>

                                  <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                  </div>
                                  <!-- /.box-tools -->
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body" style="font-size:12px;">
                                    {{nowUrl}}/api/project/{{this.$route.params.id}}/trust
                                </div>
                                <!-- /.box-body -->
                              </div>
                            
                            </div>
                        </div>
                    </div>
            </div>
            <div class="col-md-3 p-0">
                 <div class="blot-box box">
                    <div class="box-header with-border"><i class="ri-t-box-line"></i> 로그</div>
                     <div class="box-body h-900">
                         <LogBox v-for="trustLog in trustLogs" :title="trustLog[0]" :text="trustLog[1]"></LogBox>
                     </div>
                 </div>
            </div>
        </div>
        <div class="row" v-if="!this.$store.state.crntProjEnded">
            <div class="col-md-8 p-0">
                         <div class="blot-box box">
                            <div class="box-header with-border"><i class="ri-t-box-line"></i> 프로젝트 개요</div>
                            <div class="box-body h-300">
                                {{description}}
                            </div>
                        </div>
            </div>
            <div class="col-md-4 p-0">
                         <div class="blot-box box">
                            <div class="box-header with-border"><i class="ri-t-box-line"></i> 프로젝트 정보</div>
                            <div class="box-body h-300">
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-percent-line"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">번역 진행률</span>
                                              <span class="info-box-number">{{transPer}}%</span>
                                                  <span class="progress-description">
                                                    전체 원문 대비 <br>번역이 작성된 문장의 비율
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-group-fill"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">번역 참여자</span>
                                              <span class="info-box-number">{{transCnt}}명</span>
                                                  <span class="progress-description">
                                                    전체 프로젝트에 <br>번역을 작성한 번역자 수
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-pages-line"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">원문 크기</span>
                                              <span class="info-box-number">{{originalByte}}K</span>
                                                  <span class="progress-description">
                                                    전체 원문의 크기
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                                <div class="col-md-6 p-0">
                                    <div class="info-box">
                                            <span class="info-box-icon"><i class="ri-heart-2-line"></i></span>

                                            <div class="info-box-content">
                                              <span class="info-box-text">즐겨찾기</span>
                                              <span class="info-box-number">{{favoriteNum}}</span>
                                                  <span class="progress-description">
                                                    이 프로젝트를 <br> 즐겨찾기한 사람의 수
                                                  </span>
                                            </div>
                                            <!-- /.info-box-content -->
                                          </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import LogBox from '../../widgets/LogBox'
export default {
  name: 'ProjectViewOverview',
  data () {
    return {
      image: '',
      description: '',
      transPer: 0,
      transCnt: 0,
      originalByte: 0,
      favoriteNum: 0,
      trustLogs: [],
      nowUrl: '',
      tempEnded: false,
      transChartOptions: {
        colors: ['#5AE0A1', '#51C991', '#48AF7F', '#3C936B'],
        labels: []
      },
      transSeries: [],
      drawTransChart: false,
      evalChartOptions: {
        colors: ['#5AE0A1', '#51C991', '#48AF7F', '#3C936B'],
        labels: []
      },
      evalSeries: [],
      drawEvalChart: false
    }
  },
  components: {
    apexcharts: VueApexCharts,
    LogBox
  },
  methods: {
    getProjectInfo() {
      axios.get('/api/project/' + this.$route.params.id)
      .then(response => {
        this.description = response.data.description
        console.log('Response:', response.data.title)
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }
        this.image = '/api/files/attachedFiles/' + response.data.image
      })
      .catch(error => {
        console.log('error', error.response)
        this.error = error.response.statusText
      })
      axios.get('/api/project/' + this.$route.params.id + '/summary')
      .then(res => {
        this.transPer = res.data.transPer
        this.transCnt = res.data.transCnt
        this.originalByte = res.data.kb
        this.favoriteNum = res.data.like
      })
    },
    getTransChartData() {
      axios.get('/api/project/' + this.$route.params.id + '/deadline/trans').then(res => {
        var tempArray1 = []
        var tempArray2 = []
        for (var i = 0; i < res.data.length; i++) {
          tempArray1.push(res.data[i].transId)
          tempArray2.push(res.data[i].percentage)
        }
        this.transChartOptions.labels = tempArray1
        this.transSeries = tempArray2
        this.drawTransChart = true
      })
    },
    getEvalChartData() {
      axios.get('/api/project/' + this.$route.params.id + '/deadline/eval').then(res => {
        var tempArray1 = []
        var tempArray2 = []
        for (var i = 0; i < res.data.length; i++) {
          tempArray1.push(res.data[i].evalId)
          tempArray2.push(res.data[i].percentage)
        }
        this.evalChartOptions.labels = tempArray1
        this.evalSeries = tempArray2
        this.drawEvalChart = true
      })
    },
    getTrustLog() {
      axios.get('/api/project/' + this.$route.params.id + '/trust').then(res => {
        var tempArray2 = []
        for (var i = 0; i < res.data.length; i++) {
          var tempArray1 = []
          if (res.data[i].type === '0') {
            tempArray1.push(res.data[i].userId + '의 신뢰점수 반영')
            tempArray1.push('번역활동을 통해 ' + res.data[i].score + '획득, 현재 총' + res.data[i].ascore + '점')
          } else if (res.data[i].type === '1') {
            tempArray1.push(res.data[i].userId + '의 신뢰점수 반영')
            tempArray1.push('평가활동을 통해' + res.data[i].score + '획득, 현재 총' + res.data[i].ascore + '점')
          }
          tempArray2.push(tempArray1)
        }
        this.trustLogs = tempArray2
      })
    }
  },
  mounted () {
    this.getProjectInfo()
    // 마감된 프로젝트만 블록체인 관련 정보를 불러옴
    axios.get('/api/project/' + this.$route.params.id + '/deadline')
    .then(res => {
      if (res.data === true) {
        this.getTransChartData()
        this.getEvalChartData()
        this.getTrustLog()
        this.nowUrl = window.location.origin
      }
    })
  }
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
      background-position: bottom;
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
        padding-top:10px;
        width:100%;
        padding:15px;
    }
    .white-box {
        border:1px solid #C5C5C5;
    }
    .left-margin{
        margin-left:10px;
    }
    .h-300{
        height:300px;
    }
    .h-900{
        height:1005px;
    }
    .yellow-border {
        border:1px solid #FBC02D;
    }
    .info-box-icon {
        background-color:#5CD590;
        color:white;
        height:130px;
        padding-top:20px;
    }
    .info-box {
        height:130px;
    }
    .progress-description {
        color:#C5C5C5;
        font-size:12px;
    }
    .yellow {
        background-color:#FBC02D;
        color:white;
    }
    .alert h4 {
        padding:0px;
    }
    .box-title {
        padding-top:10px;
        padding-left:10px;
        font-weight: 600;
        color:#6B6B6B;
    }
    .box-header {
        background-color:#EFEFEF;
    }
    .box-body{
      color:#6B6B6B;  
    }
</style>
