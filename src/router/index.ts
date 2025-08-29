import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  linkActiveClass: 'nav__item',
  linkExactActiveClass: 'nav__item--active',
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   name: 'Homepage',
    //   meta: { tableName: 'loadout' },  // Název tabulky v DB
    //   component: HomeView
    // },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFountView.vue'),
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
