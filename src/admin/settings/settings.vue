<template lang="pug">
  .settings
    admin-header(
      title="Site Settings"
      :btns="['submit', 'close']"
      @submit="submit"
      @close="$emit('close')"
      )
    .content
      img-upload(
        :hint="'Logo'"
        :images="images"
        @change="getFiles"
      )
      span Title

      input.site-name(
        type="text"
        v-model="siteName"
        :placeholder="name"
        )
      br
      // input.submit(
        type="button"
        @click="submit"
        value="save"
        )
</template>

<script type="text/ecmascript-6">
  import { js } from './settings-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './settings.styl'
</style>
