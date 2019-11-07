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
              <div class="col-md-3"></div>
            <div class="col-md-6 col-centered div-middle m-0 p-0">
                <div class="result-box">
                    <div class="row">
                        <!--결과 각각의 상자-->
                        <transition-group enter-active-class="animated zoomIn" tag="div">
                        <div v-for="result in resultList" v-bind:key="result._id" v-on:click="gotoProject(result._id)" class="col-md-6 each-container">
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
              <div class="col-md-3">
               <div class="detail-box">
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
      resultList: ''
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
</style>
