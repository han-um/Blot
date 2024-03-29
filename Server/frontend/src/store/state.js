export default {
  /* -----------------------------------------------------------
    Blockchain token name
  ----------------------------------------------------------- */
  tokenName: 'blot',
  /* -----------------------------------------------------------
    ProjectAdd
  ----------------------------------------------------------- */
  crntIcon: 'ri-questionnaire-line',
  /* -----------------------------------------------------------
    ProjView
  ----------------------------------------------------------- */
  crntStcIndex: 0,
  crntStcText: '_',
  crntTransIndex: 0,
  crntProjEnded: false,
 /* -----------------------------------------------------------
    MyLibrary
  ----------------------------------------------------------- */
  crntLibMenu: '',
  isLoggedIn: false,
  /* -----------------------------------------------------------
    BlockChain Metadata / Login
  ----------------------------------------------------------- */
  accessType: 'keystore',
  keystore: '',
  password: '',
  showBlockChainLogin: false,
  showPurchase: false,
  rpcURL: 'https://api.baobab.klaytn.net:8651/',
  /* -----------------------------------------------------------
    Search
  ----------------------------------------------------------- */
  showProjectSearch: false,
  /* -----------------------------------------------------------
    BlockChain information
  ----------------------------------------------------------- */
  crntWalletId: '-',
  crntBlots: '',
  crntKlays: '',  // 사용자 Klay 잔고
  crntReliability: '',  // 사용자 신뢰 점수
   /* -----------------------------------------------------------
    UserHeader
  ----------------------------------------------------------- */
  crntUserImg: '-',
  /* -----------------------------------------------------------
    Co-Pilot Variables (삭제할것)
  ----------------------------------------------------------- */
  callingAPI: false,
  searching: '',
  serverURI: 'http://10.110.1.136:8080',
  user: null,
  token: null,
  userInfo: {
    messages: [
      {
        id: 1,
        title: 'Support Team',
        body: 'Why not consider this a test message?',
        createdAt: '17 min ago'
      }
    ],
    notifications: [
      {
        id: 1,
        title: 'Birthday Reminder',
        body: 'Today is Brians birthday.',
        createdAt: 'just now',
        readAt: null
      },
      {
        id: 2,
        title: 'Bank Holiday in London',
        body: 'Our office in London has a bank holiday today. Do not expect them to answer the phone.',
        createdAt: '4 hours ago',
        readAt: null
      },
      {
        id: 3,
        title: 'Birthday Reminder',
        body: 'Today is Christians birthday.',
        createdAt: '27 days ago',
        readAt: '2018-08-12 00:00:00'
      },
      {
        id: 4,
        title: 'Birthday Reminder',
        body: 'Today is Tanjas birthday.',
        createdAt: '29 days ago',
        readAt: '2018-08-12 00:00:00'
      },
      {
        id: 5,
        title: 'Sales Bonus received',
        body: 'You received your monthly sales bonus of 3%. This month you made $2,700 extra!',
        createdAt: '7 hours ago',
        readAt: null
      }
    ],
    tasks: []
  }
}
