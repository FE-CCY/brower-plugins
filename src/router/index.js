import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AdList from '@/components/AdList'
import My from '@/components/My'
import Index from '@/components/Index'
import api from '@/api'
Vue.use(Router)

//登录状态验证
function requireAuth (to, from, next) {
  if (!api.user.auth()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/my',
      beforeEnter: requireAuth,
      children:[
        {
          path: 'my',
          component: My
        },
        {
          path: 'adlist',
          component: AdList
        },
      ]
    },
    {
      path: '/login',
      component: Login
    },
    { path: '*', redirect: '/my' }
  ]
})
