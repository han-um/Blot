import Caver from 'caver-js'
import contractInfo from '../contractInfo'
const cav = new Caver('https://api.baobab.klaytn.net:8651/')
const blotMainContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTMAIN_ABI, contractInfo.DEPLOYED_BLOTMAIN_ADDRESS)
// const blotUserContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTUSER_ABI, contractInfo.DEPLOYED_BLOTUSER_ADDRESS);
// const blotProjectContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTPROJECT_ABI, contractInfo.DEPLOYED_BLOTPROJECT_ADDRESS);
// const blotTokenContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTTOKEN_ABI, contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS);

export default {
  getUserWalletAddressByUserId (state, userId) {
    console.log(userId)
    try {
      return blotMainContract.methods.getUserAddressByUserId(userId).call()
    } catch (e) {
      alert('error!!!' + e)
    }
  },
  getUserBalanceByUserId (state, userId) {
    try {
      return blotMainContract.methods.getUserBalanceByUserId(userId).call()
    } catch (e) {
      alert(e)
    }
  },
  REFRESH_CURRENT_WALLET_ID (state, userId) {
    console.log(userId)
    state.dispatch('getUserWalletAddressByUserId', userId).then(function (resolvedData) {
      state.commit('SET_CURRENT_WALLET_ID', resolvedData)
    })
  },
  REFRESH_CURRENT_BLOTS (state, userId) {
    state.dispatch('getUserBalanceByUserId', userId).then(function (resolvedData) {
      state.commit('SET_CURRENT_BLOTS', resolvedData)
    })
  }
}
