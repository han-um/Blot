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
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

// BlockChainLogin
import BlockChainLogin from './components/views/BlockChain/BlockChainLogin.vue'

// MyLibrary
import MyLibrary from './components/views/MyLibrary/MyLibrary.vue'

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
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
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
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
