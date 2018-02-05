exports.js = () => {
  const Category = require('admin/category/category')
  return {
    name: 'aside-vue',
    components: {
      Category
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        categories: []
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      getCategory () {
        console.log('update')
        this.get('/category/findAll', (resp) => {
          if (resp.success) {
            this.categories = resp.data
          }
        })
      },
      getSubategory () {
        this.get('/subcategory/findAll', (resp) => {
          if (resp.success) {
            this.categories = []
            resp.data.forEach((item) => {
              this.categories.push(item.category)
            })
            console.log(this.categories)
          }
        })
      }
    },

    mounted () {
      this.getCategory()
    }
  }
}
