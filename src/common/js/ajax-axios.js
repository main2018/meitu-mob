import axios from 'axios'
import { VUE_SERVER } from 'config'

export function post (url, json, success, fail) {
  let token = global.localStorage.getItem('token') || ''
  axios({
    method: 'POST',
    url: `${VUE_SERVER}${url}`,
    data: json,
    headers: {'x-access-token': token}
  })
  .then((resp) => {
    // console.log('resp: ', resp.data)
    if (resp.data.success) {
      success && success(resp.data.data)
    } else {
      fail && fail(resp.data.msg)
    }
  })
  .catch(err => { console.log(err) })
}

export function get (url, success, fail) {
  let token = global.localStorage.getItem('token') || ''
  let path = `${VUE_SERVER}${url}`
  axios({ method: 'GET', url: path, headers: {'x-access-token': token} })
  .then((resp) => {
    if (resp.data.success) {
      success && success(resp.data.data)
    } else {
      fail && fail(resp.data.msg)
    }
  })
  .catch(err => { console.log(err) })
}

export const ajax = {
  get (path, cb) {
    let url = `${VUE_SERVER}${path}`
    axios.get(url).then((resp) => {
      if (resp.data.success) { cb(resp.data.data) }
    })
  },
  post (path, json, cb) {
    let url = `${VUE_SERVER}${path}`
    axios.post(url, json).then((resp) => {
      if (resp.data.success) { cb(resp.data.data) }
    })
  }
}
