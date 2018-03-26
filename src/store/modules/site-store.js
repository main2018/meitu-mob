import { get } from 'common/js/ajax-axios'
import { VUE_SERVER } from 'config/vue-remote-server.js'
import { setLocalStore } from 'common/js/localStorage'

const state = {
  settings: {
    logo: '',
    name: ''
  }
}

const actions = {
  getSettings ({ commit }) { commit('GET_SETTINGS') }
}

const mutations = {
  GET_SETTINGS (state, settings) {
    get('/getSettings', (resp) => {
      if (!resp.success) { return }
      state.settings = resp.data
      setLocalStore('siteName', resp.data.name)
      if (!resp.data.logo) { return }
      let logo = VUE_SERVER + resp.data.logo
      state.settings.logo = logo
      setLocalStore('sitLogo', logo)
    })
  }
}

const getters = {
  settings: state => state.settings,
  name: state => state.settings.name,
  logo: state => state.settings.logo
}

export default {
  state,
  getters,
  actions,
  mutations
}
