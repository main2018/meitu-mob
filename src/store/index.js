import Vue from 'vue'
import Vuex from 'vuex'
import photoStore from './modules/photo-store'
import albumStore from './modules/album-store.js'
import categoryStore from './modules/category-store.js'
// import createLogger from 'vuex/dist/logger' // 日志插件

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production' // 工具

export default new Vuex.Store({
  modules: {
    photo: photoStore,
    album: albumStore,
    category: categoryStore
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
