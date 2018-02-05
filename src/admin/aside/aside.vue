<template lang="pug">
  .aside
    ul.category
      li.bd-1px-b(
        v-for="(parent, index) in categories")
        .first(
          :ref="'' + index"
          @mouseenter="addBtn('' + index)"
          @mouseleave="delBtn('' + index)"
          )
          .text(
            @click="emit([ parent.category ])"
            ) {{parent.category}}
          .btn.mdi.mdi-minus(
            @click="delCategory(parent.category, index)"
            )
        ol.subcategory
          li.bd-1px-t(
            v-for="(subcategory, subIndex) in parent.subcategories")
            .second(
              :ref="index + subPrefix + subIndex"
              @mouseenter="addBtn(index + subPrefix + subIndex)"
              @mouseleave="delBtn(index + subPrefix + subIndex)"
              )
              .text(
                @click="emit([ parent.category, subcategory ])"
                ) {{subcategory}}
              .btn.mdi.mdi-minus(
                @click="delSubcategory(parent.category, subcategory)"
                )

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
