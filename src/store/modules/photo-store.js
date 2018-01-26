const state = {
  photos: {
    one: [{title: 'test1'}, {title: 'test2'}],
    two: [{title: 'test3'}]
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
