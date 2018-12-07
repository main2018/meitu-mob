import axios from 'axios'
import {
  HEADER_KEY_PREFIX,
  SERVER_HTTP,
  CLIENT_HTTP,
  CODE
} from '../../../../config'

const headers = {}
export function post (url, json, succ, fail) {
  let config = genConf('POST', url, json)

  axios(config).then(resp => {
    let { success, data, msg } = resp.data
    if (success) {
      succ && succ(data, msg)
    } else {
      notExpired(resp) && fail && fail(msg)
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

function notExpired (resp) {
  let { code, msg } = resp.data
  if (code === CODE.EXPIRED) {
    alert(msg)
    global.localStorage.removeItem('token')
    window.location.href = `${CLIENT_HTTP}/admin`
    return false
  }
  return true
}

