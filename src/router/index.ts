import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  linkActiveClass: 'border border-red-300',
  linkExactActiveClass: 'border border-red-600',
  history: createWebHistory(),
  routes: [
    {
      path: '/splash',
      name: 'Splash',
      component: () => import('../views/SplashView.vue'),
      meta: { layout: 'EmptyLayout' },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'EmptyLayout' },
    },
    {
      path: '/dashboard',
      component: DashboardView,
      meta: {
        layout: 'DefaultLayout', // nebo nechat prázdné pro výchozí layout
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFoundView.vue'),
      meta: { layout: 'EmptyLayout' },
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404',
    },
  ],
})
// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.query.url) {
    const urlParam = to.query.url
    if (urlParam) {
      next({ path: `/${urlParam}` })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
