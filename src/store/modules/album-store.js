import { post, get } from 'common/js/ajax-axios'

const state = {
  albums: {},
  currAlbum: {},
  adminAlbums: [],
  commendAlbums: [],
  subcategoryAlbums: [],
  isPublishShow: false,
  isUpdatesShow: false
}

const actions = {
  getAlbumsByCategory ({ commit }, category) { commit('GET_ALBUMS_BY_CATEGORY', category) },
  setAlbums ({ commit }, albums) { commit('SET_ALBUMS', albums) },
  setSubategoryAlbums ({ commit }, category) { commit('SET_SUBCATEGORY_ALBUMS', category) },
  getAllAlbum ({ commit }, option) { commit('GET_ALL_ALBUMS', option) },
  showPublish ({ commit }) { commit('SHOW_PUBLISH') },
  hidePublish ({ commit }) { commit('HIDE_PUBLISH') },
  showUpdates ({ commit }) { commit('SHOW_UPDATES') },
  hideUpdates ({ commit }) { commit('HIDE_UPDATES') },

  getAdminAlbums ({ commit }, category) {
    // commit('HIDE_PUBLISH') // aside hidePublish
    commit('GET_ADMIN_ALBUMS', category)
  },

  getCurrAlbum ({ commit }, id) {
    commit('GET_CURR_ALBUM', id)
  },

  setAdminAlbums ({ commit }, adminAlbums) {
    commit('SET_ADMIN_ALBUMS', adminAlbums)
  }
}

const mutations = {
  GET_ALBUMS_BY_CATEGORY (state, category) {
    let path = '/album/findByCategory'
    post(path, { category, status: 0 }, resp => {
      state.albums[category] = formatAlbums(resp)
    })
  },

  GET_ALL_ALBUMS (state, option) {
    get('/album', albums => {
      state.commendAlbums = []
      albums.forEach(album => {
        album.isCommend && state.commendAlbums.push(album)
      })
      state.albums = formatAlbums(albums)
    })
  },

  GET_CURR_ALBUM (state, id) {
    get(`/album/${id}`, resp => {
      state.currAlbum = resp
    })
  },

  SET_ALBUMS (state, albums) { state.albums = albums },

  SET_SUBCATEGORY_ALBUMS (state, [category, subcategory]) {
    let categoryAlbum = state.albums[category]
    if (categoryAlbum && categoryAlbum.subcategory) {
      state.subcategoryAlbums = categoryAlbum.subcategory[subcategory]
    }
  },

  GET_ADMIN_ALBUMS (state, category) {
    let path = '/album/findByCategory'
    post(path, category, resp => {
      state.adminAlbums = resp
    })
  },
  SET_ADMIN_ALBUMS (state, albums) { state.adminAlbums = albums },
  SHOW_PUBLISH (state) { state.isPublishShow = true },
  HIDE_PUBLISH (state) { state.isPublishShow = false },
  SHOW_UPDATES (state) { state.isUpdatesShow = true },
  HIDE_UPDATES (state) { state.isUpdatesShow = false }
}

const getters = {
  albums: state => state.albums,
  currAlbum: state => state.currAlbum,
  adminAlbums: state => state.adminAlbums,
  commendAlbums: state => state.commendAlbums,
  subcategoryAlbums: state => state.subcategoryAlbums,
  isPublishShow: state => state.isPublishShow,
  isUpdatesShow: state => state.isUpdatesShow
}

export default {
  state,
  getters,
  actions,
  mutations
}

/* albumsFormat:
  {category-1: {
    category: [],
    subcategory: {subcategory-1: [], subcategory-2: []}
  }} */
function formatAlbums (resp) {
  let data = {}
  resp.forEach(album => {
    let { category, subcategory } = album
    if (!data[category]) {
      data[category] = { category: [], subcategory: {} }
    }
    if (!album.subcategory) {
      data[category].category.push(album)
    } else {
      if (!data[category].subcategory[subcategory]) {
        data[category].subcategory[subcategory] = []
      }
      data[category].subcategory[subcategory].push(album)
    }
  })
  return data
}
