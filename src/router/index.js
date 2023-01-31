import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isUnderConstruction = to.matched.some(record => record.meta.isUnderConstruction)
  if (isUnderConstruction) next({ name: 'under-construction' })
  else next()
})

export default router
