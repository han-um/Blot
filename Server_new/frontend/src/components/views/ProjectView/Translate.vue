<template>
  <div>
      <div class="col-md-6 col-lg-7 col-xl-8" style="padding-left: 0px; padding-right:7px; ">
          <TranslateView></TranslateView>
      </div>
      <div class="col-md-6 col-lg-5 col-xl-4" style="padding-left: 7px; padding-right: 0px;">
          <div class="blot-box box">
              <div class="box-header with-border"><i class="ri-global-line"></i> 번역</div>
              <div class="box-header-menu">
                  <ul>
                      <li v-on:click="changeTransMenu('eval')" v-bind:class="{active: this.transMenuState==='eval'}">평가</li>
                      <li v-on:click="changeTransMenu('add')"  v-bind:class="{active: this.transMenuState==='add'}">번역</li>
                  </ul>
              </div>
              <div class="p-0 vh-75 box-body scrollable ">
                  <br><br>
                  <span class="small-alert m-20">선택한 원문</span>
                  <div class="original-sentence">{{this.$store.state.crntStcText}}</div>
                  <br>
                  <!--번역 메뉴 표시 부분-->
                    <TranslateEval v-show="this.transMenuState==='eval'"></TranslateEval>
                    <TranslateAdd v-show="this.transMenuState==='add'"></TranslateAdd>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
import TranslateAdd from './TranslateAdd'
import TranslateEval from './TranslateEval'
import TranslateView from './TranslateView'

export default {
  name: 'ProjectViewTranslate',
  components: {
    TranslateAdd,
    TranslateEval,
    TranslateView
  },
  data () {
    return {
      transMenuState: 'eval'
    }
  },
  methods: {
    changeTransMenu: function(menuState) {
      this.transMenuState = menuState
    }
  },
  mounted () {}
}
</script>

<style scoped>
    .original-sentence {
        padding-top:10px;
        padding-left:20px;
        padding-right:20px;
        font-size:17px;
    }
</style>
