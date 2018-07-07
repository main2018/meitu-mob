<template lang="pug">
  .inscribe
    .wrapper(:class="thinLine")
      .contact
        .line
        .title 联系我们
        .text TEL: 0898-8888 8888
        .text E-MAIL: DAMEI@FOXMAIL.COM
      .qrcode
        span.ch-zn 微信公众号:
        span &nbsp;
        img(:src="qrcode")
    .copyright
      span.text Copyright© Hainan Meitu Culture Communication Co,.Ltd. All RightSReserved
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
