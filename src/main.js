import { get } from 'common/js/ajax-axios'
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
import { genDynamicWrapper } from 'base/str-templ/dynamic-wrapper.js'
import Detail from 'mob/detail/detail.vue'
import PcDetail from 'pc/pc-detail/pc-detail'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

/* eslint-disable no-new */
get('/category', resp => {
  let subRoutes = []
  resp.forEach(item => {
    subRoutes.push({
      path: `/${item.route}`,
      component: genDynamicWrapper(isPC, item.route)
    })
    subRoutes.push({
      path: isPC ? `/detail` : `/${item.route}/detail`,
      // component: Detail
      component: isPC ? PcDetail : Detail
    })
  })
  routes.forEach((route) => {
    if (route.children) {
      subRoutes.forEach((sub) => {
        route.children.push(sub)
      })
    }
  })
  const router = new Router({ mode: 'history', routes })
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
