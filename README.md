# Blot


## 개발 노트
### VUEX
- State(전역변수)의 SETTER
    > this.$store.commit('SET_CRURRENT_SENTENCE_INDEX', this.index)
- Vue Template 에서의 State 읽기
    > this.$store.state.crntIcon
- Vue Methods 에서의 State 읽기
    > $stroe.state.crntIcon

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
    ` callGitHub () {
      axios.get('/api/project/' + this.$route.params.id)
        .then(response => {
          console.log('Response:', response.data.title)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.title = response.data.title
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response.statusText
        })
        
### API
- 회원가입 [POST] - /api/user/ 
    > userId : 계정명[string]   
    > password : 비밀번호[string]  
    > email : 이메일[string]  
    > wAddr : 지갑주소[string]

- 즐겨찾기 등록 [POST] - /api/user/bookmark
	> userId : 계정명[string]   
	> projId : 프로젝트 ObjectId[string]

- 즐겨찾기 프로젝트ObjectId 조회 [GET] - /api/user/:userId/project
	> userId : 계정명[string]

- 로그인 [GET] - /api/user/:userId/password/:password
	> userId : 계정명[string]  
	> password : 비밀번호[string]

- 프로젝트 등록 [POST] - /api/project/
	> title : 제목[string]  
	> description : 설명[string]  
	> language : 언어[string]  
	> tags : 태그목록[array]  
	> end : 마감날짜[date]  
	> reward : 보상금[number]  
	> icon : 아이콘명[string]  
	> all : 원문[string]

- 번역문장 등록 [POST] - /api/project/trans
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> trans_text : 번역문[string]

- 전체프로젝트 제목,시작일,마감일 조회 [GET] - /api/project/
- 특정프로젝트 제목,시작일,마감일 조회 [GET] - /api/project/:p_num
	> p_num : 프로젝트 ObjectId[string]

- 특정프로젝트 전체원본문장 조회 [GET] - /api/project/:p_num/sentence
	> p_num : 프로젝트 ObjectId[string]

- 특정프로젝트 특정문장 전체번역문장 조회 [GET] - /api/project/:p_num/sentence/:s_num/trans
	> p_num : 프로젝트 ObjectId[string]  
	> s_num: 문장 번호[number]  
	return - [번역문 인덱스 / 번역문장] 셔플

- 특정프로젝트 특정문장 번역문장 등록여부 확인 [GET] - /api/project/:p_num/sentence/:s_num/user/:userId
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> userId : 계정명[string]  
	return - [번역문 인덱스 or -1]

- 특정프로젝트 특정문장 특정번역문장 평가 [GET] - /api/project/:p_num/sentence/:s_num/trans/:t_num/user/:userId
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> t_num : 번역문장 번호[number]  
	> userId : 계정명[string]  
    