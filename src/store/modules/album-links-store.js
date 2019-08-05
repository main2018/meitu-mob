import { post } from 'common/js/ajax-axios'

const state = {
  albumLinks: []
}

const actions = {
  getAlbumLinks ({ commit }, category) {
    commit('GET_ALBUM_LINKS', category)
  }
}

const mutations = {
  GET_ALBUM_LINKS (state, category) {
    let path = '/album/findLinks'
    post(path, { category, status: 0 }, resp => {
      state.albumLinks = Array.from(resp)
    })
  }
}

const getters = {
  albumLinks: state => state.albumLinks
}

export default {
  state,
  getters,
  actions,
  mutations
}
