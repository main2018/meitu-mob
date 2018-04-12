<template lang="pug">
  .card-input
    .input-cover
      .upload(@click="dispatch")
        .mdi.mdi-upload cover
      .preview(:style="coverStyle")
    .input-list
      ul.input-item
        li
          label * title
          input(type="text" @change="changed" v-model="card.title")
        li
          label * desc
          textarea(@change="changed" v-model="card.desc")
      .input-options
        span.hint status
        span.radio
          label online &nbsp;
            input(
              type="radio"
              name="status"
              checked="checked"
              value="0"
              v-model="card.status"
              @change="changed"
              )
          label outline &nbsp;
            input(
              type="radio"
              name="status"
              value="1"
              v-model="card.status"
              @change="changed"
              )

    input(
      ref="file"
      type="file"
      accept="image/*"
      @change="getFiles($event)"
      style="display: none; z-index: -1;"
        )
</template>

<script type="text/ecmascript-6">
  import { js } from './card-input-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './card-input.styl'
</style>
