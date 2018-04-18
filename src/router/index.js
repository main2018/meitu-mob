import Vue from 'vue'
import Router from 'vue-router'
import Home from 'comp/home/home'
import PcHome from 'pc/home/home'
import { getClientType } from 'common/js/user-agent'
import Admin from 'admin/home/home.vue'

const type = getClientType()
const isPC = type === 'PC'

Vue.use(Router)

const routes = [
  { path: '/',
    component: isPC ? PcHome : Home
  }, {
    path: '/admin',
    component: Admin
  }
]

export default routes
