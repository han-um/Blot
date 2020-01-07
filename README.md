# Blot

## 개요
Blot은 블록체인 기반 공동 번역 시스템입니다. 전문 지식이 필요한 논문이나 문맥이 복잡한 글에 대해 번역기가 아닌 사용자가 공동으로 번역을 작성하고 평가하여 더 좋은 품질의 번역 결과물을 도출하는 것을 목표로 합니다. 또한, 번역량과 번역 품질에 따른 사용자별 신뢰도를 블록체인 네트워크에 기록하여 신뢰성을 보장, 암호화폐(토큰) 보상을 제공합니다.

## 목차
- [구동 방법](#구동-방법)
- [핵심 기능](#핵심-기능)
- [기대 효과](#기대-효과)
- [차별화 : 블록체인](#차별화-:-블록체인)
- [차별화 : UI/UX](#차별화-:-UI/UX)
- [시스템 구성도](#시스템-구성도)
- [기술 스택](#기술-스택)
- [개발 관련 문서](#개발-관련-문서)
- [Credit](#Credit)

## 구동 방법
- FrontEnd
    > cd .../Server/frontend
    > npm run dev
- BackEnd
    > cd .../Server/backend
    > node app.js

## 핵심 기능
- Key file과 암호키를 이용하여 Klaytn 계정 로그인.
- 번역 요청자가 번역 프로젝트를 생성하고 원문을 입력하면 문장 단위로 Split.
- 각 문장에 대해 모든 사용자가 각자 하나씩 번역을 작성할 수 있음.
- 각 문장에 대해 모든 사용자가 가장 선호하는 번역을 선택(평가)할 수 있음.
- 프로젝트가 마감되면 가장 많은 선택을 받은 번역이 최종 번역으로 선택됨.
- 프로젝트가 마감되면 최종 선정된 번역자들은 번역량에 따라 지분을 나눠 가짐.
- 프로젝트가 마감되면 번역량과 평가활동에 따라 신뢰 점수를 변경하고 토큰 보상.
- 신뢰 점수는 다음 번역과 평가 활동에 영향을 끼침 (가중치 적용).
- 신뢰 점수의 변동 사항은 블록체인 네트워크에 저장됨.

## 기대 효과
- 번역 요청자
    > 전문 지식이 필요한 논문이나 문맥이 복잡한 글에 대한 번역 결과물 확보
- 번역자
    > 번역량과 번역 품질에 대한 합당한 대가(토큰)가 주어지며, 블록체인을 통해 저장한 신뢰 점수의 경우 위/변조가 어려운 특성상 자신의 번역 실력의 근거로 삼을 수 있음.  
- 시스템 운영
    > 사용자들의 번역활동으로 만들어지는 원문과 번역문은 빅데이터 처리에 용이한 MongoDB(NoSQL)를 통해 저장, 차후 머신러닝 등의 분야에 활용할 수 있음. 

## 차별화 : 블록체인 
- GroundX의 Klaytn을 활용하여 Scalability, Finality 문제 개선
- 마감 등 Smart Contract 동작 시 서버에서 비용을 대납
- ERC20 표준에 따라 자체 토큰(BLOT)설계

## 차별화 : UI/UX
- 블록체인 로그인과 일반 회원 로그인을 분리하여 접근성 향상
- 하나의 페이지에서 번역 평가 및 작성이 가능하도록 개발
- 시스템이 입력받은 원문을 문장 단위로 나누어 번역 작성 유도


## 시스템 구성도

## 기술 스택

## 개발 관련 문서

## Credit



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
- 세션 제거하기g
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

- **즐겨찾기 삭제** - [POST] - /api/user/delete/bookmark
    > userId : 계정명[string]   
	> projId : 프로젝트 ObjectId[string]  
    > Return : 성공시 true 실패시 false
    
- 지갑주소 변경 [POST] - /api/user/change/wallet
    > userId : 계정명[string] 
    > wAddr : 지갑주소[string]
    > Return : 성공시 true 실패시 false
    
- 지갑주소 가져오기 [GET] - /api/user/:userId/wallet
    > userId : 계정명[string]
    > Return : 지갑주소 or FALSE
    

- 즐겨찾기 프로젝트ObjectId 조회 [GET] - /api/user/:userId/project
	> userId : 계정명[string]
    > Return : [프로젝트 ObjectId, 제목, 요약, 아이콘, 색상] 배열 존재하지 않을시 false

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
    > color : 색상[string]
	> all : 원문[string]
    > Return : 생성된 프로젝트 ObjectId 실패시 false
    
- 특정프로젝트 삭제 - [POST] - /api/project/delete
    > p_num : 프로젝트 ObjectId[string]   
    > Return : 성공시 true 실패시 false
    
- **프로젝트 수동 마감** [GET] - /api/project/manual/:p_num
    > p_num : 프로젝트 ObjectId[string]  
    > Return TRUE or FALSE  
    > **@NOTE 프로젝트 마감은 시간이 오래걸리기 때문에 front 쪽에서 마감 실행 후 실행중 표시를 띄워야 함**
    
- 프로젝트 등록시 대납서명 요청 [POST] - /api/project/sign
    > rawTransaction : 승인정보[string]

- 번역문장 등록 [POST] - /api/project/trans
	> p_num : 프로젝트 ObjectId[string]  
	> s_num : 문장 번호[number]  
	> trans_text : 번역문[string]
    > userId : 계정명[string]

- 전체프로젝트 제목,태그,시작일,마감일,아이콘,색상 조회 [GET] - /api/project/
    > Return : [제목, 태그, 시작일, 마감일, 아이콘, 색상] 배열 반환
    
- 특정프로젝트 제목,태그,시작일,마감일,아이콘,색상 조회 [GET] - /api/project/projInfo/:p_num
	> p_num : 프로젝트 ObjectId[string]
    > Return : [제목, 태그, 시작일, 마감일 ,아이콘, 색상] 반환

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
    
- 프로젝트 마감 유효성 조회 [GET] - /api/project/:p_num/deadline
    > p_num : 프로젝트 ObjectId[string]
    > Return : 마감 상태 아닐시 false, 마감 상태시 true
    
- 검색어 조회 [GET] - /api/project/keyword/:key
    > key : 검색어 내용
    > Return : [프로젝트 ObjectId, 제목, 요약, 아이콘, 색상] 배열 존재하지 않을시 false
    
- 특정유저가 등록한 프로젝트 ObjectId [GET] - /api/project/user/:userId
    > userId : 계정명[string]
    > Return : [프로젝트 ObjectId, 제목, 요약, 아이콘, 색상] 배열 존재하지 않을시 false

- 모든 태그리스트 조회 [GET] - /api/project/tags
    > Return : [태그] 배열 존재하지 않을 시 false
    
- 태그가 존재하는 프로젝트 조회 [GET] - /api/project/tags/:tag
    > tag : 태그 키[string]
    > Return : [프로젝트 ObjectId] 배열 존재하지 않을 시 false

- 프로젝트 번역 마감시 번역정보 조회 [GET] - /api/project/:p_num/deadline/trans
    > p_num : 프로젝트 ObjectId[string]
    > Return : [ {transId : 번역자, percentage : 참여율%, blot : 보상금(blot)} ] 객체배열 존재하지 않을시 false
    
- 프로젝트 번역 마감시 평가정보 조회 [GET] - /api/project/:p_num/deadline/eval
    > p_num : 프로젝트 ObjectId[string]
    > Return : [ {evalId : 평가자, percentage : 참여율%, blot : 보상금(blot)} ] 객체배열 존재하지 않을시 false
    
- 프로젝트 진행도 정보 조회 [GET] - /api/project/:p_num/summary
    > p_num : 프로젝트 ObjectId[string]
    > Return : { transPer : 진행률%, transCnt : 번역참여자수, kb : 원문크기Kbytes, like : 좋아요 수 } 객체 반환 
    
- 프로젝트 참여자 신뢰도 이력 로그 [GET] - /api/project/:p_num/trust
    > p_num : 프로젝트 ObjectId[string]
    > Return : [ {userId : 참여자, score : 추가신뢰도점수, type : 유형, ascore : 반영후 신뢰도 점수} ] 객체배열 존재하지 않을시 false
    > type 정의 : [0 : 번역활동, 1 : 평가활동]
    
- 사용자 신뢰도 이력 로그 [GET] - /api/project/user/:userId/trust
    > userId : 계정명[string] 
    > Return : [ {projId : 프로젝트 아이디, score : 추가신뢰도점수, type : 유형, ascore : 반영후 신뢰도 점수} ] 객체배열 존재하지 않을시 false
    > type 정의 : [0 : 번역활동, 1 : 평가활동, 2 : 정기적 감소]


- **<U>특정프로젝트 전체 최종 번역 문장 조회 [GET] - /api/project/:p_num/sentence/finalTrans</U>**
	> p_num : 프로젝트 ObjectId[string]
    > Return : 프로젝트 최종 번역 문장[string Array]

- **<U>프로젝트의 번역 문장 별 평가점수 조회 (내림차순으로 전달됨) [GET] - /api/project/:p_num/sentence/:s_num/score</U>**
    > p_num : 프로젝트 ObjectId[string]  
    > s_num: 문장 번호[number]  
    > Return - [ {transId : 번역자, transText : 번역내용, score : 받은 평가점수} ] 객체배열 존재하지 않을시 false

- **<U>인기있는(즐겨찾기 수가 많은) 프로젝트 정보 조회(제목, 태그, 시작일, 마감일, 아이콘, 색상, 사용자들이 즐겨찾기한 횟수) 조회 (내림차순으로 전달됨) [GET] - /api/project/info/popular</U>**
    > Return : [제목, 태그, 시작일, 마감일 ,아이콘, 색상, 사용자들이 즐겨찾기한 횟수] 반환 (아래 참조)
    > 프로젝트 개수는 최대 10개가 반환되며, 그 이하 개수는 그 갯수만큼만 반환됨.
    ``` javascript
    [ 
        { 
            tags: [ '운영체제', '자료구조' ],
            valid: 1,
            _id: '5dcab1afdffce7401822e637',
            start: '2019-11-12T13:20:47.801Z',
            title: 'EndTest',
            description: 'EndTest',
            end: '2019-11-27T15:00:00.000Z',
            icon: 'ri-calculator-line',
            image: '1573564848615.jpg',
            cnt: 1 
        }
    ]
    ```
    
### TODO
- 프로젝트 검색어 조회 ( GET /api/project/keyword/:key ) 에서 description이 일부 프로젝트만 출력되는 문제 해결

### SOLVED
- 프로젝트 등록 ( POST /api/project ) 등록 성공시 등록한 프로젝트ID 반환하도록 변경
- 자신이 만든 프로젝트 확인 API (param : 유저ID / return : 프로젝트 정보 오브젝트 리스트)
- 프로젝트 정보 가져오기 ( GET /api/project ) 시 ICON 정보도 같이 반환하도록 변경
- 즐겨찾기 API에 이미 중복값이 있을경우 예외처리 기능
- 프로젝트ID와 유저ID를 주면 현재 즐겨찾기에 등록되어있는지 확인하는 API
- 프로젝트 이름으로 검색 API (param: 검색어 / return : 제목에 검색어가 포함된 프로젝트 object list)

<br><br>

## multer 사용법
### 참고 자료
- [multer 기본 사용법](https://wayhome25.github.io/nodejs/2017/02/21/nodejs-15-file-upload/)
- [mongoDB와 multer를 사용한 파일 저장방법](https://m.blog.naver.com/PostView.nhn?blogId=silver889&logNo=220083873954&proxyReferer=https%3A%2F%2Fwww.google.com%2F)

### 새로 추가된 사항
- 파일 첨부를 테스트할 페이지 경로 ```/views/fileUploadTest.jade```

- app.js 파일에 파일 전송을 처리할 라우터 추가
```localhost:3000/api/files```

- 실제 라우팅을 담당하는 로직은 ```/routes/attachedFilesRouter.js```에 있음

- app.js에 외부(클라이언트)에서 서버에 저장된 이미지를 보기 위한 static 경로 추가
```/api/files/attachedFiles```

- MongoDB에 ```Files```라는 스키마(Collection) 추가
    - 아래 필드를 속성으로 가짐(***원하는대로 바꾸길..***)
        - userId
        - 업로드 당시 원래 파일명
        - 서버에 저장되면서 바뀐 파일명

### 사용 절차
1. multer 모듈 설치

``` nodejs
npm install --save multer
```

2. 파일 첨부 테스트할 페이지
- 접속 URL : [localhost:3000/api/files/upload](localhost:3000/api/files/upload)
- 테스트 페이지 경로 : /views/fileUploadTest.jade

3. localhost:3000/api/files/upload 페이지에서 파일을 첨부하고 전송하면 uploads/ 디렉토리에 userId를 파일명으로 변경되어 저장됨. 데이터베이스의 Files 스키마에도 저장될 것임.

4. 서버에 저장된 이미지 파일을 외부(클라이언트)에서 보고 싶다면 이미지 URL(```localhost:3000/api/files/attachedFiles/파일명```)을 치면 됨.

5. 서버에 저장된 파일을 다운로드 하는 기능도  ```/routes/attachedFilesRouter.js```에 구현해놓았으니 필요하다면 쓸 것.
