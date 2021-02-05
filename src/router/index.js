import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPreconfig from '../views/ListPreconfig.vue'
import CreatePreconfig from '../views/CreatePreconfig.vue'
import EditPreconfig from '../views/EditPreconfig.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/onu/index'
  },
  {
    path: '/onu/index',
    name: 'List-Preconfig',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ListPreconfig
  },
  {
    path: '/onu/create',
    name: 'Create-Preconfig',
    component: CreatePreconfig
  },
  {
    path: '/onu/edit/:id',
    name: 'Edit-Preconfig',
    component: EditPreconfig
  }
]

const router = new VueRouter({
  routes
})

export default router
