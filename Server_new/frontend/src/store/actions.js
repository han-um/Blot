import axios from 'axios'
import Caver from 'caver-js'
import contractInfo from '../contractInfo'
const cav = new Caver('https://api.baobab.klaytn.net:8651/')
//const blotMainContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTMAIN_ABI, contractInfo.DEPLOYED_BLOTMAIN_ADDRESS)
const blotUserContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTUSER_ABI, contractInfo.DEPLOYED_BLOTUSER_ADDRESS)
const blotProjectContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTPROJECT_ABI, contractInfo.DEPLOYED_BLOTPROJECT_ADDRESS);
const blotTokenContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTTOKEN_ABI, contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS)

export default {
  getUserWalletAddressByUserId (state, userId) {
    try {
      return blotUserContract.methods.getUserAddressByUserId(userId).call()
    } catch (e) {
      console.log(e)
    }
  },
  getUserBalanceByUserId (state, userId) {
    try {
      return blotUserContract.methods.getUserBalanceByUserId(userId).call()
    } catch (e) {
      console.log(e)
    }
  },
  getUserBalanceByUserAddress (state, userAddress) {
    try {
      return blotTokenContract.methods.getUserBalanceByUserAddress(userAddress).call()
    } catch (e) {
      console.log(e)
    }
  },
  getUserReliabilityByUserId (state, userId) {
    try {
      return blotUserContract.methods.getUserReliabilityByUserId(userId).call()
    } catch (e) {
      console.log(e)
    }
  },
  // userId로 사용자 지갑 주소 조회
  REFRESH_CURRENT_WALLET_ID (state, userId) {
    state.dispatch('getUserWalletAddressByUserId', userId).then(function (resolvedData) {
      state.commit('SET_CURRENT_WALLET_ID', resolvedData)
    })
  },
  // userId로 사용자 잔고 조회
  REFRESH_CURRENT_BLOTS_BY_ID (state, userId) {
    state.dispatch('getUserBalanceByUserId', userId).then(function (resolvedData) {
      state.commit('SET_CURRENT_BLOTS', resolvedData)
    })
  },
  // userAddress로 사용자 잔고 조회
  REFRESH_CURRENT_BLOTS_BY_ADDR (state, userAddress) {
    state.dispatch('getUserBalanceByUserAddress', userAddress).then(function (resolvedData) {
      state.commit('SET_CURRENT_BLOTS', resolvedData)
    })
  },
  // userId로 사용자 신뢰 점수 조회
  REFRESH_USER_RELIABILITY (state, userId) {
    state.dispatch('getUserReliabilityByUserId', userId).then(function (resolvedData) {
      state.commit('SET_CURRENT_RELIABILITY', resolvedData)
    })
  },
  // 블록체인 상에 새로운 프로젝트 정보 등록 요청(서버 대납을 거쳐 블록체인 저장됨)
  CREATE_NEW_PROJECT (state, payload) {
    // 세션 스토리지에 wallet instance 정보가 있는지 확인
    const walletFromSession = JSON.parse(sessionStorage.getItem('walletInstance'))
    if (walletFromSession) {
      try {
        // transacetion sernder first signature
        cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: walletFromSession.address,
          to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
          data: blotProjectContract.methods.registerNewProject(payload.projectId, payload.writerId, payload.deadline, payload.reward).encodeABI(),
          gas: '500000'
        }, walletFromSession.privateKey)
        .then(function (transactionInfo) {
          console.log(transactionInfo)
          axios.post('/api/project/sign', {rawTransaction: transactionInfo.rawTransaction})
          .then(res => {
            console.log('transaction 결과 정보 : ' + res.data)
          })
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Please activate with your klaytn wallet address to use blockchain service.')
    }
  },
  // 토큰 구매 : Klay 코인만큼 BLOT 토큰 구매하기
  PURCHASE_BLOT_TOKEN (state, payload) {
    // 세션 스토리지에 wallet instance 정보가 있는지 확인
    const walletFromSession = JSON.parse(sessionStorage.getItem('walletInstance'))
    if (walletFromSession) {
      try {
        // transacetion sernder first signature
        cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: walletFromSession.address,
          to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
          data: blotTokenContract.methods.purchaseToken(payload.userAddress, payload.klayNum).encodeABI(),
          value: cav.utils.toPeb(payload.klayNum, 'KLAY'),
          gas: '500000'
        }, walletFromSession.privateKey)
        .then(function (transactionInfo) {
          console.log(transactionInfo)
          axios.post('/api/project/sign', {rawTransaction: transactionInfo.rawTransaction})
          .then(res => {
            console.log('transaction 결과 transaction 결과 정보 : ' + res.data)
            // BLOT을 충전한 지갑 주소가 블록체인 계정으로 로그인한 지갑주소와 같다면 BLOT 잔고 표시 업데이트
            if (state.state.crntWalletId === payload.userAddress) {
              state.dispatch('REFRESH_CURRENT_BLOTS_BY_ADDR', payload.userAddress)
            }
          })
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Please activate with your klaytn wallet address to use blockchain service.')
    }
  },
  // 토큰 환불 : BLOT 토큰만큼 Klay 코인으로 바꿔가기
  SELL_BLOT_TOKEN (state, payload) {
    // 세션 스토리지에 wallet instance 정보가 있는지 확인
    const walletFromSession = JSON.parse(sessionStorage.getItem('walletInstance'))
    if (walletFromSession) {
      try {
        // transacetion sernder first signature
        cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: walletFromSession.address,
          to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
          data: blotTokenContract.methods.sellToken(payload.blotNum).encodeABI(),
          gas: '500000'
        }, walletFromSession.privateKey)
        .then(function (transactionInfo) {
          console.log(transactionInfo)
          axios.post('/api/project/sign', {rawTransaction: transactionInfo.rawTransaction})
          .then(res => {
            console.log('transaction 결과 정보 : ' + res.data)
            // BLOT을 환불한 지갑 주소가 블록체인 계정으로 로그인한 지갑주소와 같다면 BLOT 잔고 표시 업데이트
            state.dispatch('REFRESH_CURRENT_WALLET_ID', payload.userId)
          })
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Please activate with your klaytn wallet address to use blockchain service.')
    }
  },
  // 사용자 지갑 주소 변경하기
  CHANGE_USER_WALLET_ADDR (state, payload) {
    // 세션 스토리지에 wallet instance 정보가 있는지 확인
    const walletFromSession = JSON.parse(sessionStorage.getItem('walletInstance'))
    if (walletFromSession) {
      try {
        // transacetion sernder first signature
        cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: walletFromSession.address,
          to: contractInfo.DEPLOYED_BLOTMAIN_ADDRESS,
          data: blotTokenContract.methods.replaceOldToNewUserAddress(payload.userId, payload.newUserAddress).encodeABI(),
          gas: '500000'
        }, walletFromSession.privateKey)
        .then(function (transactionInfo) {
          console.log(transactionInfo)
          axios.post('/api/project/sign', {rawTransaction: transactionInfo.rawTransaction})
          .then(res => {
            console.log('transaction 결과 정보 : ' + res.data)
            // 사용자 지갑 주소 업데이트
            if (state.state.crntWalletId === payload.userAddress) {
              state.dispatch('REFRESH_CURRENT_BLOTS_BY_ADDR', payload.userAddress)
            }
          })
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Please activate with your klaytn wallet address to use blockchain service.')
    }
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
