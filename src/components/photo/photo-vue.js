exports.js = () => {
  const Card = require('base/card/card')
  const Tab = require('base/tab-slot/tab-slot')
  return {
    name: 'photo',
    components: {
      Card,
      Tab
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        menu: [],
        photos: []
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
    },

    mounted () {
      this.post('/album/findByCategory', {category: 'one'}, (resp) => {
        console.log(resp)
      })
      let album = this.$store.getters.photos
      for (let key in album) {
        this.menu.push(key)
        this.photos.push(album[key])
      }
    }
  }
}
