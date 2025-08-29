import { createRouter, createWebHistory } from 'vue-router'

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
  // Zkontrolujeme, jestli máme query parametr "url"
  if (to.query.url) {
    const urlParam = to.query.url

    // Na základě hodnoty parametru provést přesměrování
    if (urlParam) {
      // Přesměrovat na /urlParam, pokud je url=GunPowder
      next({ path: `/${urlParam}` })
    }
    else {
      next() // Pokud query neodpovídá, pokračovat na aktuální cestu
    }
  }
  else {
    next() // Pokud není query parametr, pokračovat normálně
  }
})
export default router
