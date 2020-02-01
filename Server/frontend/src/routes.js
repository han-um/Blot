import DashView from './components/Dash.vue'
import NotFoundView from './components/404.vue'

// Import Views - BLOT

// LoginView
import LoginView from './components/views/Login/LoginView.vue'
import Login from './components/views/Login/Login.vue'
import Register from './components/views/Login/Register.vue'

// ProjectAdd
import ProjectAdd from './components/views/ProjectAdd/ProjectAdd.vue'

// ProjectView
import ProjectView from './components/views/ProjectView/ProjectView.vue'
import ProjectViewOverview from './components/views/ProjectView/Overview.vue'
import ProjectViewTranslate from './components/views/ProjectView/Translate.vue'
import ProjectViewUsers from './components/views/ProjectView/Users.vue'

//  Dash
import DashboardView from './components/views/Dashboard.vue'

// BlockChainLogin
import BlockChainLogin from './components/views/BlockChain/BlockChainLogin.vue'

// MyLibrary
import MyLibrary from './components/views/MyLibrary/MyLibrary.vue'
import MyInfo from './components/views/MyLibrary/MyInfo.vue'

// ListView
import TagList from './components/views/ListView/TagList.vue'
import TagProject from './components/views/ListView/TagProject.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView,
    children: [
      {
        path: 'login',
        alias: '',
        component: Login,
        name: 'login',
        meta: {description: '로그인 페이지'}
      }, {
        path: 'register',
        alias: '',
        component: Register,
        name: 'register',
        meta: {description: '회원가입 페이지'}
      }
    ]
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'projview/:id',
        component: ProjectView,
        props: true,
        name: 'ProjectView',
        meta: {description: '프로젝트 상세보기 페이지(최상위헤더)'},
        children: [
          {
            path: '/',
            component: ProjectViewOverview,
            name: 'Overview',
            meta: {description: '프로젝트 개요'}
          }, {
            path: 'trans',
            component: ProjectViewTranslate,
            name: 'Translate',
            meta: {description: '프로젝트 진행중 번역'}
          }, {
            path: 'users',
            component: ProjectViewUsers,
            name: 'Users',
            meta: {description: '사용자 목록 및 게시판'}
          }
        ]
      }, {
        path: 'projadd',
        component: ProjectAdd,
        name: 'ProjectAdd',
        meta: {description: '프로젝트 등록'}
      }, {
        path: 'blockchainlogin',
        component: BlockChainLogin,
        name: 'BlockChainLogin',
        meta: {description: '블록체인 로그인'}
      }, {
        path: 'mylibrary',
        component: MyLibrary,
        name: 'MyLibrary',
        meta: {description: '내 서재'}
      }, {
        path: 'myinfo',
        component: MyInfo,
        name: 'MyInformation',
        meta: {description: '내 정보'}
      }, {
        path: 'taglist',
        component: TagList,
        name: 'TagList',
        meta: {description: '태그 목록'}
      }, {
        path: 'tagproj/:tag',
        component: TagProject,
        name: 'TagProject',
        props: true,
        meta: {description: '태그별 프로젝트 목록'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
