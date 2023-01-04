import { createRouter, createWebHistory } from 'vue-router'
import ObservationTemplate from '../components/ObservationTemplate.vue'
import CreateUser from '../components/CreateUser.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/observationtemplate',
    name: 'ObservationTemplate',
    component: ObservationTemplate
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/',
    name: 'Home',
    component: ObservationTemplate
  },
  ]
})

export default router
