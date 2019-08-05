<template lang=pug>
  .tinymce: editor(:id='id' v-model='tinymceHtml' :init='editorInit')
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
  name: 'tinymce',
  components: {Editor},
  watch: {
    tinymceHtml () { this.$emit('input', this.tinymceHtml) },
    html () { this.tinymceHtml = this.html || '' }
  },
  props: {
    id: [String],
    html: { type: String, default: '' },
    index: [String, Number]
  },
  data () {
    return {
      tinymceHtml: '请输入内容',
      editorInit: {
        // selector: '#container',
        language_url: '/static/tinymce/zh_CN.js',
        language: 'en_EN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 400,
        plugins: 'lists image imagetools wordcount',
        object_resizing: false,
        image_caption: true,
        // image_advtab: true,
        file_browser_callback_types: 'image',
        file_picker_types: 'image media',
        images_upload_handler: this.uploadImage,
        file_picker_callback: this.livePreview
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  created () {
    if (this.html) this.tinymceHtml = this.html
  },
  methods: {
    uploadImage (blobInfo, success, failure) {
      const img = blobInfo.base64()
      console.log(img)
      // success(img)
    },
    livePreview (cb, value, meta) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      let acceptObj = { image: 'image/*' }
      let multiple = document.createAttribute('multiple')
      input.setAttributeNode(multiple)
      let filetype = meta.filetype
      input.setAttribute('accept', acceptObj[filetype])
      input.onchange = () => {
        console.log('input onchange')
        var file = input.files[0]
        var reader = new FileReader()
        reader.onload = () => {
          // editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
          var id = 'blobid' + (new Date()).getTime()
          var blobCache = tinymce.activeEditor.editorUpload.blobCache
          var base64 = reader.result.split(',')[1]
          var blobInfo = blobCache.create(id, file, base64)
          blobCache.add(blobInfo)
          cb(blobInfo.blobUri(), { title: file.name })
        }
        reader.readAsDataURL(file)
      }
      input.click()
    }
  }
}
</script>
