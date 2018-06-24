import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Panel from '@/views/Panel'
import N404 from '@/views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/panel',
      name: 'Panel',
      component: Panel,
      props: true
    },
    {
      path: '*',
      component: N404
    }],
  mode: 'history'
})
