import { get } from 'common/js/ajax-axios'

const state = {
  isAdminSignin: false,
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
    get('/site', resp => {
      state.isAdminSignin = true
      state.settings = resp
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
