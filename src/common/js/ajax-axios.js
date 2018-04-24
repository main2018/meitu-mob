import axios from 'axios'
import {
  HEADER_KEY_PREFIX,
  SERVER_HTTP,
  CLIENT_HTTP,
  CODE
} from '../../../../config'

function genConf (method, path, data) {
  const account = global.localStorage.getItem('account') || ''
  const token = global.localStorage.getItem('token') || ''
  const url = `${SERVER_HTTP}${path}`
  const accountKey = `${HEADER_KEY_PREFIX}account`
  const tokenKey = `${HEADER_KEY_PREFIX}token`
  const headers = {}

  headers[accountKey] = account
  headers[tokenKey] = token
  // console.log({ url })
  let config = { method, headers, url }
  if (data) { config.data = data }
  return config
}

export function post (url, json, succ, fail) {
  axios(genConf('POST', url, json))
  .then(resp => {
    if (resp.data.success) {
      succ && succ(resp.data.data)
    } else {
      if (resp.data.code === CODE.EXPIRED) {
        alert(resp.data.msg)
        global.localStorage.removeItem('token')
        window.location.href = `${CLIENT_HTTP}/admin`
      }
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

/*
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
*/
