import { post, get, ajax } from './ajax-axios'
import { getLocalStore, setLocalStore } from './localStorage'
import { log } from './logger'
import { postForm } from './axios-file'

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

export const PostForm = {
  install (Vue) {
    Vue.prototype.postForm = postForm
    Vue.postForm = postForm
  },
  postForm: postForm
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
