import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
/* 여기에서 라우팅 경로 설정 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

/*
번역보기화면 설계

-app
    -(router)
        -sidebar
        -headerbar
            -search
            -userinfo
        -(router)
            -trans
                -info
                -view
                    -sentences
                        -sentence !emit call to trans
                    -trans
                        -origin
                        -(router)
                            -new
                            -eval
                                -eachtrans
                -user
        

*/