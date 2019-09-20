<template>
  <div class="register-div">
      <h1>회원가입</h1>
      <div class="title-box"><div class="r-title-box">회원약관</div><div class="agree-box">회원약관에 동의합니다.</div></div>
      <pre class="register-inner">제 1 조 (목적)
1. 본 약관은 기업마당 사이트가 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 기업마당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
제 2 조 (약관의 효력과 변경)
1. 기업마당 사이트는 귀하가 본 약관 내용에 동의하는 경우 기업마당 사이트의 서비스 제공 행위 및 귀하의 서비스 사용 행위에 본 약관이 우선적으로 적용됩니다.
2. 기업마당 사이트는 본 약관을 사전 고지 없이 변경할 수 있고 변경된 약관은 기업마당 사이트 내에 공지하거나 e-mail을 통해 회원에게 공지하며, 공지와 동시에 그 효력이 발생됩니다.</pre>
  </div>
</template>

<script>

export default {
  name: 'Register',
  components: {
  },
  data: function () {
    return {}
  },
  computed: {
  }
}
</script>

<style scoped>
    .register-div {
        color:white;
    }
    
    .register-div h1 {
        font-weight: 900;
    }
    
    .register-inner {
        height:150px;
        font-family: 'Noto Sans KR', sans-serif;
        line-height: 20px;
        font-weight: 100;
        font-size:12px;
        background:none;
        color:white;
        border-radius: 0;
        border:0.5px solid rgba(255,255,255,0.9);
    }
    .agree-box {
        float:right;
    }
    .r-title-box {
        font-size:20px;
        float:left;
    }
    .title-box{
        height:35px;
    }
    
</style>
