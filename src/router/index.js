import Vue from 'vue'
import Router from 'vue-router'

import MobHome from 'mob/home/home'
import MobIndex from 'mob/index/index'
import PcHome from 'pc/home/home'
import PcIndex from 'pc/pc-index/pc-index'
import { getClientType } from 'common/js/user-agent'
import AdminHome from 'admin/home/home.vue'
import PcDetail from 'pc/pc-detail/pc-detail'
const AdminSign = require('admin/admin-sign/admin-sign')

const type = getClientType()
const isPC = type === 'PC'

Vue.use(Router)

const routes = [
  { path: '/',
    component: isPC ? PcHome : MobHome,
    children: [{
      path: '/',
      component: isPC ? PcIndex : MobIndex
    }]
  }, {
    path: '/admin',
    component: AdminHome
  }, {
    path: '/detail',
    component: PcDetail
  }, {
    path: '/admin/signin',
    component: AdminSign
  }
]

export default routes
