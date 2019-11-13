<template>
  <div>
     <section class="content">
        <div class="page-title-box">
                <h2>태그별 프로젝트</h2>
                <small>전체 태그와 각 태그별 프로젝트를 확인할 수 있습니다.</small>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12 col-xl-12" style="padding-left: 7px; padding-right: 0px;">
               <div class="blot-box box">
                  <div class="box-header with-border"><i class="ri-file-info-line"></i> 태그 빈도</div>
                  <div class="box-body">
                      <div id="chart">
                          <apexchart v-if="showChart" type=bar height=300 :options="chartOptions" :series="series" />
                        </div>
                  </div>
               </div>
             </div>
             <div class="col-md-12 col-lg-12 col-xl-12" style="padding-left: 7px; padding-right: 0px;">
               <div class="blot-box box">
                  <div class="box-header with-border"><i class="ri-file-info-line"></i> 태그 목록</div>
                  <div class="box-body">
                      <TagBox></TagBox>
                  </div>
               </div>
             </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import TagBox from '../../widgets/TagBox'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'TagList',
  components: {
    TagBox,
    apexcharts: VueApexCharts
  },
  data () {
    return {
      showChart: false,
      series: [{
        data: []
      }],
      chartOptions: {
        colors: ['#5CD590'],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: []
        }
      }
    }
  },
  methods: {
    async setChart() {
      // STEP1 : 전체 태그 목록 가져오기
      await axios.get('/api/project/tags/')
      .then(res => {
        this.chartOptions.xaxis.categories = res.data
      })
      // STEP2 : 각각의 태그 목록에 대해 프로젝트 갯수 누적하기
      for (var i = 0, tag; (tag = this.chartOptions.xaxis.categories[i]); i++) {
        await axios.get('/api/project/tags/' + tag)
        .then(res => {
          this.series[0].data.push(res.data.length)
        })
      }
      this.showChart = true
    }
  },
  mounted () {
    this.setChart()
  }
}
</script>

<style scoped>
    .content {
        padding:40px;
    }
    .box-body {
        min-height: 300px;
    }
</style>
