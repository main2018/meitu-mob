import { axiosAjax } from 'common/js'

const state = {
  categories: [],
  categorystatus: []
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
      setActivesStatus(state, resp)
    })
  },

  SET_CATEGORY (state, categories) {
    state.categories = categories
  }
}

const getters = {
  categories: state => state.categories,
  categorystatus: state => state.categorystatus
}

export default {
  state,
  getters,
  actions,
  mutations
}

function setActivesStatus (state, data) {
  state.categorystatus = []
  data.forEach(item => {
    let status = { category: false, subcategories: [] }
    item.subcategories.forEach(() => {
      status.subcategories.push(false)
    })
    state.categorystatus.push(status)
  })
}

