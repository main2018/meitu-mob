import { get } from 'common/js/ajax-axios'
const { QINIU_URL_PREFIX } = require('../../config')
import { getClientType } from 'common/js/user-agent'
import Vue from 'vue'
import App from './App'
import routes from './router'
import Router from 'vue-router'
import 'common/stylus/index.styl'
import 'mdi/css/materialdesignicons.min.css'
import {
  AjaxPost,
  AjaxGet,
  GetLocal,
  SetLocal,
  DelLocal,
  QiniuUrl,
  Log
} from 'common/js'
import store from './store'
import { dynamicWrapper as Dynamic } from '../src/base/str-templ/dynamic-wrapper'
// import Detail from 'mob/detail/detail.vue'
// import PcDetail from 'pc/pc-detail'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const Detail = (resolve) => {
  require.ensure(['base/base-detail/base-detail.vue'], () => {
    resolve(require('base/base-detail/base-detail.vue'))
  })
}

/*
const Detail = (resolve) => {
  require.ensure(['mob/detail/detail.vue'], () => {
    resolve(require('mob/detail/detail.vue'))
  })
}

const PcDetail = (resolve) => {
  require.ensure(['pc/pc-detail'], () => {
    resolve(require('pc/pc-detail'))
  })
}
*/

Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(AjaxPost)
Vue.use(AjaxGet)
Vue.use(SetLocal)
Vue.use(DelLocal)
Vue.use(GetLocal)
Vue.use(QiniuUrl)
Vue.use(Log)
Vue.use(Router)

const type = getClientType()
const isPC = type === 'PC'
Vue.prototype.$isPc = isPC
Vue.prototype.$http = QINIU_URL_PREFIX

/* eslint-disable no-new */
get('/category', resp => {
  resp.forEach(item => {
    routes.push({
      path: `/${item.route}`,
      component: Dynamic
    })
    routes.push({
      path: `/${item.route}/detail`,
      // component: isPC ? PcDetail : Detail
      component: Detail
    })
  })

  const router = new Router({ mode: 'history', routes })
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
