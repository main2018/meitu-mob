exports.js = () => {
  const CategoryEditor = require('admin/category-editor/category-editor')
  return {
    name: 'category',
    components: {
      CategoryEditor
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        category: '',
        categoryName: '',
        subcategory: '',
        currCategory: '',
        isEditorShow: false
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories
      }
    },

    watch: {
      categories () {
        if (!this.categories[0]) { return }
        this.currCategory = this.categories[0].category
      }
    },

    methods: {
      addCategory () {
        if (!this.category) { return }
        this.post('/category/add', {
          category: this.category,
          name: this.categoryName
        }, () => {
          window.alert('publish success')
          this.category = ''
          this.categoryName = ''
          this.$store.dispatch('getCategory')
        })
      },
      addSubcategory () {
        this.post('/subcategory/add', {
          category: this.currCategory,
          subcategory: this.subcategory
        }, () => {
          window.alert('publish success')
          this.subcategory = ''
          this.$store.dispatch('getCategory')
        })
      },
      showEditor () {
        this.$store.dispatch('showEditor')
      }
    },

    mounted () {
    }
  }
}
