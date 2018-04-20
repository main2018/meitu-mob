import axios from 'axios'
import { VUE_SERVER } from 'config'
import { HEADER_KEY_PREFIX } from '../../../../config'

const account = global.localStorage.getItem('account') || ''
const token = global.localStorage.getItem('token') || ''

function genConf (method, path, data) {
  let url = `${VUE_SERVER}${path}`
  let accountKey = `${HEADER_KEY_PREFIX}account`
  let tokenKey = `${HEADER_KEY_PREFIX}token`
  let headers = {}
  headers[accountKey] = account
  headers[tokenKey] = token
  let config = { method, headers, url }
  if (data) { config.data = data }
  console.dir({ config })
  return config
}

export function post (url, json, succ, fail) {
  axios(genConf('POST', url, json))
  .then(resp => {
    if (resp.data.success) {
      succ && succ(resp.data.data)
    } else {
      fail && fail(resp.data.msg)
    }
  })
  .catch(err => { console.log(err) })
}

export function get (url, succ, fail) {
  axios(genConf('GET', url))
  .then(resp => {
    if (resp.data.success) {
      succ && succ(resp.data.data)
    } else {
      fail && fail(resp.data.msg)
    }
  })
  .catch(err => { console.log(err) })
}

export const ajax = {
  get (path, cb) {
    axios(genConf('GET', path))
    .then(resp => resp.data.success && cb && cb(resp.data.data))
  },
  post (path, json, cb) {
    axios(genConf('POST', path, json))
    .then(resp => resp.data.success && cb && cb(resp.data.data))
  }
}
