import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from '../pages/homePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "/",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
  ]
})
