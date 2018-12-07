// initial state
const state = {
  status: {
    // 加载完成标志
    loaded: false,
    // 需要刷新标志
    needRefresh: false
  },
  // 当前城市信息
  currentCity: {
    // 省
    province: '',
    // 市
    city: '',
    // 城市编码
    citycode: '',
    // 区
    district: ''
  },
  // 设定城市信息
  newCity: {
    // 省
    province: '',
    // 市
    city: '',
    // 城市编码
    citycode: '',
    // 区
    district: ''
  },
  // 当前定位坐标
  currentPosition: [],
  // 地图缩放比例
  zoom: 0,
  // 地图中心点
  mapCenter: [],
  // 周边地址搜索关键字
  locationSearchKeyword: '',
  // 周边地址搜索结果
  locationSearchResults: {},
  // 周边POI数据库搜索结果
  poiSearchResults: {},
  // 行政区搜索结果
  districtSearchResults: {},
  // 行政区count计数搜索结果
  districtCountResults: [],
  // 当前地点id
  locationId: 0

}

// getters
// const getters = {
//   allProducts: state => state.all
// }

// actions
const actions = {
  amapLoaded ({commit}) {
    commit('AMAP_LOADED')
  },
  amapNeedRefresh ({commit}) {
    commit('AMAP_NEED_REFRESH')
  },
  amapRefreshCompleted ({commit}) {
    commit('AMAP_REFRESH_COMPLETED')
  },
  amapSetCurrentCity ({commit}, cityData) {
    commit('AMAP_SET_CURRENT_CITY', cityData)
  },
  amapSetNewCity ({commit}, cityData) {
    commit('AMAP_SET_NEW_CITY', cityData)
  },
  amapSetCurrentPosition ({commit}, position) {
    commit('AMAP_SET_CURRENT_POSITION', position)
  },
  amapSetZoom ({commit}, zoom) {
    commit('AMAP_SET_ZOOM', zoom)
  },
  amapSetMapCenter ({commit}, center) {
    commit('AMAP_SET_MAP_CENTER', center)
  },
  amapSetLocationSearchKeyword ({commit}, keyword) {
    commit('AMAP_SET_LOCATION_SEARCH_KEYWORD', keyword)
  },
  amapSetLocationSearchResults ({commit}, results) {
    commit('AMAP_SET_LOCATION_SEARCH_RESULTS', results)
  },
  amapSetPoiSearchResults ({commit}, results) {
    commit('AMAP_SET_POI_SEARCH_RESULTS', results)
  },
  amapSetDistrictSearchResults ({commit}, results) {
    commit('AMAP_SET_DISTRICT_SEARCH_RESULTS', results)
  },
  amapSetDistrictCountResults ({commit}, results) {
    commit('AMAP_SET_DISTRICT_COUNT_RESULTS', results)
  },
  amapSetLocationId ({commit}, id) {
    commit('AMAP_SET_LOCATION_ID', id)
  }
}

// mutations
const mutations = {
  // 设置Loaded
  AMAP_LOADED (state) {
    state.status.loaded = true     // 新增
  },
  // 设置刷新标志
  AMAP_NEED_REFRESH (state) {
    state.status.needRefresh = true
  },
  // 设置刷新完成标志
  AMAP_REFRESH_COMPLETED (state) {
    state.status.needRefresh = false
  },
  AMAP_SET_CURRENT_CITY (state, cityData) {
    state.currentCity = cityData
  },
  AMAP_SET_NEW_CITY (state, cityData) {
    state.newCity = cityData
  },
  AMAP_SET_CURRENT_POSITION (state, position) {
    state.currentPosition = position
  },
  AMAP_SET_ZOOM (state, zoom) {
    state.zoom = zoom
  },
  AMAP_SET_MAP_CENTER (state, center) {
    state.mapCenter = center
  },
  AMAP_SET_LOCATION_SEARCH_KEYWORD (state, keyword) {
    state.locationSearchKeyword = keyword
  },
  AMAP_SET_LOCATION_SEARCH_RESULTS (state, results) {
    state.locationSearchResults = results
  },
  AMAP_SET_POI_SEARCH_RESULTS (state, results) {
    state.poiSearchResults = results
  },
  AMAP_SET_DISTRICT_SEARCH_RESULTS (state, results) {
    state.districtSearchResults = results
  },
  AMAP_SET_DISTRICT_COUNT_RESULTS (state, results) {
    state.districtCountResults = results
  },
  AMAP_SET_LOCATION_ID (state, id) {
    state.locationId = id
  }
}

const getters = {
  currentCity: state => state.currentCity,
  city: state => state.currentCity.city
}

export default {
  state,
  getters,
  actions,
  mutations
}
