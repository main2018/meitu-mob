exports.js = () => {
  return {
    name: 'aside-vue',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        category: '',
        subcategory: '',
        currCategory: {},
        categories: [],
        subcategories: []
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      getCategory () {
        this.get('/category/findAll', (resp) => {
          if (!resp.success) { return }
          this.categories = resp.data
          this.currCategory = this.categories[0].category
          console.log(this.categories)
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
      }
    },

    mounted () {
      this.getCategory()
    }
  }
}
