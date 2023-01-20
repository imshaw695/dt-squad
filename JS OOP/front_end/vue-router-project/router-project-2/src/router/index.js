import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateObservationView from '../views/CreateObservationView.vue'
import CrudView from '../views/CrudView.vue'
import EditObservationView from '../views/EditObservationView.vue'
import DataView from '../views/DataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/viewobservations',
      name: 'crudview',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CrudView
    },
    {
      path: '/createobservation',
      name: 'createobservation',
      component: CreateObservationView
    },
    {
      path: '/editobservation',
      name: 'editobservation',
      component: EditObservationView
    },
    {
      path: '/data',
      name: 'data',
      component: DataView
    }
  ]
})

export default router
