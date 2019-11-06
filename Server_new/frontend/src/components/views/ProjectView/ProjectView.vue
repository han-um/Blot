<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
            <div class="box project-contents">
                <div class="p-0 box-header with-border">
                    <div class="icon-box green"><i class="ri-building-line"></i></div>
                    <div class="icon-box"  v-bind:class="{yellow : isFavorite}" v-on:click=" setFavorite()"><i class="ri-heart-2-line"></i></div>
                    <div class="proj-title">
                        <h4>{{title}}</h4>
                        <small>{{start}} ~ {{end}}</small>
                    </div>
                    <div class="proj-submenu">
                        <router-link to="./">요약</router-link>
                        <router-link to="trans">번역 보기</router-link>
                        <router-link to="users">참여자</router-link>
                    </div>
                </div>
                <div class="box-body">
                    <transition enter-active-class="animated fadeIn">
                        <router-view></router-view>
                    </transition>
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
  name: 'ProjectView',
  props: ['id'],
  data () {
    return {
      response: null,
      error: null,
      title: '',
      icon: '',
      start: '',
      end: '',
      isFavorite: ''
    }
  },
  methods: {
    getProjectInfo() {
      // 프로젝트 정보 가져오기
      axios.get('/api/project/' + this.$route.params.id)
      .then(response => {
        console.log('Response:', response.data.title)
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }
        console.log(response)
        this.title = response.data.title
        this.icon = response.data.icon
        this.start = this.$moment(response.data.start).format('YYYY년 MM월 DD일')
        this.end = this.$moment(response.data.end).format('YYYY년 MM월 DD일')
      })
      .catch(error => {
        console.log('error', error.response)
        this.error = error.response.statusText
      })
      // 즐겨찾기 등록여부 확인
      axios.get('/api/user/' + this.$session.get('username') + '/project/' + this.$route.params.id)
      .then(res => {
        this.isFavorite = res.data
      })
    },
    setFavorite() {
      if (this.isFavorite) {
        this.$swal('즐겨찾기 실패', '이미 즐겨찾기에 등록되어 있습니다.', 'error')
      } else {
        axios.post('/api/user/bookmark', {userId: this.$session.get('username'), projId: this.$route.params.id})
        .then(res => {
          this.$swal('즐겨찾기 추가', '내 서재 메뉴에서 즐겨찾기된 프로젝트를 <br> 한눈에 확인할 수 있습니다.', 'success')
          this.isFavorite = true
        })
      }
    }
  },
  mounted () {
    // 이 페이지는 로그인되어있어야만 사용할 수 있음
    this.getProjectInfo()
    if (!this.$session.has('username')) {
      this.$router.replace(this.$route.query.redirect || '/login/')
    }
  }
}
</script>

<style scoped>
    .proj-title {
        color: #6B6B6B;
        margin: 13px;
        float: left;
        vertical-align: middle;
        display:inline;
    }
    
    .proj-title h4 {
        font-size: 18px;
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
    
    .box-header > .icon-box {
        padding: 5px;
        float: left;
        width: 65px;
        height: 65px;
        vertical-align: middle;
        text-align: center;
        font-size: 40px;
        color: white;
        background-color: gray;
    }
    
    .proj-submenu {
        float:right;
        margin-top:38px;
        margin-right:20px;
    }
    
    .proj-submenu a {
        padding-right:10px;
        padding-left:10px;
        padding-bottom:5px;
        font-weight: 400;
    }
    
    .proj-submenu > .active{
        font-weight: 600;
        border-bottom:solid #707070 2px;
    }
    
    .project-contents{
        height:100%;    
    }
    .icon-box.green {
        
        background-color: #5CD590;
    }
    .icon-box.yellow {
        background-color:#985656;
    }
    
</style>
