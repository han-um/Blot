<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
            <div class="box">
                <div class="p-0 box-header with-border">
                    <div class="icon-box"></div>
                     프로젝트 이름 1
                </div>
                <router-view></router-view>
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

<style scope="local">
    .box-header > .icon-box {
        background-color:#5CD590;
        width:50px;
        height:50px;
        float:left;
    }
    
    
</style>
