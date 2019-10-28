<template>
  <div>
      <div class="container">
          <div class="row">
               <div class="col-md-3"></div>
            <div class="col-md-6 col-centered div-middle m-0 p-0">
              <input id="search-input" class="search-input" type=text placeholder="검색하기...">
            </div>
          </div>
          <div class="row">
              <div class="col-md-3"></div>
            <div class="col-md-6 col-centered div-middle m-0 p-0">
                <div class="result-box">
                    <div class="row">
                        <!--결과 각각의 상자-->
                        <div class="col-md-6 each-container">
                            <div class="each-box">
                                <div class="icon-box"><i class="ri-building-line"></i></div>
                                <div class="proj-title">
                                    <h4>프로젝트 이름 1</h4>
                                    <small>프로젝트 요약</small>
                                </div>
                            </div>
                        </div>
                        <!---->
                        <!--결과 각각의 상자-->
                        <div class="col-md-6 each-container">
                            <div class="each-box">
                                <div class="icon-box"><i class="ri-building-line"></i></div>
                                <div class="proj-title">
                                    <h4>프로젝트 이름 1</h4>
                                    <small>프로젝트 요약</small>
                                </div>
                            </div>
                        </div>
                        <!---->
                        <!--결과 각각의 상자-->
                        <div class="col-md-6 each-container">
                            <div class="each-box">
                                <div class="icon-box"><i class="ri-building-line"></i></div>
                                <div class="proj-title">
                                    <h4>프로젝트 이름 1</h4>
                                    <small>프로젝트 요약</small>
                                </div>
                            </div>
                        </div>
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
// import axios from 'axios'

export default {
  name: 'ProjectSearch',
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
    .container {
        overflow:scroll;
      background-color:rgba(255,255,255,0.95);
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
