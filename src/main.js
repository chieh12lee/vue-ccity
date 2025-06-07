import './assets/main.css'
import './assets/tailwind.css'
import '@nanoandrew4/vue3-carousel-3d/dist/style.css'
// import Vue3TouchEvents from 'vue3-touch-events'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
// Vue.use(Vue3TouchEvents)
app.use(router)
app.mount('#app')
