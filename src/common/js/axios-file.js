import axios from 'axios'
import { VUE_SERVER } from 'config'

export function postForm (url, json, success, fail, contentType = 'FORM') {
  if (!json.account) json.account = global.localStorage.getItem('account') || ''
  if (!json.token) json.token = global.localStorage.getItem('token') || ''

  let formData = new FormData()

  for (let key in json) {
    if (key === 'files') {
      appendFiles(formData, json.files)
    } else {
      formData.append(key, json[key])
    }
  }

  let config = {headers: { 'ContentType': 'multipart/form-data' }}
  axios.post(`${VUE_SERVER}${url}`, formData, config)
  .then((resp) => {
    if (resp.data.success) {
      success(resp.data.data)
    } else if (fail) {
      fail(resp.data.errmsg)
    }
  })
  .catch(function (err) {
    console.log(err)
  })
}

function appendFiles (formData, files) {
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i])
  }
}
