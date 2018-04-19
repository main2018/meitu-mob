<template lang="pug">
  .signin
    input(type="text" v-model="username")
    input(type="button" value="up" @click="signup")
    input(type="text" v-model="password")
    input(type="button" value="in" @click="signin")
    br
    input(type="button" value="out" @click="signout")
</template>

<script type="text/ecmascript-6">
  import { js } from './signin-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './signin.styl'
  input
    background: none
</style>
