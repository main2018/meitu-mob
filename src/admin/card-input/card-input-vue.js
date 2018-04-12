exports.js = () => {
  const { qiniuUpload, qiniuDel } = require('common/js/qiniu-api.js')
  const { QINIU_URL_PREFIX } = require('config')
  const { setObjectPropToData } = require('common/js')
  return {
    name: 'card-input',
    components: {
    },

    created () {
    },

    props: {
      content: {
        type: Object,
        default: () => {}
      },
      title: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        http: QINIU_URL_PREFIX,
        card: {
          status: 0,
          cover: '',
          title: 'haha',
          desc: ''
        }
      }
    },

    computed: {
      coverStyle () {
        let cover = this.card.cover
        let pre = 'background-image: url('
        return cover ? `${pre}${this.http}${cover});` : ''
      }
    },

    watch: {
      content () {
        setObjectPropToData.call(this, 'content', 'card')
        this.getProps()
      }
    },

    methods: {
      getFiles (event) {
        this.$store.dispatch('setLoadingHint', 'upload...')
        let { cover } = this.card
        let file = event.target.files[0]
        cover && qiniuDel(cover)
        qiniuUpload(file, fname => {
          this.card.cover = fname
          this.$store.dispatch('hideLoading')
          this.changed()
        })
      },
      getProps () {
        let ob = {}
        for (let key in this.card) {
          ob[key] = this.card[key]
        }
        this.card = this.content
        for (let key in ob) {
          let hasKey = this.card.hasOwnProperty(key)
          if (!hasKey) { this.card[key] = ob[key] }
        }
      },
      dispatch () { this.$refs.file.click() },
      changed () { this.$emit('changed', this.card) }
    },

    mounted () {
    }
  }
}
