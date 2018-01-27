<template lang="pug">
  .card
    img(
      :src="content.img"
      )
    h3(
      v-text="content.title"
      @click="goDetail"
      ) {content.title}
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
    goDetail () {
      if (!this.content.id) {
        alert('no detail')
        return
      }
      this.$router.push({
        path: '/detail',
        query: { id: this.content.id }
      })
    }
  },

  mounted () {
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import './card.styl'
</style>
