import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'weather-home',
    // [요구사항 1] 지연 로딩 (동적 import)
    component: () => import('../views/WeatherHomeView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'weather-detail',
    component: () => import('../views/WeatherDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/WeatherAboutView.vue'),
  },
  {
    path: '/vuetify-demo',
    name: 'vuetify-demo',
    component: () => import('../views/VuetifyDemoView.vue'),
  },
  {
    // [요구사항 1] Catch-all Route
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
