import axios from 'axios'
import { VUE_SERVER } from 'config'

const token = global.localStorage.getItem('token') || ''

export function post (url, json, succ, fail) {
  axios({
    method: 'POST',
    url: `${VUE_SERVER}${url}`,
    data: json,
    headers: {'x-access-token': token}
  })
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
  axios({
    method: 'GET',
    url: `${VUE_SERVER}${url}`,
    headers: {'x-access-token': token}
  })
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
    axios.get(`${VUE_SERVER}${path}`)
    .then(resp => resp.data.success && cb && cb(resp.data.data))
  },
  post (path, json, cb) {
    axios.post(`${VUE_SERVER}${path}`, json)
    .then(resp => resp.data.success && cb && cb(resp.data.data))
  }
}
