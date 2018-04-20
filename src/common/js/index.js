import { post, get, ajax } from './ajax-axios'
import { getLocalStore, setLocalStore } from './localStorage'
import { log } from './logger'
const { QINIU_URL_PREFIX } = require('config')

export const AjaxPost = {
  install (Vue) {
    Vue.prototype.post = post
    Vue.post = post
  },
  post: post
}

export const AjaxGet = {
  install (Vue) {
    Vue.prototype.get = get
    Vue.get = get
  },
  get: get
}

export const GetLocal = {
  install (Vue) {
    Vue.prototype.getLocal = getLocalStore
    Vue.getLocal = getLocalStore
  },
  post: post
}

export const SetLocal = {
  install (Vue) {
    Vue.prototype.setLocal = setLocalStore
    Vue.setLocal = setLocalStore
  },
  post: post
}

export const Log = {
  install (Vue) {
    Vue.prototype.log = log
    Vue.log = log
  },
  log: log
}

export const axiosAjax = ajax

export const _2space = str => str.replace(/__/g, ' ')
export const timeFormat = str => str ? str.substr(0, 10) : null

export function setObjectPropToData (prop, data) {
  let ob = {}
  for (let key in this[data]) {
    ob[key] = this[data][key]
  }
  this[data] = this[prop]
  for (let key in ob) {
    let hasKey = this[data].hasOwnProperty(key)
    if (!hasKey) { this[data][key] = ob[key] }
  }
}

export function getBgStyle (uri, ratio = '4 : 3') {
  if (!uri) { return '' }
  let url = uri ? QINIU_URL_PREFIX + uri : ''
  let w = +ratio.split(':')[0]
  let h = +ratio.split(':')[1]
  let height = 65
  if (w > 0 && h > 0) { height = ~~(100 / w * h) }
  let style = `
    height: 0;
    width: 100%;
    padding-bottom: ${height}%;
    background-color: #eee;
    background-image: url(${url})
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `
  // style = style.replace('/[\r\n]/g', '')
  return style
}
