import { post, get } from './ajax-axios'
import {
  getLocalStore,
  setLocalStore,
  delLocalStore
} from './localStorage'
import { log } from './logger'
import { getQiniuUrl } from './qiniu-api.js'

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
  getLocal: getLocalStore
}

export const SetLocal = {
  install (Vue) {
    Vue.prototype.setLocal = setLocalStore
    Vue.setLocal = setLocalStore
  },
  setLocal: setLocalStore
}

export const DelLocal = {
  install (Vue) {
    Vue.prototype.delLocal = delLocalStore
    Vue.delLocal = delLocalStore
  },
  delLocal: delLocalStore
}

export const QiniuUrl = {
  install (Vue) {
    Vue.prototype.$qiniuUrl = getQiniuUrl
    Vue.$qiniuUrl = getQiniuUrl
  },
  $qiniuUrl: getQiniuUrl
}

export const Log = {
  install (Vue) {
    Vue.prototype.log = log
    Vue.log = log
  },
  log: log
}

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

export function getBgStyle (uri, ratio = '3 : 2') {
  if (!uri) { return '' }
  return {
    height: 0,
    width: '100%',
    paddingBottom: getImgHeight(ratio),
    backgroundColor: '#eee',
    backgroundImage: `url(${getQiniuUrl(uri)})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}

export function getImgHeight (ratio = '3 : 2') {
  let height = ''
  if (/:/g.test(ratio)) {
    let w = +ratio.split(':')[0]
    let h = +ratio.split(':')[1]
    if (w > 0 && h > 0) { height = ~~(100 / w * h) + '%' }
  } else {
    height = ratio
  }
  return height
}

export function getRemoteImgSize (img) {
  return new Promise((resolve) => {
    img.onload = () => {
      let { width, height } = img
      resolve({ width, height })
    }
  })
}

export function getCacheImgSize (img) {
  return new Promise((resolve) => {
    let interVal = setInterval(() => {
      if (img.width > 0 || img.height > 0) {
        let { width, height } = img
        clearInterval(interVal)
        resolve({ width, height })
      }
    }, 40)
  })
}
