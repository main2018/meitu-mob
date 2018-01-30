<template lang="pug">
  .admin
    .login(v-if="!isLogin")
      input(type="text" v-model="username")
      input(type="password" v-model="password")
      br
      input(
        type="submit"
        value="submit"
        @click="test"
        )
</template>

<script type="text/ecmascript-6">
  import { js } from './admin-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './admin.styl'
</style>
