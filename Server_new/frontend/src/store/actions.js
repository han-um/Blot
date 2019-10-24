import axios from 'axios'
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
  },
  REFRESH_CURRENT_SENTENCE (state, payload) {
    console.log('Print:' + payload.index + payload.text)
    // 받은 문장의 INDEX 반영
    state.commit('SET_CRURRENT_SENTENCE_INDEX', payload.index)
    // 받은 문장의 내용 반영
    state.commit('SET_CRURRENT_SENTENCE_TEXT', payload.text)
  },
  SKIP_CURRENT_SENTENCE (state, payload) {
    console.log('Print:' + payload.p_num + payload.index)
    axios.get('/api/project/' + payload.p_num + '/sentence')
      .then(res => {
        // 전체 문장길이를 넘지 않도록 예외처리
        if (payload.index < res.data.sentence.length) {
          state.commit('SET_CRURRENT_SENTENCE_INDEX', payload.index)
          state.commit('SET_CRURRENT_SENTENCE_TEXT', res.data.sentence[payload.index].raw_text)
        }
      })
  },
  ADD_FAVORITE_PROJECT (state, payload) {
    axios.get('/api/user/bookmark', {userId: payload.userId, projId: payload.projId})
    .then(res => {
    })
  }
}
