<template lang="pug">
  .aside
    .category-editor
      category
    signin
    ul.category-wrapper
      li.category.bd-1px-b(v-for="(item, idx) in categories")

        div.first(:ref="'' + idx"
          @mouseenter="bundleBtn('' + idx)"
          @mouseleave="delBtn('' + idx)"
          )
          .active(v-show="actives[idx].category")
          .text(
            @keydown.13="enter($event)"
            @click="setActive([item.category], idx)"
            ) {{item.name || item.category}}
          // .btn.mdi.mdi-minus( @click="delCategory(item.category, idx)")

        ol.subcategory
          li.bd-1px-t(v-for="(subcategory, _idx) in item.subcategories")
            .second(:ref="`${idx}_${_idx}`"
              @mouseenter="bundleBtn(`${idx}_${_idx}`)"
              @mouseleave="delBtn(`${idx}_${_idx}`)"
              )
              .active(v-show="actives[idx].subcategories[_idx]")
              .text(
                @input="enterKey($event)"
                @click="setActive([item.category, subcategory], idx, _idx)"
                ) {{subcategory}}
              .btn.mdi.mdi-minus(@click="delSubcategory(item.category, subcategory)")

</template>

<script type="text/ecmascript-6">
  import { js } from './aside-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './aside.styl'
</style>
