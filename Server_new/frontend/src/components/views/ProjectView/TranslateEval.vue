<template>
    <div>
         <div class="trans-list now"><span class="small-alert">내가 지지하는 번역</span>
          <img src="/static/img/user2-160x160.jpg" alt="User Image" class="user-image circle"><b>익명</b><br> 
          <div class="contents">
            CSS의 배경 속성은 쉼표로 구분 된 값을 허용 할 수 있습니다. "여러"배경. 스택 순서가 있기 때문에 배경을 레이어 배경으로 생각할 수도 있습니다.
          </div></div>
        <div class="trans-list"><span class="small-alert">번역 1</span>
          <img src="/static/img/user2-160x160.jpg" alt="User Image" class="user-image circle"><b>익명</b><br> 
          <div class="contents">
            CSS의 배경 속성은 쉼표로 구분 된 값을 허용 할 수 있습니다. "여러"배경. 스택 순서가 있기 때문에 배경을 레이어 배경으로 생각할 수도 있습니다.
          </div></div>
        <!--각각의 객체를 컴포넌트로 만들기-->
        <div class="trans-list"><span class="small-alert">번역 2</span>
          <img src="/static/img/user2-160x160.jpg" alt="User Image" class="user-image circle"><b>익명</b><br> 
          <div class="contents">
            CSS의 배경 속성은 쉼표로 구분 된 값을 허용 할 수 있습니다. "여러"배경. 스택 순서가 있기 때문에 배경을 레이어 배경으로 생각할 수도 있습니다.
          </div></div>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'TranslateEval',
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
    .trans-list {
        padding:20px;
    }
    .trans-list > .contents {
        padding-top:10px;
    }
    
    .now {
        background-color:#5CD590;
        color:white;
    }
    
    .now > .small-alert {
        background-color:white;
        color:#5CD590;
    }
    
</style>
