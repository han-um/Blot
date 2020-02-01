<template>
  <div>
    <textarea v-model="inputText" class="trans-input"></textarea>
    <button v-on:click="addTrans" class="trans-input-button">번역 등록하기</button>
    <div class="info">
       > 공정성을 위해 한번 입력한 번역은 수정하거나 삭제할 수 없습니다.<br>
        > 문장 당 하나의 번역만 등록할 수 있습니다.
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
      this.$swal('등록 성공', '번역이 등록되었습니다.', 'success')
      this.inputText = ''
      var payload = { 'p_num': this.$route.params.id, 'index': this.$store.state.crntStcIndex + 1 }
      this.$store.dispatch('SKIP_CURRENT_SENTENCE', payload).then(function (resolvedData) {
        this.$root.$emit('TranslateEval')
      })
    /* Demo
        })
      axios.post('/api/project/trans', {p_num: this.$route.params.id, s_num: this.$store.state.crntStcIndex, trans_text: this.inputText, userId: this.$session.get('username')})
      .then(res => {
        this.$swal('등록 성공', '번역이 등록되었습니다.', 'success')
        this.inputText = ''
        // 현재선택문장 다음으로 넘기기
        var payload = { 'p_num': this.$route.params.id, 'index': this.$store.state.crntStcIndex + 1 }
        this.$store.dispatch('SKIP_CURRENT_SENTENCE', payload).then(function (resolvedData) {
        // TODO: 중복 확인 기능 필요
        // 평가 모드에 실시간 반영
          this.$root.$emit('TranslateEval')
        })
      })
      */
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
        height:35vh;
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
