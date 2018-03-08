exports.js = () => {
  const { _2space } = require('common/js/index.js')
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
        isEditorShow: true
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
      _2space,
      addCategory () {
        if (!this.category) { return }
        this.post('/category/add', {
          category: this.category,
          name: this.categoryName
        }, (resp) => {
          if (!resp.success) { return }
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
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('publish success')
          this.subcategory = ''
          this.$store.dispatch('getCategory')
        })
      },
      showEditor () {
        this.isEditorShow = true
      },
      hideEditor () {
        this.isEditorShow = false
      }
    },

    mounted () {
    }
  }
}
