import { get } from 'common/js/ajax-axios'
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
  PostForm,
  Log
} from 'common/js'
import store from './store'
import { dynamicWrapper as Dynamic } from 'base/str-templ/dynamic-wrapper.js'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(AjaxPost)
Vue.use(AjaxGet)
Vue.use(SetLocal)
Vue.use(GetLocal)
Vue.use(PostForm)
Vue.use(Log)
Vue.use(Router)

/* eslint-disable no-new */
get('/category/findAll', resp => {
  resp.data.forEach(item => {
    routes.push({
      path: `/${item.category}`,
      component: Dynamic
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
