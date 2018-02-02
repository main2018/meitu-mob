exports.js = () => {
  return {
    name: 'admin',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        username: '',
        password: '',
        isLogin: false,
        album: {
          category: '',
          subcategory: '',
          title: '',
          text: ''
        },
        categories: [],
        category: '',
        currCategory: '',
        subcategory: ''
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      test () {
        this.post('/user/login', {
          username: this.username
        }, (resp) => {
          if (resp.success) {
            window.localStorage.setItem('isLogin', true)
            this.isLogin = true
          }
        }, (err) => {
          window.alert(err)
        })
      },
      signout () {
        console.log('hi')
        window.localStorage.setItem('isLogin', false)
        this.isLogin = false
      },
      getCategory () {
        this.get('/category/findAll', (resp) => {
          if (resp.success) {
            this.categories = []
            resp.data.forEach((item) => {
              this.categories.push(item.category)
            })
            this.currCategory = this.categories[0]
          }
        })
      },
      addCategory () {
        this.post('/category/add', {
          category: this.category
        }, (resp) => {
          if (resp.success) {
            window.alert('publish success')
            this.category = ''
            this.getCategory()
          }
        }, (err) => {
          window.alert(err)
        })
      },
      addSubcategory () {
        this.post('/subcategory/add', {
          category: this.currCategory,
          subcategory: this.subcategory
        }, (resp) => {
          if (resp.success) {
            window.alert('publish success')
            this.subcategory = ''
          }
        }, (err) => {
          window.alert(err)
        })
      },
      addAlbum () {
        this.post('/album/add', this.album, (resp) => {
          if (resp.success) {
            window.alert('publish success')
            this.clearPostJson()
          }
        }, (err) => {
          window.alert(err)
        })
      },
      clearPostJson () {
        for (let key in this.album) {
          this.album[key] = ''
        }
      }
    },

    mounted () {
      this.isLogin = window.localStorage.getItem('isLogin')
      this.getCategory()
    }
  }
}
