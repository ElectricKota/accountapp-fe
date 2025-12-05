import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router'
import { i18n, setLocale, browserLocale } from './utils/localeSetting.ts'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
await setLocale(browserLocale)

const pinia = createPinia()
const app = createApp(App)
app.use(router) // Zaregistruj router
app.use(pinia)
app.use(PiniaColada)
app.use(i18n) // Zaregistruj i18n
app.mount('#app')
