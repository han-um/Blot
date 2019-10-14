<template>
  <div>
    <textarea v-model="inputText" class="trans-input"></textarea>
    <button v-on:click="addTrans" class="trans-input-button">번역 등록하기</button>
    <div class="info">
      공정성을 위해 한번 입력한 번역은 수정하거나 삭제할 수 없습니다.<br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TranslateAdd',
  data () {
    return {
      inputText: ''
    }
  },
  methods: {
    addTrans() {
      axios.post('/api/project/trans', {p_num: this.$route.params.id, s_num: this.$store.state.crntStcIndex, trans_text: this.inputText})
      .then(res => {
        console.log(res)
      })
    }
  },
  mounted () {}
}
</script>

<style scoped>
    .trans-input {
        width:calc(100% - 30px);
        padding:5px;
        margin:20px;
        margin-bottom:0px;
        border:0px;
        background-color:#E8E8E8;
        font-weight: 100;
        border-radius: 20px 0px 0px 0px;
        height:40vh;
        vertical-align: middle;
    }
    
    .trans-input::placeholder {
        text-align: center;
    }
    .trans-input-button {
        border:0px;
        width:calc(100% - 30px);
        margin:20px;
        margin-top:0px;
        height:30px;
        background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
        color:white;
    }
    .info {
        text-align: center;
        font-size:12px;
        font-weight: 100;
    }
</style>
