import { get } from 'common/js/ajax-axios'
import { VUE_SERVER } from 'config/vue-remote-server.js'
import { setLocalStore } from 'common/js/localStorage'

const state = {
  settings: {
    logo: '',
    name: ''
  },
  loading: {
    status: false,
    hint: 'loading'
  }
}

const actions = {
  getSettings ({ commit }) { commit('GET_SETTINGS') },
  showLoading ({ commit }) { commit('SHOW_LOADING') },
  hideLoading ({ commit }) { commit('HiDE_LOADING') },
  setLoadingHint ({ commit }, hint) { commit('SET_LOADING_HINT', hint) }
}

const mutations = {
  GET_SETTINGS (state, settings) {
    get('/site', (resp) => {
      if (!resp.success) { return }
      state.settings = resp.data
      setLocalStore('siteName', resp.data.name)
      if (!resp.data.logo) { return }
      let logo = VUE_SERVER + resp.data.logo
      state.settings.logo = logo
      setLocalStore('siteLogo', logo)
    })
  },

  SHOW_LOADING (state) { state.loading.status = true },
  HiDE_LOADING (state) { state.loading.status = false },

  SET_LOADING_HINT (state, hint) {
    state.loading.status = true
    state.loading.hint = hint
  }
}

const getters = {
  settings: state => state.settings,
  loading: state => state.loading
}

export default {
  state,
  getters,
  actions,
  mutations
}
