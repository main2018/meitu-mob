exports.js = () => {
  return {
    name: 'tab',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        index: 0,
        contentLeft: 0,
        list: [1, 2, 3],
        content: ['one', 'two', 'three']
      }
    },

    watch: {
    },

    methods: {
      tap (index) {
        this.index = index
        this.contentLeft = index * window.innerWidth
        // console.log(this.dom.clientWidth)
      },
      touchstart () {
        console.log('touchstart')
      },
      touchmove () {
        console.log('touchmove')
      },
      touchend () {
        console.log('touchend')
      }
    },

    computed: {
      volid () { return this.list.length === this.content.length },
      count () { return this.list.length },
      dom () { return this.$refs.content },
      contentStyle () {
        return `margin-left:-${this.contentLeft}px`
      },
      colorStyle () {
        let left = `${this.index * 100 / this.count}%`
        let width = `width: ${100 / this.count}%`
        return `${width};margin-left:${left}`
      }
    },

    mounted () {
      let width = `${this.count * 100}%`
      this.dom.style.width = width
    }
  }
}
