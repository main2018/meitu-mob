const { formConf } = require('config/form.js')
const { genTemplate, genModel } = require('./json2templ.js')
const axios = require('axios')
const { VUE_SERVER } = require('config')

export const customform = {
  template: genTemplate(formConf),
  created () {
    this.formData = new FormData()
  },
  data () {
    return {
      postJson: genModel(formConf)
    }
  },
  methods: {
    test () {
      console.log(this.postJson)
    },
    publish,
    getFile
  }
}

function getFile (event) {
  let files = event.target.files
  let key = event.target.name
  for (let i = 0; i < files.length; i++) {
    this.formData.append(key, files[i])
  }
}

function publish (url) {
  let pass = true
  formConf.forEach((json) => {
    if (!json.required) { return }
    pass = pass && this.postJson[json.model]
  })
  if (!pass) { return alert('info no complete') }
  for (let key in this.postJson) {
    this.formData.append(key, this.postJson[key])
  }
  axios.post(VUE_SERVER + url, this.formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((resp) => {
    if (resp.data.success) {
      for (let key in this.postJson) { this.postJson[key] = '' }
      alert('publish success')
    }
  })
  /*
  this.post(url, this.formData, (resp) => {
    if (!resp.success) { return }
    for (let key in this.postJson) { this.postJson[key] = '' }
    alert('publish success')
  })
  */
}

