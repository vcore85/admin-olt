import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPreconfig from '../views/ListPreconfig.vue'
import AddPreconfig from '../views/AddPreconfig.vue'
import EditPreconfig from '../views/EditPreconfig.vue'
import AddArea from '../views/AddArea.vue'
import ListArea from '../views/ListArea.vue'
import EditArea from '../views/EditArea.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/onu/preconfig/index'
  },
  {
    path: '/onu/preconfig/index',
    name: 'List-Preconfig',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ListPreconfig
  },
  {
    path: '/onu/preconfig/add',
    name: 'Add-Preconfig',
    component: AddPreconfig
  },
  {
    path: '/onu/preconfig/edit/:id',
    name: 'Edit-Preconfig',
    component: EditPreconfig
  },
  {
    path: '/area/add',
    name: 'Add-Area',
    component: AddArea
  },
  {
    path: '/area/index',
    name: 'List-Area',
    component: ListArea
  },
  {
    path: '/area/edit/:id',
    name: 'Edit-Area',
    component: EditArea
  }

]

const router = new VueRouter({
  routes
})

export default router
