export default {
  /* -----------------------------------------------------------
    ProjAdd
  ----------------------------------------------------------- */
  SET_CURRENT_ICON (state, iconName) {
    state.crntIcon = iconName
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
