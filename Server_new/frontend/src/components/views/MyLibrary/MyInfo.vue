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
                           <div class="value">1</div>
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
                           <div class="value">4</div>
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
                  <div class="box-header with-border"><i class="ri-paint-brush-line"></i> 디자인</div>
                  <div class="box-body">
                      sad
                  </div>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyInfo',
  data () {
    return {
      nowUrl: ''
    }
  },
  methods: {
    getTrustLog() {
      axios.get('/api/project/user/' + this.$session.get('username') + '/trust')
      .then(res => {
      })
    }
  },
  mounted () {
    this.nowUrl = window.location.origin
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
       font-size: 13px;
        border-top:1px solid #C5C5C5;
        padding-top:5px;
        margin-top:5px;
        margin-bottom:15px;
    }
    .padding-inner {
        padding:20px;
    }
</style>
