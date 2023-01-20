import { createRouter, createWebHistory } from 'vue-router'
import ObservationTemplate from '../components/ObservationTemplate.vue'
import Login from '../components/Login.vue'
import ViewObservations from '../components/ViewObservations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/observationtemplate',
    name: 'ObservationTemplate',
    component: ObservationTemplate
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: ObservationTemplate
  },
  {
    path: '/viewobservations',
    name: 'ViewObservations',
    component: ViewObservations
  },
  ]
})

export default router
