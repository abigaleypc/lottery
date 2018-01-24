import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Management from '@/components/Management'
import Game8 from '@/components/Game8'
import Game5 from '@/components/Game5'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/game8',
      name: 'Game8',
      component: Game8
    },  {
      path: '/game5',
      name: 'Game5',
      component: Game5
    },{
      path: '/management',
      name: 'Management',
      component: Management
    }
  ]
})
