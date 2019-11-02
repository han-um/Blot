<template>
<ul class="nav navbar-nav">
    <button v-on:click="addProject">프로젝트 등록하기</button>
    <button v-on:click="purchaseToken">토큰 구매하기</button>
    <button v-on:click="sellToken" >토큰 판매</button>
    <button v-on:click="changeAddress" >사용자 지갑 주소 변경</button>
</ul>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  data () {
    return {
      isLoggedIn: false,
      isBlockChain: false
    }
  },
  methods: {
    // 프로젝트 정보를 블록체인 상에 등록하기 위해 서버에 대납 요청을 보내는 로직
    addProject() {
      var payload = {'projectId': 'projectId7', 'writerId': 'kim', 'deadline': '2019.11.03', 'reward': 30}
      this.$store.dispatch('CREATE_NEW_PROJECT', payload)
    },
    // 블록체인으로부터 토큰을 구매하기 위해 서버에 대납 요청을 보내는 로직
    purchaseToken() {
      var payload = {'userAddress': 'kim', 'klayNum': 1}
      this.$store.dispatch('PURCHASE_BLOT_TOKEN', payload)
    },
    // 구매한 토큰을 다시 Klay 코인으로 바꿔가기 위해 서버에 대납 요청을 보내는 로직
    sellToken() {
      /* @ NOTE
      blotNum은 10000 단위로 입력해야함. (10000 단위로 안주면 트랜잭션을 거부하도록 설계해뒀음)
      그래서, 토큰 환불하는 사람들한테 만단위로 입력하라고 안내문을 표시해주면 좋겠음~
      1 klay == 10000 BLOT 단위로 사고 팔도록 설정해둬서 일부만 구매할 순 없음.
      */
      var payload = {'blotNum': 10000}
      this.$store.dispatch('SELL_BLOT_TOKEN', payload)
    },
    // 사용자 지갑 주소를 변경하는 함수
    changeAddress() {
      // @ NOTE 사용자 지갑 주소를 변경하려면, 기존에 사용자가 등록한 지갑 계정으로 블록체인 로그인을 한 상태에서 지갑 변경을 시도해야함
      var payload = {'userId': 'kim', 'newUserAddress': '새로운_지갑_주소_입력'}
      this.$store.dispatch('CHANGE_USER_WALLET_ADDR', payload)
    },
  },
  mounted () {
  }
}
</script>
<style>
</style>
