const { formConf } = require('config/form.js')
const { genTemplate, genModel } = require('./json2templ.js')

export const customform = {
  template: genTemplate(formConf),
  data () {
    return {
      postJson: genModel(formConf)
    }
  },
  methods: {
    test () {
      console.log(this.postJson)
    },
    publish (url) {
      let pass = true
      formConf.forEach((json) => {
        if (!json.required) { return }
        pass = pass && this.postJson[json.model]
      })
      if (!pass) {
        alert('info no complete')
        return
      }
      this.post(url, this.postJson, (resp) => {
        if (!resp.success) { return }
        for (let key in this.postJson) { this.postJson[key] = '' }
        alert('publish success')
      })
    }
  }
}

