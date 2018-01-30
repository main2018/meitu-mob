<template lang="pug">
  .inscribe(
    v-show="show"
    )
    .wrapper.bd-1px-t
      .contact
        .text TEL: 0898-8888 8888
        .text E-MAIL: DAMEI@FOXMAIL.COM
        .copyright
          .line
          .text Copyright© 2017 foto inc.
      .qrcode
        span.text wechat:
        span &nbsp;
        img(:src="qrcode")
</template>

<script>
export default {
  name: 'inscribe',
  components: {
  },

  props: {
    show: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
    }
  },

  computed: {
    qrcode () {
      return 'http://192.168.0.106:8000/static/qrcode.png'
    }
    /*
    thinLine () {
      return this.theme === 'dark' ? '' : 'bd-1px-t'
    }
      */
  },

  watch: {
  },

  methods: {
  },

  mounted () {
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './inscribe.styl'
</style>
