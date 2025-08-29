import type { Router } from 'vue-router'

function safeBack(router: Router, fallbackRoute: string = '/'): void {
  // Kontrola, zda existuje předchozí záznam v historii routeru
  if (window.history.length > 1) {
    router.go(-1)
  }
  else {
    router.push(fallbackRoute)
  }
}

export default safeBack
