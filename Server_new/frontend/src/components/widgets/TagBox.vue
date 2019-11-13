<template>
  <div>
     <div class="tag-box" v-for="tag in tagList" v-on:click="gotoTagProject(tag)">{{tag}}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TagBox',
  data () {
    return {
      tagList: []
    }
  },
  methods: {
    getTagList() {
      axios.get('/api/project/tags/')
      .then(res => {
        this.tagList = res.data
      })
    },
    gotoTagProject(tag) {
      this.$router.replace(this.$route.query.redirect || '/tagproj/' + tag)
    }
  },
  mounted () {
    this.getTagList()
  }
}
</script>

<style scoped>
    .tag-box{
        font-size:13px;
        border: 1px solid #C5C5C5;
        padding:3px;
        padding-left:10px;
        padding-right:10px;
        display:inline-block;
        margin:3px;
        cursor: pointer;
    }
    .tag-box:hover {
        background-color:#E8E8E8;
    }
</style>
