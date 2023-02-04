import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { auth } from '@/firebaseConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isUnderConstruction: true
      }
    },
    {
      path: '/under-construction',
      name: 'under-construction',
      component: () => import('../views/UnderConstruction.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: () => import('../views/auth/SignupView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isUnderConstruction = to.matched.some(record => record.meta.isUnderConstruction)
  // const isAuthenticated = auth.currentUser
  if (isUnderConstruction) next({ name: 'under-construction' })
  else next()
})

export default router
