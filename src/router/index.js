import Vue from 'vue'
import Router from 'vue-router'
import module from '@/components/module'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'module',
      component: module
    }
  ]
})
