import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Management from '@/components/Management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/management',
      name: 'Management',
      component: Management
    }
  ]
})
