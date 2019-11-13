<template>
  <div>
    <section class="content">
        <div class="page-title-box">
            <div class="row">
                 <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12" style="padding-left: 7px; padding-right: 0px;">
                     <h2>새 번역 프로젝트 만들기</h2>
                     <small>다른 번역자가 참여할 수 있는 번역 프로젝트를 만들고, 원문을 업로드합니다.</small>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12" style="padding-left: 7px; padding-right: 0px;">
                     <div class="submit-btn hidden-xs hidden-md hidden-sm" v-on:click="addProject()">
                         <div class="icon"><i class="ri-upload-2-line"></i></div>
                         <div class="inner-text">등록하기</div>
                     </div>
                 </div>
            </div>
        </div>
      <div class="row">
          <!--기본 정보-->
          <div class="col-md-6 col-lg-4 col-xl-4" style="padding-left: 7px; padding-right: 0px;">
              <div class="blot-box box">
                  <div class="box-header with-border"><i class="ri-file-info-line"></i> 기본 정보</div>
                  <div class="box-body">
                      <center>프로젝트 제목</center>
                      <input type="text" v-model="projectTitle" class="title-input" placeholder="원문의 내용을 직관적으로 나타내 주세요">
                      <center>프로젝트 요약</center>
                      <textarea v-model="projectOverview"class="overview-input" placeholder="원문의 내용과 번역 목적 등을 입력해주세요"></textarea>
                      <center>번역 마감일</center>
                      <v-date-picker
                         mode='single'
                        tint-color='#5CD590'
                        v-model='selectedDate'
                        is-inline
                        is-expanded>
                      </v-date-picker>
                      <center>해시태그</center>
                      <v-tag-input v-model="projectTags" :separator="' '"></v-tag-input>
                          <div class="tag-wrapper"><div v-for="tag in projectTags" class="tag-box">{{tag}}
                          </div><div class="tag-info" v-show="projectTags.length==[]">공백(space)로 구분합니다</div>
                          </div>
                      <center>보상 금액</center>
                      <div class="reward-box"><div class="inner">
                          <span class="number">{{this.$store.state.crntBlots}}</span><br>
                          {{this.$store.state.tokenName}}<br>
                          현재 보유중
                      </div></div>
                       <div class="reward-box highlight"><div class="inner">
                          <input type="text" v-model="reward" placeholder="입력">
                          {{this.$store.state.tokenName}}<br>
                          번역 보상금
                      </div></div>
                       <div class="reward-box"><div class="inner">
                          <span class="number">{{this.$store.state.crntBlots - reward}}</span><br>
                          {{this.$store.state.tokenName}}<br>
                          지급후 잔액
                      </div></div><br><br>
                      <center><div class="info">번역이 마감되면, 해당 금액을 기여도에 따라<br> 
<B>번역자</B>와 <B>평가자</B>들에게 공평하게 지불합니다.
                      </div></center>
                  </div>
              </div>
          </div>
          <!--디자인-->
          <div class="col-md-6 col-lg-4 col-xl-4" style="padding-left: 7px; padding-right: 0px;">
              <div class="blot-box box">
                  <div class="box-header with-border"><i class="ri-paint-brush-line"></i> 디자인</div>
                  <div class="box-body">
                      <center>미리보기</center>
                      <div class="preview-box">
                          <div class="inner">
                              <i v-bind:class="$store.state.crntIcon"></i>
                              <br><span class="preview-title">{{projectTitle}}</span>
                              <br><span class="preview-overview">{{projectOverview}}</span>
                          </div>
                      </div>
                      <center>대표 아이콘</center>
                      <br>
                      <IconSelector></IconSelector>
                      <br>
                      <center>대표 이미지</center>
                      <input class="input-file" type="file" name="myfile" ref='projectImage'>
                  </div>
              </div>
          </div>
          <!--원문 입력-->
          <div class="col-md-12 col-lg-4 col-xl-4" style="padding-left: 7px; padding-right: 0px;">
              <div class="blot-box box">
                  <div class="box-header with-border"><i class="ri-file-text-line"></i> 원문 입력</div>
                  <div class="box-body">
                      <textarea v-model="projectAll" class="original-input" placeholder="입력한 원문은 문장 단위로 나누어 번역이 이루어집니다."></textarea>
                  </div>
              </div>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 0px; margin-bottom:40px;">
                     <div class="submit-btn hidden-lg" v-on:click="addProject()">
                         <div class="icon"><i class="ri-upload-2-line"></i></div>
                         <div class="inner-text">등록하기</div>
                     </div>
                 </div>
          </div>
    </section>
  </div>
</template>

<script>
import VTagInput from 'v-tag-input'
import IconSelector from './IconSelector'
import axios from 'axios'
export default {
  name: 'ProjectAdd',
  components: {
    VTagInput,
    IconSelector
  },
  props: ['id'],
  data () {
    return {
      projectTags: [],
      projectTitle: '',
      projectOverview: '',
      reward: '',
      selectedDate: null,
      projectAll: '',
      projectImage: ''
    }
  },
  methods: {
    addProject () {
      // 이미지 폼 세팅
      this.projectImage = this.$refs.projectImage.files[0]
      const formData = new FormData()
      formData.append('projectFile', this.projectImage)
      var projId
      // Step 1 : DB에 프로젝트 등록
      axios.post('/api/files/upload/project', formData)
      .then(res => {
        return axios.post('/api/project/', {
          title: this.projectTitle,
          description: this.projectOverview,
          language: 'English',
          tags: this.projectTags,
          end: this.selectedDate,
          reward: this.reward,
          icon: this.$store.state.crntIcon,
          all: this.projectAll,
          user: this.$session.get('username'),
          image: res.data
        })
      })
      .then(res => {
        projId = res.data
        console.log(projId)
        // Step 2 : 대납 처리 및 Sign 요청
        var payload = {
          'projectId': projId,
          'writerId': this.$session.get('username'),
          'deadline': this.$moment(this.selectedDate).format('YYYY.MM.DD'),
          'reward': this.reward
        }
        return this.$store.dispatch('CREATE_NEW_PROJECT', payload)
      })
      .then(res => {
        // Step 3 : 결과에 따라 DB에 등록된 프로젝트 삭제 혹은 유지
        this.$swal('프로젝트 등록', '프로젝트가 등록되었습니다.', 'success')
      })
      .catch(error => {
        // Step 3 : DB에 생성된 프로젝트를 다시 지우기
        console.log(error)
        axios.post('/api/project/delete', {p_num: projId})
        .then(res => {
          this.$swal('프로젝트 등록 실패', '블록체인 대납 서명에 실패하였습니다.(Step 2)<br> 보유하고 있는 토큰량을 확인하세요.', 'error')
        })
        .catch(err => {
          this.$swal('프로젝트 등록 실패', '블록체인 대납 서명 & DB 데이터 지우기 실패하였습니다.(Step 3)<br>' + err, 'error')
        })
      })
    }
  },
  mounted () {
    // 이 페이지는 로그인되어있어야만 사용할 수 있음
    if (!this.$session.has('username')) {
      this.$router.replace(this.$route.query.redirect || '/login/')
    }
  }
}
import Vue from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
Vue.use(VCalendar)
</script>

<style scoped>
    .content {
        padding:40px;
    }
    .box-body {
        padding:10px;
        font-size:12px;
    }
    .box-body center {
        padding-top:10px;
        padding-bottom:5px;
    }
    .title-input {
        width:100%;
        padding:5px;
        border:0px;
        background-color:#E8E8E8;
        text-align: center;
        font-weight: 100;
        border-radius: 20px 0px 0px 0px;
    }
    
    .v-tag-input {
        width:100%;
        padding:5px;
        border:0px;
        background-color:#E8E8E8;
        text-align: center;
        font-weight: 100;
        border-radius: 20px 0px 0px 0px;
    }
    
    .tag-box {
        float:left;
        padding:5px;
        padding-left:10px;
        padding-right:10px;
        color:white;
        background-color:#6A6767;
        margin:5px;
        margin-left:0px;
        border-radius: 5px;
    }
    
    .tag-wrapper {
        width:100%;
        height:35px;
        overflow-y:hidden;
    }
    
    .tag-wrapper .tag-info {
        padding:5px;
        color:#6B6B6B;
        text-align: center;
    }
    
    .overview-input {
        width:100%;
        padding:5px;
        border:0px;
        background-color:#E8E8E8;
        text-align: center;
        font-weight: 100;
        border-radius: 20px 0px 0px 0px;
        height:100px;
        vertical-align: middle;
    }
    .reward-box {
        float:left;
        margin:3px;
         width: calc(33% - 6px);
        padding-bottom: calc(33% - 6px);
        background-color:#E8E8E8;
    }
    
    .highlight {
        background-color:#FBC02D;
    }
    
    .highlight .inner {
        color:white;
    }
    
    .reward-box .inner {
        padding-left:10px;
        position: absolute;
        width: calc(30% - 16px);
        height: calc(30% - 16px);
        font-weight:100;
        font-size:10px;
    }
    
    .reward-box .inner input {
        width: 100%;
        font-size:30px;
        font-weight:600;
        background:none;
        border:none;
        height:42px;
    }
    
    .reward-box .inner input::placeholder {
        color:white;
    }
    
    .reward-box .inner .number {
        font-size:25px;
        font-weight:600;
    }
    
    .info {
        color:#6B6B6B;
        padding-top:6px;
        font-size:11px;
        font-weight:100;
        line-height: 13px;
    }
    
    .preview-box {
        width:100%;
        height:160px;
        background-color:black;
    }
    
    .preview-box .inner {
        position:absolute;
        width:calc(100% - 20px);
        height:160px;
        background-color:rgba(255,255,255,0.5);
        text-align: center;
        padding:10px;
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
    
    .original-input {
        width:100%;
        padding:5px;
        border:0px;
        background-color:#E8E8E8;
        font-weight: 100;
        border-radius: 20px 0px 0px 0px;
        height:80vh;
        vertical-align: middle;
    }
    
    .original-input::placeholder {
        text-align: center;
    }
    
    .submit-btn {
        background-color:#FBC02D;
        height:55px;
        border-radius:5px;
        text-align: center;
        vertical-align: middle;
        color:white;
    }
    
    .submit-btn .inner-text {
        font-size:15px;
        line-height: 10px;
    }
    
    .submit-btn .icon {
        font-size:23px;
    }
    
    
    
</style>
