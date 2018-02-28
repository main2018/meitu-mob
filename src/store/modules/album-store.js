import { axiosAjax } from 'common/js'

const state = {
  albums: [],
  adminAlbums: [],
  isPublishShow: false
}

const actions = {
  getAlbums ({ commit }) { commit('GET_ALBUMS') },
  setAlbums ({ commit }, albums) { commit('SET_ALBUMS', albums) },
  showPublish ({ commit }) { commit('SHOW_PUBLISH') },
  hidePublish ({ commit }) { commit('HIDE_PUBLISH') },

  getAdminAlbums ({ commit }, category) {
    commit('HIDE_PUBLISH')
    commit('GET_ADMIN_ALBUMS', category)
  },

  setAdminAlbums ({ commit }, adminAlbums) {
    commit('SET_ADMIN_ALBUMS', adminAlbums)
  }
}

const mutations = {
  GET_ALBUMS (state) {
    let path = '/album/find'
    axiosAjax.get(path, resp => {
      state.albums = resp
    })
  },
  SET_ALBUMS (state, albums) { state.albums = albums },

  GET_ADMIN_ALBUMS (state, category) {
    let path = '/album/findByCategory'
    axiosAjax.post(path, { category: category }, resp => {
      state.adminAlbums = resp
    })
  },
  SET_ADMIN_ALBUMS (state, albums) { state.adminAlbums = albums },
  SHOW_PUBLISH (state) { state.isPublishShow = true },
  HIDE_PUBLISH (state) { state.isPublishShow = false }
}

const getters = {
  albums: state => state.albums,
  adminAlbums: state => state.adminAlbums,
  isPublishShow: state => state.isPublishShow
}

export default {
  state,
  getters,
  actions,
  mutations
}
