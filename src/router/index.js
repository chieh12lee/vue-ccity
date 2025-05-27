import { createRouter, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/main/:id',
      name: 'main',
      component: () => import('../views/Main.vue'),
    },
  ],
})

export default router
