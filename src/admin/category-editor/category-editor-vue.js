exports.js = () => {
  return {
    name: 'category-editor',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        status: []
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      canDel () {
        let canDel = []
        this.$store.getters.categories.forEach((category) => {
          let length = category.subcategories.length
          canDel.push(length)
        })
        return canDel
      }
    },

    watch: {
    },

    methods: {
      close () {
        this.$emit('close')
      },
      edit (idx) {
        this.initStatus()
        this.status.splice(idx, 1, true)
      },
      cancel (idx) {
        console.log(idx)
        this.status.splice(idx, 1, false)
        console.log(this.status)
      },
      initStatus () {
        this.status = []
        this.categories.forEach(() => {
          this.status.push(false)
        })
      }
    },

    mounted () {
    }
  }
}
