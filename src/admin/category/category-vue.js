exports.js = () => {
  const { _2space } = require('common/js/index.js')
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
        category: '',
        subcategory: '',
        currCategory: ''
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories
      }
    },

    watch: {
      categories () {
        this.currCategory = this.categories[0].category
      }
    },

    methods: {
      _2space,
      addCategory () {
        if (!this.category) { return }
        this.post('/category/add', {
          category: this.category
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('publish success')
          this.category = ''
          this.$store.dispatch('getCategory')
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
          this.$store.dispatch('getCategory')
        })
      }
    },

    mounted () {
    }
  }
}
