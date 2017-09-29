import Vue from 'vue'
import App from './App'
import router from './router'
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

Vue.config.productionTip = false
Vue.use(AjaxPost)
Vue.use(AjaxGet)
Vue.use(SetLocal)
Vue.use(GetLocal)
Vue.use(PostForm)
Vue.use(Log)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
