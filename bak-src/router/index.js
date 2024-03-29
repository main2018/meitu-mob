import Vue from 'vue'
import Router from 'vue-router'
import { getClientType } from 'common/js/user-agent'
import MobHome from 'mob/home/home'
import PcHome from 'pc/home/home'

const type = getClientType()
const isPC = type === 'PC'

const AdminHome = (resolve) => {
  require.ensure(['admin/home/home.vue'], () => {
    resolve(require('admin/home/home.vue'))
  })
}

const AdminSign = (resolve) => {
  require.ensure(['admin/admin-sign/admin-sign'], () => {
    resolve(require('admin/admin-sign/admin-sign'))
  })
}

Vue.use(Router)

const routes = [
  { path: '/',
    component: isPC ? PcHome : MobHome
  }, {
    path: '/admin',
    component: AdminHome
  }, {
    path: '/admin/signin',
    component: AdminSign
  }
]

export default routes
