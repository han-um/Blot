# Blot


##개발 노트
###VUEX
- State(전역변수)의 SETTER
    this.$store.commit('SET_CRURRENT_SENTENCE_INDEX', this.index)
- Vue Template 에서의 State 읽기
    this.$store.state.crntIcon
- Vue Methods 에서의 State 읽기
    $stroe.state.crntIcon

###VUE
- 스타일 바인딩
    v-bind:class="클래스이름"
    v-bind:class="{클래스이름:조건식}"
    v-bind:class="[클래스이름,{클래스이름:조건식}]"
