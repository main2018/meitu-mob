import { get } from 'common/js/ajax-axios'

const state = {
  categories: [],
  subNavMenu: [],
  activeSubNavMenu: {},
  editIdx: null,
  activeCategory: [],
  categoryStatus: [],
  isEditorShow: false,
  hasArticle: true,
  hasImage: false,
  hasVideo: false,
  hasLink: false
}

const actions = {
  hideEditor ({ commit }) { commit('HIDE_CATEGORY_EDITOR') },
  showEditor ({ commit }, idx) { commit('SHOW_CATEGORY_EDITOR', idx) },

  getCategory ({ commit }, activeCategory) { commit('GET_CATEGORY_BY_CATEGORY', activeCategory) },
  setCategory ({ commit }, categories) { commit('SET_CATEGORY', categories) },

  setSubNavMenu ({ commit }, categoryName) { commit('SET_SUB_NAV_MENU', categoryName) },
  setSubNavActive ({ commit }, menu) { commit('SET_SUB_NAV_ACTIVE', menu) },
  getAllSubNavMenu ({ commit }) { commit('GET_ALL_SUB_NAV_MENUS') },
  clearSubNavActive ({ commit }) { commit('CLEAR_SUB_NAV_ACTIVE') },

  setActiveCategory ({ commit }, activeCategory) {
    commit('SET_ACTIVE_CATEGORY', activeCategory)
  },

  setAdminNavStatus ({ commit }, order) { commit('SET_ADMIN_NAV_STATUS', order) },
  setStatus ({ commit }, order) { commit('SET_STATUS', order) }
}

const mutations = {
  GET_ALL_SUB_NAV_MENUS (state) {
    let path = '/category/findAll'
    get(path, categories => { state.subNavMenu = genSubNavMenus(categories) })
  },

  GET_CATEGORY_BY_CATEGORY (state, activeCategory) {
    let path = '/category/findAll'
    get(path, resp => {
      setActivesStatus(state, resp)
      state.categories = resp

      if (!activeCategory) { return }
      state.categories.forEach(item => {
        if (item.category !== activeCategory[0]) { return }
        state.hasArticle = item.hasArticle
        state.hasImage = item.hasImage
        state.hasVideo = item.hasVideo
        state.hasLink = item.hasLink
      })
    })
  },

  SET_CATEGORY (state, categories) {
    state.categories = categories
  },

  SET_SUB_NAV_MENU (state, categoryName) {
    if (state.categories.length === 0) { return }
    state.subNavMenu = genSubNavMenus(state.categories, categoryName)
  },

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

  SET_SUB_NAV_ACTIVE (state, { category, subcategory }) {
    state.activeSubNavMenu = { category, subcategory }
  },

  CLEAR_SUB_NAV_ACTIVE (state) { state.activeSubNavMenu = {} },

  SET_STATUS (state, order) {
    let [idx, _idx] = order
    state.subNavMenu.forEach((menu, index) => {
      if (index !== idx) {
        menu.subcategories.forEach(sub => { sub.active = false })
        return
      }
      menu.subcategories.forEach((sub, subIndex) => {
        sub.active = subIndex === _idx
      })
    })
  },

  SET_ADMIN_NAV_STATUS (state, order) {
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
  categoryStatus: state => state.categoryStatus,
  activeCategory: state => state.activeCategory,
  subNavMenu: state => state.subNavMenu,
  activeSubNavMenu: state => state.activeSubNavMenu,
  hasArticle: state => state.hasArticle,
  hasImage: state => state.hasImage,
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

function genSubNavMenus (categories, categoryName) {
  let menus = []
  categories.forEach(category => {
    if (categoryName && category.category !== categoryName) { return }
    let menu = {
      category: category.category,
      route: category.route,
      subcategories: []
    }
    category.subcategories.forEach(subcategory => {
      menu.subcategories.push({ name: subcategory, active: false })
    })
    menus.push(menu)
  })
  return menus
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

