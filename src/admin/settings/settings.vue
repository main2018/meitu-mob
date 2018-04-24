<template lang="pug">
  .settings
    admin-header(
      title="Site Settings"
      :btns="[showSubmit ? 'submit' : '', 'exit', 'close']"
      @submit="submit"
      @close="close"
      @exit="signout"
      )
    .content
      file-upload(
        :hint="'Logo'"
        :fname="logo"
        accept="image/*"
        @changed="getFiles"
      )

      span Website Title
      input.site-name(
        type="text"
        v-model="siteName"
        :placeholder="name"
        )

      br
      span Old password
      input.site-name(
        type="text"
        v-model="oldPassword"
        )
      br
      span New password
      input.site-name(
        type="text"
        v-model="oldPassword"
        )
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
