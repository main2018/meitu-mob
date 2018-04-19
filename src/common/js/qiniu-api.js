const qiniu = require('qiniu-js')
const nanoId = require('nano-id')
const { get } = require('common/js/ajax-axios')

export function qiniuUpload (file, succ, fail) {
  let config = {
    useCdnDomain: false,
    disableStatisticsReport: false,
    retryCount: 6,
    region: qiniu.region.z2
  }

  let putExtra = {
    fname: '',
    params: {},
    mimeType: null
  }

  get(`/qiniu/token`, (resp) => {
    let fileName = nanoId()
    let fileExtension = file.name.match(/\.\w*$/g)[0]
    let token = resp.token
    let key = fileName + fileExtension
    const observable = qiniu.upload(file, key, token, putExtra, config)

    var next = (res) => {}

    var error = (err) => {
      fail && fail(err)
    }

    var complete = (res) => {
      // res.key is fileName
      succ(res.key)
    }

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
