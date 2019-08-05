<template lang="pug">
  .dialog-wrapper(v-show="show")
    .dialog
      .title.bd-1px-b {{title}}
      .content
        slot
      .footer
        .btn
          input.cancel(
            type="button"
            value="✘ cancel"
            @click="$emit('cancel')"
          )
        .btn
          input.submit(
            type="button"
            value="✔ submit"
            @click="$emit('submit')"
            :disabled="disabled"
            :class="disabled ? 'normal-disable' : 'submit-active'"
            )
</template>

<script type="text/ecmascript-6">
  import { js } from './dialog-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './dialog.styl'
</style>
