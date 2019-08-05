<template lang='pug'>
  .sortable.list-group.tu-need-scroll(:class="className"): slot
</template>

<script>
  export default {
    name: 'sortable',
    props: {
      className: {
        type: String,
        default: 'sortable-class'
      },
      handle: {
        type: String,
        default: '.handle'
      }
    },
    data () {
      return {

      }
    },
    methods: {
      onload () {
        return new Promise((resolve, reject) => {
          if (window.Sortable) { resolve() }
          const script = document.createElement('script')
          script.src = '/static/js/sortable.js'
          document.body.append(script)
          script.onload = () => { resolve() }
        })
      },
      init () {
        document.oncontextmenu = (e) => { e.preventDefault() }
        const dragDom = document.querySelector(`.${this.className}`)
        const config = {
          animation: 150,
          draggable: '.tu-sortable-item',
          handle: this.handle,
          onStart: this.dragStart, // 拖拽中事件
          onEnd: this.dragEnd      // 拖拽后事件
        }
        window.Sortable.create(dragDom, config)
      },
      dragStart (ev) {
        ev.item.classList.add('sortable-active')
      },
      dragEnd (ev) {
        ev.item.classList.remove('sortable-active')
        let { oldIndex, newIndex } = ev
        this.$emit('change', oldIndex, newIndex)
      }
    },
    mounted () {
      this.onload().then(() => {
        this.init()
      })
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  .sortable
    padding 0 1px
    height 100%
    overflow-y auto
    -webkit-overflow-scrolling: touch;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  .sortable-active
    filter opacity(.1)

</style>
