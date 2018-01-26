const state = {
  photos: {
    one: [],
    two: []
  }
}

const actions = {
  setPhotos ({ commit }, photos) {
    commit('SET_test', photos)
  }
}

const mutations = {

  SET_test (state, photos) {
    state.photos = photos
  }
}

const getters = {
  photos: state => state.photos
}

export default {
  state,
  getters,
  actions,
  mutations
}
