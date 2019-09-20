import DashView from './components/Dash.vue'
import NotFoundView from './components/404.vue'

// Import Views - BLOT

// LoginView
import LoginView from './components/views/LoginView/LoginView.vue'
import Login from './components/views/LoginView/Login.vue'
import Register from './components/views/LoginView/Register.vue'

// ProjectView
import ProjectView from './components/views/ProjectView/ProjectView.vue'
import ProjectViewOverview from './components/views/ProjectView/Overview.vue'
import ProjectViewTranslate from './components/views/ProjectView/Translate.vue'
import ProjectViewUsers from './components/views/ProjectView/Users.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

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
        path: 'projview',
        component: ProjectView,
        name: 'ProjectView',
        meta: {description: '프로젝트 상세보기 페이지(최상위헤더)'},
        children: [
          {
            path: 'overview',
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
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
