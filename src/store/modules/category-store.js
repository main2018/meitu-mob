import { get } from 'common/js/ajax-axios'

const state = {
  categories: [],
  subNavMenu: [],
  subNavActive: '',
  editIdx: null,
  activeCategory: [],
  categoryStatus: [],
  isEditorShow: false,
  hasArticle: true,
  hasVideo: false,
  hasLink: false
}

const actions = {
  hideEditor ({ commit }) { commit('HIDE_CATEGORY_EDITOR') },
  showEditor ({ commit }, idx) { commit('SHOW_CATEGORY_EDITOR', idx) },

  getCategory ({ commit }, activeCategory) { commit('GET_CATEGORY', activeCategory) },
  setCategory ({ commit }, categories) { commit('SET_CATEGORY', categories) },

  setSubNavMenu ({ commit }, menu) { commit('SET_SUB_NAV_MENU', menu) },
  setSubNavActive ({ commit }, item) { commit('SET_SUB_NAV_ACTIVE', item) },

  setActiveCategory ({ commit }, activeCategory) {
    commit('SET_ACTIVE_CATEGORY', activeCategory)
  },

  setStatus ({ commit }, order) {
    commit('SET_STATUS', order)
  }
}

const mutations = {
  GET_CATEGORY (state, activeCategory) {
    let path = '/category/findAll'
    get(path, resp => {
      setActivesStatus(state, resp)
      state.categories = resp

      if (!activeCategory) { return }
      state.categories.forEach((item) => {
        if (item.category !== activeCategory[0]) { return }
        state.hasArticle = item.hasArticle
        state.hasVideo = item.hasVideo
        state.hasLink = item.hasLink
      })
    })
  },

  SET_CATEGORY (state, categories) {
    state.categories = categories
  },

  SET_SUB_NAV_MENU (state, menu) { state.subNavMenu = menu },
  SET_SUB_NAV_ACTIVE (state, item) { state.subNavActive = item },

  HIDE_CATEGORY_EDITOR (state) { state.isEditorShow = false },
  SHOW_CATEGORY_EDITOR (state, idx) {
    if (idx || idx === 0) { state.editIdx = idx }
    state.isEditorShow = true
  },

  SET_ACTIVE_CATEGORY (state, activeCategory) {
    state.activeCategory = activeCategory
    state.categories.forEach((item) => {
      if (item.category === activeCategory[0]) {
        state.hasArticle = item.hasArticle
        state.hasVideo = item.hasVideo
        state.hasLink = item.hasLink
      }
    })
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
  subNavMenu: state => state.subNavMenu,
  subNavActive: state => state.subNavActive,
  activeCategory: state => state.activeCategory,
  categoryStatus: state => state.categoryStatus,
  hasArticle: state => state.hasArticle,
  hasVideo: state => state.hasVideo,
  hasLink: state => state.hasLink,
  isEditorShow: state => state.isEditorShow,
  editIdx: state => state.editIdx,
  categoryCrumb: state => {
    let arr = state.activeCategory
    if (arr.length === 0) { return '' }
    let crumb = arr[1] ? `${arr[0]} / ${arr[1]}` : arr[0]
    return crumb
  }
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

