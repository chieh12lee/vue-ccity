import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import '@nanoandrew4/vue3-carousel-3d/dist/style.css'
app.use(router)

app.mount('#app')
