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
  },
  user: {
    account: '',
    token: '',
    expire: 0
  }
}

const actions = {
  getSettings ({ commit }) { commit('GET_SETTINGS') },
  showLoading ({ commit }) { commit('SHOW_LOADING') },
  hideLoading ({ commit }) { commit('HiDE_LOADING') },
  setUser ({ commit }, user) { commit('SET_USER', user) },
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
  },
  SET_USER (state, user) { state.user = user }
}

const getters = {
  settings: state => state.settings,
  user: state => state.user,
  loading: state => state.loading
}

export default {
  state,
  getters,
  actions,
  mutations
}
