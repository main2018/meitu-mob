exports.js = () => {
  const { qiniuUpload, qiniuDel } = require('common/js/qiniu-api.js')
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
        card: { status: 0, isCommend: false, cover: '', title: '', desc: '' }
      }
    },

    computed: {
      coverStyle () {
        let cover = this.$qiniuUrl(this.card.cover)
        let pre = 'background-image: url('
        return cover ? `${pre}${cover});` : ''
      },
      activeCategory () { return this.$store.getters.activeCategory },
      hasArticle () { return this.$store.getters.hasArticle },
      hasLink () { return this.$store.getters.hasLink },
      hasVideo () { return this.$store.getters.hasVideo }
    },

    watch: {
      content () {
        setObjectPropToData.call(this, 'content', 'card')
        this.getProps()
      }
    },

    methods: {
      clean () {
        this.card = { status: 0, isCommend: false, cover: '', title: '', desc: '' }
        this.changed()
      },
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
      changed () { this.$emit('changed', this.card) },
      checked (type) {
        let category = this.$store.getters.activeCategory[0]
        let json = { category }
        json[`has${type}`] = !this[`has${type}`]
        this.post('/category/updateType', json, () => {
          this.$store.dispatch('getCategory', this.activeCategory)
        })
      }
    },

    mounted () {
    }
  }
}
