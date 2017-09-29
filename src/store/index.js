import Vue from 'vue'
import Vuex from 'vuex'
import testStore from './modules/template-store'
import amapStore from './modules/amap-store'
// import createLogger from 'vuex/dist/logger' // 日志插件

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production' // 工具

export default new Vuex.Store({
  modules: {
    test: testStore,
    amap: amapStore
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
