import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import AllWord from '../views/AllWord.vue'
import Setting from '../views/Setting.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Analytics from '../views/Analytics.vue'
import tabs from '../views/tabs.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Tabs',
    component: tabs,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: 'allword',
      },
      {
        path: 'allword',
        name: 'AllWord',
        component: AllWord
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: Analytics
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
        props: true
      }
    ]
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  firebase.auth().onAuthStateChanged(user => {
    if(requiresAuth) {
      if(user) next();
      else next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      if (user) next({ path: '/', query: { redirect: to.fullPath } });
      else next();
    }
  })
})

export default router
