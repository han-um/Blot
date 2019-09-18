<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
            <div class="box project-contents">
                <div class="p-0 box-header with-border">
                    <div class="icon-box"><i class="ri-building-line"></i></div>
                    <div class="proj-title">
                        <h4>프로젝트 이름 1</h4>
                        <small>2019년 5월 20일 ~ 2019년 7월 27일</small>
                    </div>
                    <div class="proj-submenu">
                        <router-link to="overview">요약</router-link>
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
  data () {
    return {
      githubUrl: 'https://api.github.com/search/repositories?q=language%3Ajavascript&sort=stars',
      response: null,
      error: null
    }
  },
  methods: {
    callGitHub () {
      axios.get(this.githubUrl)
        .then(response => {
          console.log('GitHub Response:', response)

          if (response.status !== 200) {
            this.error = response.statusText
            return
          }

          this.response = response.data.items
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response.statusText
        })
    }
  },
  mounted () {
    this.callGitHub()
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
        background-color: #5CD590;
        float: left;
        width: 65px;
        height: 65px;
        vertical-align: middle;
        text-align: center;
        font-size: 40px;
        color: white;
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
    
    
</style>
