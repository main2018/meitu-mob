const qiniu = require('qiniu-js')
const nanoId = require('nano-id')
const { get } = require('common/js/ajax-axios')
const { QINIU_URL_PREFIX } = require('../../../../config')

export async function qiniuUploads (files, succ, fail) {
  let filenames = await Promise.all(
    files.map(file => qnUpload(file))
  )
  return Promise.resolve(filenames)
}

export function qnUpload (file) {
  return new Promise((resolve, reject) => {
    let config = {
      useCdnDomain: false,
      disableStatisticsReport: false,
      retryCount: 6,
      region: qiniu.region.z2
    }

    let putExtra = { fname: '', params: {}, mimeType: null }

    get(`/qiniu/token`, (resp) => {
      let fileName = nanoId()
      let fileExtension = file.name.match(/\.\w*$/g)[0]
      let token = resp.token
      let key = fileName + fileExtension
      const observable = qiniu.upload(file, key, token, putExtra, config)

      var next = (res) => {}
      var error = (err) => { reject(err) }
      var complete = (res) => { resolve(res.key) } // res.key is fileName
      observable.subscribe({ next, error, complete })
    })
  })
}

export function qiniuUpload (file, succ, fail) {
  let config = {
    useCdnDomain: false,
    disableStatisticsReport: false,
    retryCount: 6,
    region: qiniu.region.z2
  }

  let putExtra = { fname: '', params: {}, mimeType: null }

  get(`/qiniu/token`, (resp) => {
    let fileName = nanoId()
    let fileExtension = file.name.match(/\.\w*$/g)[0]
    let token = resp.token
    let key = fileName + fileExtension
    const observable = qiniu.upload(file, key, token, putExtra, config)

    var next = (res) => {}
    var error = (err) => { fail && fail(err) }
    var complete = (res) => { succ(res.key) } // res.key is fileName
    observable.subscribe({ next, error, complete })
  })
}

export function qiniuDel (fname, succ, fail) {
  get(`/qiniu/del/${fname}`, resp => {
    succ && succ(resp)
  }, err => {
    fail && fail(err)
  })
}

export function getQiniuUrl (fname, isMob) {
  if (!fname) { return '' }
  const url = `${QINIU_URL_PREFIX}${fname}`
  return url + (isMob ? `?imageView2/2/w/800` : '')
}

export function getQiniuPosterUrl (fname) {
  if (!fname) { return '' }
  let query = '?vframe/jpg/offset/1/w/640/h/360'
  return `${QINIU_URL_PREFIX}${fname}${query}`
}

/*
 * useage
 * /
 *
  const { qiniuUpload } = require('common/js/qiniu-upload.js')

  let file = event.target.files[0]
  qiniuUpload(file, (fname) => {
    console.log(fname)
  })

  */
