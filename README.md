# Blot


## 개발 노트
### VUEX
- State(전역변수)의 SETTER
    > this.$store.commit('SET_CRURRENT_SENTENCE_INDEX', this.index)
- Vue Template 에서의 State 읽기
    > this.$store.state.crntIcon
- Vue Methods 에서의 State 읽기
    > $stroe.state.crntIcon
- 어쩔수없이 $emit을 써야 할 경우
    * 호출하는 메소드에서
    > this.$root.$emit('TranslateEval')
    * 호출받는 메소드에서
    > mounted () {
    this.$root.$on('TranslateEval', () => {
      this.getTrans()
    })
  }


### VUE
- 스타일 바인딩
    > v-bind:class="클래스이름"
    > v-bind:class="{클래스이름:조건식}"
    > v-bind:class="[클래스이름,{클래스이름:조건식}]"

- 트랜지션
    > <transition enter-active-class="animated fadeIn">

### VUE-ROUTER
- 라우트 링크(하이퍼링크)
    > <router-link to="trans">번역 보기</router-link>
    
### AXIOS
- import
    > import axios from 'axios'
    ` axios.post('/api/user/', {userId: this.inpUserId, password: this.inpPassword, email: this.inpEmail, wAddr: this.inpWAddr})
      .then(res => {
        console.log(res)
      })
        
### API
- API이름
    > 이렇게 사용하면 됨
    