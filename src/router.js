import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './modules/00-dashboard/routes'
import Equipment from './modules/01-equipment/routes'
import Steps from './modules/02-steps/routes'
import Settings from './modules/03-settings/routes'
import About from './modules/04-about/routes'

Vue.use(VueRouter)

const routes = [].concat(
    Dashboard,
    Equipment,
    Settings,
    Steps,
    About,
)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})