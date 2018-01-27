const state = {
  photos: {
    one: [{
      id: '001',
      title: 'test1',
      // img: 'http://192.168.0.106:8000/static/default.png',
      time: '2016-1-2'
    }, {title: 'test2'}],
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
