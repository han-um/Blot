<template>
  <div>
    <div v-for="(icon,index) in iconArray" class="icon-box">
        <i v-bind:class="[icon, {now: $store.state.crntIcon === icon}]" v-on:click="setIcon(icon)"></i>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'IconSelector',
  data () {
    return {
      iconArray: [
        'ri-questionnaire-line', 'ri-building-2-line', 'ri-cloud-line', 'ri-bar-chart-grouped-line', 'ri-global-line',
        'ri-stack-line', 'ri-chat-3-line', 'ri-brush-4-line', 'ri-palette-line', 'ri-git-repository-private-line',
        'ri-calculator-line', 'ri-slideshow-2-line', 'ri-code-s-slash-line', 'ri-phone-line', 'ri-shopping-cart-line'
      ]
    }
  },
  methods: {
    setIcon (iconName) {
      this.$store.commit('SET_CURRENT_ICON', iconName)
      console.log(iconName)
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .icon-box{
    float:left;
    width:20%;
    text-align: center;
    vertical-align: middle;
    height:40px;
    font-size:15px;
  }
  .icon-box i {
    padding:10px;
  }
  .now {
    border: 1px solid #5CD590;
  }
</style>
