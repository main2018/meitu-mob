import { axiosAjax } from 'common/js'

const state = {
  albums: []
}

const actions = {
  getAlbums ({ commit }) {
    commit('GET_TEST')
  },
  setAlbums ({ commit }, albums) {
    commit('SET_TEST', albums)
  }
}

const mutations = {
  GET_TEST (state) {
    let path = '/album/find'
    axiosAjax.get(path, resp => {
      state.albums = resp
    })
  },
  SET_TEST (state, albums) {
    state.albums = albums
  }
}

const getters = {
  albums: state => state.albums
}

export default {
  state,
  getters,
  actions,
  mutations
}
