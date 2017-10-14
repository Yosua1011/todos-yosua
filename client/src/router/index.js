import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    }
  ]
})
