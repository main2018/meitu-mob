<template lang="pug">
  .aside
    ul.category
      li.bd-1px-b(v-for="item in categories")
        .first
          .text(@click="emit([ item.category ])") {{item.category}}
          .btn -
        ol.subcategory
          li.bd-1px-t(v-for="subcategory in item.subcategories")
            .second
              .text(
                @click="emit([ item.category, subcategory ])"
                ) {{subcategory}}
              .btn -

    category(@update="getCategory")
</template>

<script type="text/ecmascript-6">
  import { js } from './aside-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './aside.styl'
</style>
