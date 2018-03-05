exports.js = () => {
  const Card = require('base/card/card')
  const Tab = require('base/tab-slot/tab-slot')
  return {
    name: 'dynamic',
    components: {
      Card,
      Tab
    },

    created () { this.setMenu() },

    data () {
      return {
        menu: [],
        photos: []
      }
    },

    computed: {
      path () { return this.$route.path },
      categories () { return this.$store.getters.categories }
    },

    watch: {
      path () { this.setMenu() }
    },

    methods: {
      setMenu () {
        this.menu = []
        this.categories.forEach((item) => {
          if (`/${item.category}` === this.path) {
            item.subcategories.forEach((subItem) => {
              this.menu.push(subItem)
            })
          }
        })
      }
    },

    mounted () {
      console.log(this.path, this.categories)
      this.post('/album/findByCategory', {category: 'one'}, (resp) => {
        // console.log(resp)
      })
      let album = this.$store.getters.photos
      for (let key in album) {
        this.photos.push(album[key])
      }
    }
  }
}
