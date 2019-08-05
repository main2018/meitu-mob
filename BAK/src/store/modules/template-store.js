const state = {
  test: 'test'
}

const actions = {
  setTest ({ commit }, test) {
    commit('SET_test', test)
  }
}

const mutations = {

  SET_test (state, test) {
    state.test = test
  }
}

const getters = {
  test: state => state.test
}

export default {
  state,
  getters,
  actions,
  mutations
}
