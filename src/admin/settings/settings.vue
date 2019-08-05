<template lang="pug">
  .settings
    admin-header(
      title="Site Settings"
      :btns="[showSubmit ? 'submit' : '', 'close']"
      @submit="siteUpdate"
      @close="close"
      )
    .content
      .site-logo.bd-1px-r
        file-upload(
          :hint="'Logo'"
          :fname="logo"
          accept="image/*"
          @changed="getFiles"
        )

      .site-input.bd-1px-r
        p Website Title
        input.input.site-name(
          type="text"
          v-model="siteName"
          :placeholder="name"
          )

        // input.submit(
          type="button"
          @click="submit"
          value="save"
          )
      .site-operate.bd-1px-r(@click="dialogOpen")
        span passwd
        .mdi.mdi-36px.mdi-key
      .site-operate(@click="signout")
        span signout
        .mdi.mdi-36px.mdi-export
      admin-dialog(
        :show="isDialogShow"
        title="Modify password"
        @cancel="dialogClose"
        @submit="dialogUpdate"
        :disabled="dialogDisabled"
        )
        .item.old
          .label Old passwd
          input.input(type="text" v-model="oldPassword")
        .item.new
          .label New passwd
          input.input(type="text" v-model="newPassword")
</template>

<script type="text/ecmascript-6">
  import { js } from './settings-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './settings.styl'
</style>
