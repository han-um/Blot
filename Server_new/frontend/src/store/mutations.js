export default {
  /* -----------------------------------------------------------
    ProjAdd
  ----------------------------------------------------------- */
  SET_CURRENT_ICON (state, iconName) {
    state.crntIcon = iconName
  },
/* -----------------------------------------------------------
    MyLibrary
  ----------------------------------------------------------- */
  SET_CURRENT_LIBRARY_MENU (state, menuName) {
    state.crntLibMenu = menuName
  },
  /* -----------------------------------------------------------
    ProjView
    *Mutation 주의사항 : 한번에 하나의 파라미터밖에 못받음 (단순 setter)
  ----------------------------------------------------------- */
  SET_CRURRENT_SENTENCE_TEXT (state, text) {
    state.crntStcText = text
  },
  SET_CRURRENT_SENTENCE_INDEX (state, index) {
    state.crntStcIndex = index
  },
  SET_CURRENT_TRANS_INDEX (state, index) {
    state.crntTransIndex = index
  },
  SET_CURRENT_PROJECT_ENDED (state, input) {
    state.crntProjEnded = input
  },
  /* -----------------------------------------------------------
    ProjectSearch
  ----------------------------------------------------------- */
  TOGGLE_PROJECT_SEARCH (state) {
    state.showProjectSearch = !state.showProjectSearch
  },
  /* -----------------------------------------------------------
    BlockChainLogin
  ----------------------------------------------------------- */
  SET_KEYSTORE (state, keystore) {
    state.keystore = keystore
  },
  SHOW_BLOCKCHAIN_LOGIN (state) {
    state.showBlockChainLogin = true
  },
  HIDE_BLOCKCHAIN_LOGIN (state) {
    state.showBlockChainLogin = false
  },
  TOGGLE_BLOCKCHAIN_LOGIN (state) {
    state.showBlockChainLogin = !state.showBlockChainLogin
  },
/* -----------------------------------------------------------
    TokenPurchase
  ----------------------------------------------------------- */
  TOGGLE_TOKEN_PURCHASE (state) {
    state.showPurchase = !state.showPurchase
  },
  SHOW_TOKEN_PURCHASE (state) {
    state.showPurchase = true
  },
  HIDE_TOKEN_PURCHASE (state) {
    state.showPurchase = false
  },
  /* -----------------------------------------------------------
    BlockChain
  ----------------------------------------------------------- */
  SET_CURRENT_WALLET_ID (state, walletId) {
    state.crntWalletId = walletId
  },
  SET_CURRENT_BLOTS (state, blots) {
    state.crntBlots = blots
  },
  SET_CURRENT_RELIABILITY (state, userReliability) {
    state.crntReliability = userReliability
  },
/* -----------------------------------------------------------
    USERMENU (Header)
  ----------------------------------------------------------- */
  SET_CURRENT_USER_IMAGE (state, userImage) {
    state.crntUserImg = '/api/files/attachedFiles/' + userImage
  },
  /* -----------------------------------------------------------
    Co-Pilot Variables (삭제할것)
  ----------------------------------------------------------- */
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}
