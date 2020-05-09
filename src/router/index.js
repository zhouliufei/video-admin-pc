import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'
import user from '@/page/user'
import main from '@/page/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children:[
        {
          path: '/',
          name: 'main',
          component: main
        },
        {
          path: '/user',
          name: 'user',
          component: user,
        }
      ]
    }
  ]
})
