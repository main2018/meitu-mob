exports.js = () => {
  return {
    name: 'category',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        categories: [],
        category: '',
        subcategory: '',
        currCategory: ''
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      getCategory () {
        this.get('/category/findAll', (resp) => {
          if (resp.success) {
            this.categories = resp.data
            this.currCategory = this.categories[0].category
          }
        })
      },
      addCategory () {
        if (!this.category) { return }
        this.post('/category/add', {
          category: this.category
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('publish success')
          this.category = ''
          this.getCategory()
        })
        this.emitClick()
      },
      addSubcategory () {
        this.post('/subcategory/add', {
          category: this.currCategory,
          subcategory: this.subcategory
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('publish success')
          this.subcategory = ''
          this.getCategory()
        })
        this.emitClick()
      },
      emitClick () {
        this.$emit('update')
      }
    },

    mounted () {
      this.getCategory()
    }
  }
}
