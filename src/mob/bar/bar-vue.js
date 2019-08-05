const { default: debounce } = require('common/js/throttle-debounce/debounce')
const { Searcher } = require('common/js')

const HamburgIcon = require('base/hamburg-icon')
exports.js = () => {
  return {
    name: 'mob-bar',
    components: { HamburgIcon },

    data () {
      return {
        menuShow: false,
        query: '',
        searchRes: []
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories.filter((item) => {
          return item.status === 0
        })
      },
      url () { return this.$route.path },
      logo () {
        let logo = this.$store.getters.settings.logo
        return logo ? this.$http + logo : ''
      },
      albums () {
        const albumsObj = this.$store.getters.albums || {}
        let albums = []
        for (let key in albumsObj) {
          const list = (albumsObj[key] && albumsObj[key].category) || []
          albums = albums.concat(list)
        }
        return albums
      }
    },

    watch: {
    },

    methods: {
      input: debounce(300, function (e) {
        const query = e.target.value

        if (query) this.search(query)
        else this.searchRes = []
      }),
      change (query) {
        const datalist = this.searchRes || []
        if (!datalist.includes(query)) return
        this.toArticleDetail(query)
        this.toggle()
      },
      search (query) {
        const articles = this.albums || []
        const titles = articles.map(article => article.title)
        const res = Searcher.search(titles, query)
        // const res = articles.filter(article => article.title.includes(query))
        this.searchRes = res.slice(0, 10)
      },
      toArticleDetail (query) {
        const article = this.albums.find(article => article.title === query) || {}

        const { category, id } = article || {}

        const currCategory = this.categories.find(item => item.category === category)

        this.$store.dispatch('getCurrAlbum', id).then(res => {
          this.$router.push({
            path: `/${currCategory.route}/detail`,
            query: { id }
          })
        })
        // this.$router.push(`/article-detail/${article && article.id}`)
      },
      toggle () { this.menuShow = !this.menuShow },
      hideMenu () {
        this.menuShow = false
      },
      go (path) {
        this.$router.push(`${path}`)
        this.toggle()
      },
      goHome () {
        this.$router.push(`/`)
        this.menuShow = false
      },
      isHintShow (category) {
        let isCurrCateory = new RegExp(`/${category}`)
        return isCurrCateory.test(this.url)
      }
    },
    created () {
    }
  }
}
