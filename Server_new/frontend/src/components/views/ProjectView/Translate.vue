<template>
  <div>
      <div class="col-md-7 col-lg-8" style="padding-left: 0px; padding-right:7px">
          <TranslateView></TranslateView>
      </div>
      <div class="col-md-5 col-lg-4" style="padding-left: 7px; padding-right: 0px;">
          <div class="blot-box box">
              <div class="box-header with-border"><i class="ri-global-line"></i> 번역</div>
              <div class="box-header-menu">
                  <ul>
                      <li class="active">평가</li>
                      <li>번역</li>
                  </ul>
              </div>
              <div class="p-0 box-body">
                  <br><br>
                  <span class="small-alert m-20">선택한 원문</span>
                  <div class="original-sentence">The background property in CSS can accept comma separated values. "Multiple" backgrounds, if you will. You can also think of them as layered backgrounds since they have a stacking order.</div>
                  <br>
                  <TranslateEval></TranslateEval>
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
    return {}
  },
  methods: {},
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
