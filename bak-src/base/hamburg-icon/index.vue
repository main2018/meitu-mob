<template lang="pug">
.hamburg-icon(@click="toggle" :style="{color, padding}")
  .icon(:class="iconClass")
</template>

<script>
export default {
  name: 'hamburg-icon',

  props: {
    color: {
      type: String,
      default: 'grey'
    },
    size: {
      type: Number,
      default: 40
    }
  },

  data () {
    return {
      iconClass: 'menu'
    }
  },

  computed: {
    padding () {
      const padding = (this.size - 22) / 2
      return padding + 'px'
    }
  },

  methods: {
    toggle () {
      let isMenu = this.iconClass === 'menu'
      this.iconClass = isMenu ? 'close' : 'menu'
      this.$emit('toggle', isMenu)
    },
    show (icon) { this.iconClass = 'menu' },
    hide (icon) { this.iconClass = 'close' }
  }
}
</script>

<style lang="stylus" scoped>
.hamburg-icon
  height 22px
  width 22px
.icon, .icon i
  box-sizing content-box
  position absolute

.icon, .icon:after, .icon:before, .icon i, .icon i:after, .icon i:before
  transition all .4s ease

.icon:after, .icon:before, .icon i:after, .icon i:before
  box-sizing content-box
  content ""
  position absolute

.menu.icon, .menu.icon:after, .menu.icon:before
  width 17px
  height 1px
  background-color currentColor

.menu
  &.icon
    margin-left 2px
    margin-top 10px
    &:before
      top -5px
    &:after
      top 5px

.menu.icon:after, .menu.icon:before
  left 0

.close
  &.icon
    &:before
      -webkit-transform rotate(-45deg)
      transform rotate(-45deg)
    &:after
      -webkit-transform rotate(45deg)
      transform rotate(45deg)

.close.icon:after, .close.icon:before
  top 10px
  width 21px
  height 1px
  background-color currentColor
</style>
