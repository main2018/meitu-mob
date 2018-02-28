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
  computed: {
    category () {
      console.log(this.$store.getters)
      return this.$store.getters.categories
    }
  },

  methods: {
    test () {
      console.log(this.getCategory())
      // console.log(this.postJson)
    },
    publish,
    getCategory,
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

function getCategory () {
  let activeCategory = this.$store.getters.activeCategory
  return {
    category: activeCategory[0],
    subcategory: activeCategory[1]
  }
}

function publish (url) {
  let pass = true
  let category = this.getCategory()
  formConf.forEach(json => {
    if (!json.required) { return }
    pass = pass && this.postJson[json.model]
  })
  if (!pass) { return alert('info no complete') }

  for (let key in category) {
    if (category[key]) { this.postJson[key] = category[key] }
  } // add category

  for (let key in this.postJson) {
    this.formData.set(key, this.postJson[key])
  } // construct formData

  for (let key in category) {
    if (!category[key]) { this.formData.delete(key) }
  } // move blank category

  axios.post(VUE_SERVER + url, this.formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((resp) => {
    if (resp.data.success) {
      // for (let key in this.postJson) { this.postJson[key] = '' }
      // alert('publish success')
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

