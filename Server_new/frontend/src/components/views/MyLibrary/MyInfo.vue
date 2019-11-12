<template>
  <div>
      <section class="content">
       <div class="page-title-box">
                <h2>내 정보</h2>
                <small>개인 정보와 신뢰도 정보, 작성한 프로젝트를 확인할 수 있습니다.</small>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-4 col-xl-4" style="padding-left: 7px; padding-right: 0px;">
                <div class="blot-box box">
                  <div class="preview-box" v-bind:style="{ backgroundImage: 'url(' + this.$store.state.crntUserImg + ')' }">
                          <div class="inner">
                              <br><span class="name">{{this.$session.get('username')}}</span>
                              <br><span class="email">{{this.$store.state.crntWalletId}}</span>
                          </div>
                  </div>
                  <div class="info-icon-box row">
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-percent-line"></i><br>
                           <small>보유 Blot</small><br>
                           <div class="value">{{this.$store.state.crntBlots}}</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-group-fill"></i><br>
                           <small>신뢰점수</small><br>
                           <div class="value">{{this.$store.state.crntReliability}}</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-pages-line"></i><br>
                           <small>작성 프로젝트</small><br>
                           <div class="value">5</div>
                         </div>
                       </div>
                       <div class="col-md-3 p-0">
                         <div class="detail-icon">
                           <i class="ri-heart-2-line"></i><br>
                           <small>즐겨찾기</small><br>
                           <div class="value">{{nowFavoriteNum}}</div>
                         </div>
                       </div>
                  </div>
              </div>
                <div class="blot-box box padding-inner">
                    <div class="desc-box">
                      <div class="icon-box"><i class="ri-calendar-line"></i></div> <div class="title-box">지갑 공개 키</div><br>
                      <div class="small">{{this.$store.state.crntWalletId}}</div>
                    <div class="icon-box"><i class="ri-calendar-line"></i></div> <div class="title-box">정보 페이지 주소</div><br>
                      <div class="small">{{nowUrl}}/info/{{this.$session.get('username')}}</div>
                  </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-8 col-xl-8" style="padding-left: 7px; padding-right: 0px;">
                <div class="blot-box box">
                  <div class="box-header with-border"><i class="ri-paint-brush-line"></i> 신뢰점수 추이</div>
                  <div class="box-body">
                      <apexchart type=line width="100%" height=250 :options="chartOptions" :series="series" />
                  </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-8 col-xl-8" style="padding-left: 7px; padding-right: 0px;">
                <div class="blot-box box">
                    <div class="box-header with-border"><i class="ri-paint-brush-line"></i> 신뢰점수 추이</div>
                    <div class="box-body">
                        <div class="padding-inner">
                          <LogBox v-for="trustLog in trustLogs" :title="trustLog[0]" :text="trustLog[1]"></LogBox>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import LogBox from '../../widgets/LogBox'
export default {
  name: 'MyInfo',
  components: {
    apexcharts: VueApexCharts,
    LogBox
  },
  data () {
    return {
      nowUrl: '',
      addedList: [],
      trustLogs: [],
      oriTrustLog: [],
      nowFavoriteNum: 0,
      series: [{
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chartOptions: {
        colors: ['#FBC02D'],
        chart: {
          height: 250,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        }
      }
    }
  },
  methods: {
    getTrustLog() {
      axios.get('/api/project/user/translator1/trust')
      .then(res => {
        this.oriTrustLog = res.data
      })
    },
    getFavoriteProj () {
      axios.get('/api/user/' + this.$session.get('username') + '/project')
      .then(res => {
        if (res.data.length >= 0) {
          this.nowFavoriteNum = res.data.length
        }
      })
    },
    getAddedProj () {
      axios.get('/api/project/user/' + this.$session.get('username'))
      .then(res => {
        this.addedList = res.data
      })
    }
  },
  mounted () {
    this.nowUrl = window.location.origin
    this.$store.dispatch('REFRESH_USER_RELIABILITY', this.$session.get('username'))
    this.getFavoriteProj()
    this.getTrustLog()
  }
}
</script>

<style scoped>
    .content {
        padding:40px;
    }
    .preview-box {
        width:100%;
        height:400px;
        background-color:white;
        background-size:cover;
    }
    
    .preview-box .inner {
        position:absolute;
        width:100%;
        height:400px;
        background-color:rgba(0,0,0,0.5);
        text-align: left;
        padding:20px;
        padding-top:320px;
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
        border-bottom:solid 1px #FBC02D;
        color:#FBC02D;
    }
    .detail-icon > .value{
        padding-top:12px;
        font-size:15px;
        font-weight: 600;
        color:#6B6B6B;
    }
    .detail-icon i {
        font-size:40px;
        color:#FBC02D;
    }
    .info-icon-box {
        padding-left:20px;
        padding-right:20px;
    }
     .desc-box .icon-box {
        display: inline-block;
        vertical-align: middle;
    }
    .desc-box .title-box {
        display: inline-block;
        font-weight: 600;
    }
    .desc-box .small {
       font-size: 11px;
        border-top:1px solid #C5C5C5;
        padding-top:5px;
        margin-top:5px;
        margin-bottom:15px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .padding-inner {
        padding:20px;
    }
</style>
