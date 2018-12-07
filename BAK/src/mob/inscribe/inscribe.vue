<template lang="pug">
  .inscribe
    .wrapper(:class="thinLine")
      .contact
        .text TEL: 0898-8888 8888
        .text E-MAIL: DAMEI@FOXMAIL.COM
        .copyright
          .line
          span.text Copyright© 2017 foto inc.
          span.ch-zn 保留所有权利.
      .qrcode
        span.ch-zn 微信公众号:
        span &nbsp;
        img(:src="qrcode")
</template>

<script>
const { CLIENT_HTTP } = require('../../../../config')
export default {
  name: 'inscribe',
  components: {
  },

  props: {
  },

  data () {
    return {
    }
  },

  computed: {
    qrcode () {
      return `${CLIENT_HTTP}/static/qrcode.png`
    },
    url () {
      return this.$route.path
    },
    thinLine () {
      return this.url === '/' ? '' : 'bd-1px-t'
    }
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
