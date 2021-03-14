import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import AllWord from '../views/AllWord.vue'
import Setting from '../views/Setting.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/allword',
    name: 'AllWord',
    component: AllWord
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
