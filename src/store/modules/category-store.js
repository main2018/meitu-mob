import { axiosAjax } from 'common/js'

const state = {
  categories: []
}

const actions = {
  getCategory ({ commit }) {
    commit('GET_CATEGORY')
  },

  setCategory ({ commit }, categories) {
    commit('SET_CATEGORY', categories)
  }
}

const mutations = {
  GET_CATEGORY (state) {
    let path = '/category/findAll'
    axiosAjax.get(path, resp => {
      state.categories = resp
    })
  },

  SET_CATEGORY (state, categories) {
    state.categories = categories
  }
}

const getters = {
  categories: state => state.categories
}

export default {
  state,
  getters,
  actions,
  mutations
}
