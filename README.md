# Blot


## 개발 노트
### 공용 정보
- 테스트 프로젝트ID
    > 5d84a8e73c9f67a60a0d42f1
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

### VUE-SESSION
- 세션 불러오기
    > import VueSession from 'vue-session' Vue.use(VueSession)
- 세션 추가하기
    > this.$session.set(key,value)
- 세션 가져오기
    > this.$session.get(key)
- 세션 체크하기
    > this.$session.has(key)
- 세션 제거하기
    > this.$session.clear()

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
- 라우트 리디렉션(메소드 내에서)
    > this.$router.replace(this.$route.query.redirect || '/')
    
### AXIOS
- import
    > import axios from 'axios'
    ` axios.post('/api/user/', {userId: this.inpUserId, password: this.inpPassword, email: this.inpEmail, wAddr: this.inpWAddr})
      .then(res => {
        console.log(res)
      })
### Promise
- 비동기 처리 방법
    > 동작함수.then(function (resolvedData) {

### CSS
- 배경 꽉차게
    > background: url(/static/img/blurwp.PNG) no-repeat center center/cover; 

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
    > Return : 프로젝트 ObjectId List

- 즐겨찾기 등록여부 확인 [GET] - /api/user/:userId/project/:projId
    > userId : 계정명[string]
    > projId : 프로젝트 ObjectId[string]
    > Return : TRUE or FALSE

- 로그인 [GET] - /api/user/:userId/password/:password
	> userId : 계정명[string]  
	> password : 비밀번호[string]
    > Return : TRUE or FALSE

- 프로젝트 등록 [POST] - /api/project/
	> title : 제목[string]  
	> description : 설명[string]  
	> language : 언어[string]  
	> tags : 태그목록[array]  
	> end : 마감날짜[date]  
	> reward : 보상금[number]  
	> icon : 아이콘명[string]  
	> all : 원문[string]
    
- 프로젝트 등록시 대납서명 요청 [POST] - /api/project/sign
    > rawTransaction : 승인정보[string]

- 번역문장 등록 [POST] - /api/project/trans
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> trans_text : 번역문[string]
    > userId : 계정명[string]

- 전체프로젝트 제목,시작일,마감일 조회 [GET] - /api/project/
    > Return : 전체 프로젝트 정보
    
- 특정프로젝트 제목,시작일,마감일 조회 [GET] - /api/project/:p_num
	> p_num : 프로젝트 ObjectId[string]
    > Return : 특정 프로젝트 정보
    
- 특정프로젝트 전체원본문장 조회 [GET] - /api/project/:p_num/sentence
	> p_num : 프로젝트 ObjectId[string]
    > Return : 프로젝트 원본 문장
    
- 특정프로젝트 특정문장 전체번역문장 조회 [GET] - /api/project/:p_num/sentence/:s_num/trans
	> p_num : 프로젝트 ObjectId[string]  
	> s_num: 문장 번호[number]  
	> Return - 번역문 인덱스와 번역문장 [ 인덱스는 랜덤 순서 ]

- 특정프로젝트 특정문장 번역문장 등록여부 확인 [GET] - /api/project/:p_num/sentence/:s_num/user/:userId
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> userId : 계정명[string]  
	> Return - 번역문 인덱스 OR -1

- 특정프로젝트 특정문장 특정번역문장 평가 [GET] - /api/project/:p_num/sentence/:s_num/trans/:t_num/user/:userId
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> t_num : 번역문장 번호[number]  
	> userId : 계정명[string]
    > 설명 : 번역문장의 평가가 존재하면 평가내용변경 존재하지 않으면 평가내용추가
    
- 검색어 조회 [GET] - /api/project/keyword/:key
    > key : 검색어 내용
    > Return : 프로젝트 ObjectId 배열 존재하지 않을시 false
    
### TODO
- 프로젝트 등록 ( POST /api/project ) 등록 성공시 등록한 프로젝트ID 반환하도록 변경
- 자신이 만든 프로젝트 확인 API (param : 유저ID / return : 프로젝트 정보 오브젝트 리스트)
- 프로젝트 정보 가져오기 ( GET /api/project ) 시 ICON 정보도 같이 반환하도록 변경

### SOLVED
- 즐겨찾기 API에 이미 중복값이 있을경우 예외처리 기능
- 프로젝트ID와 유저ID를 주면 현재 즐겨찾기에 등록되어있는지 확인하는 API
- 프로젝트 이름으로 검색 API (param: 검색어 / return : 제목에 검색어가 포함된 프로젝트 object list)
