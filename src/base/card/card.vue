<template lang="pug">
  .card
    img(:src="content.img")
    h3(v-text="content.title") {content.title}
    time(v-text="content.time")
</template>

<script>
export default {
  name: 'card',
  components: {
  },

  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
    }
  },

  computed: {
  },

  watch: {
  },

  methods: {
  },

  mounted () {
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import './card.styl'
</style>
