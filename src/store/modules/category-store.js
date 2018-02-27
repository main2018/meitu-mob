import { axiosAjax } from 'common/js'

const state = {
  categories: [],
  categoryStatus: []
}

const actions = {
  getCategory ({ commit }) {
    commit('GET_CATEGORY')
  },

  setCategory ({ commit }, categories) {
    commit('SET_CATEGORY', categories)
  },

  setStatus ({ commit }, order) {
    commit('SET_STATUS', order)
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
  },

  SET_STATUS (state, order) {
    state.categoryStatus.forEach((item, idx) => {
      item.category = false
      item.subcategories.forEach((subItem, subIdx) => {
        item.subcategories.splice(subIdx, 1, false)
      })
    })
    let { index, subIndex } = order
    let current = state.categoryStatus[index]
    if (subIndex || subIndex === 0) {
      current.subcategories.splice(subIndex, 1, true)
    } else {
      current.category = true
    }
  }
}

const getters = {
  categories: state => state.categories,
  categoryStatus: state => state.categoryStatus
}

export default {
  state,
  getters,
  actions,
  mutations
}

function setActivesStatus (state, data) {
  state.categoryStatus = []
  data.forEach(item => {
    let status = { category: false, subcategories: [] }
    item.subcategories.forEach(() => {
      status.subcategories.push(false)
    })
    state.categoryStatus.push(status)
  })
}
