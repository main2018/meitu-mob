const state = {
  photos: {
    one: [{
      id: '001',
      title: 'test1',
      // img: 'http://192.168.0.106:8000/static/default.png',
      time: '2016-1-2'
    }, {title: 'test2'}],
    two: [{title: 'test3'}]
  },
  currPhoto: {
    id: '001',
    title: 'test1',
    time: '2000-00-00',
    desc: 'this is a test text',
    vedio: 'http://192.168.0.106:8000/static/alpha.mp4',
    vedioPoster: 'http://192.168.0.106:8000/static/default.png',
    imgs: [
      // 'http://192.168.0.106:8000/static/default.png',
    ]
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
  photos: state => state.photos,
  currPhoto: state => state.currPhoto
}

export default {
  state,
  getters,
  actions,
  mutations
}
