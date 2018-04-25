import axios from 'axios'
import {
  HEADER_KEY_PREFIX,
  SERVER_HTTP,
  CLIENT_HTTP,
  CODE
} from '../../../../config'

const headers = {}
export function post (url, json, succ, fail) {
  axios(genConf('POST', url, json))
  .then(resp => {
    if (resp.data.success) {
      succ && genSucc(succ, resp)
    } else {
      notExpired(resp) && fail && fail(resp.data.msg)
    }
  })
  .catch(err => { console.log('ajax-axios POST: ', err) })
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
  .catch(err => { console.log('ajax-axios GET: ', err) })
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

function genConf (method, path, data) {
  const url = `${SERVER_HTTP}${path}`
  const account = global.localStorage.getItem('account') || ''
  const accountKey = `${HEADER_KEY_PREFIX}account`
  const token = global.localStorage.getItem('token') || ''
  const tokenKey = `${HEADER_KEY_PREFIX}token`

  headers[accountKey] = account
  headers[tokenKey] = token
  // console.log({ url })
  let config = { method, headers, url }
  if (data) { config.data = data }
  return config
}

function genSucc (succFn, resp) {
  const arr = Object.keys(resp.data.data)
  const isDateEmpty = arr.length === 0
  if (isDateEmpty) {
    return succFn(resp.data.msg)
  }
  return succFn(resp.data.data, resp.data.msg)
}

function notExpired (resp) {
  if (resp.data.code === CODE.EXPIRED) {
    alert(resp.data.msg)
    global.localStorage.removeItem('token')
    window.location.href = `${CLIENT_HTTP}/admin`
    return false
  }
  return true
}

