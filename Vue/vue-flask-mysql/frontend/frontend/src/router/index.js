import { createRouter, createWebHistory } from 'vue-router'
import ObservationTemplate from '../components/ObservationTemplate.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/observationtemplate',
    name: 'ObservationTemplate',
    component: ObservationTemplate
  }
  ]
})

export default router
