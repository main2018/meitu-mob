<template lang="pug">
  .admin-header
    .title {{title}}
    .btn-wrapper
      .btn(
        @click="$emit('add')"
        v-show="btns.includes('add')"
        )
        .mdi.mdi-plus
      .btn(
        @click="$emit('submit')"
        v-show="btns.includes('submit')"
        )
        .mdi.mdi-check
      .btn(
        @click="$emit('reset')"
        v-show="btns.includes('reset')"
        )
        .mdi.mdi-replay
      .btn(
        @click="$emit('cancel')"
        v-show="btns.includes('cancel')"
        )
        .mdi.mdi-cancel
      .btn(
        v-show="btns.includes('close')"
        @click="$emit('close')"
        )
        .mdi.mdi-close
</template>

<script type="text/ecmascript-6">
  import { js } from './admin-header-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './admin-header.styl'
</style>
