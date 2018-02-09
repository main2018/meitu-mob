<template lang="pug">
  ul.aside
    li.category.bd-1px-b(v-for="(item, idx) in categories")

      div.first(:ref="'' + idx"
        @mouseenter="addBtn('' + idx)"
        @mouseleave="delBtn('' + idx)"
        )
        .active(v-show="active[idx].category")
        .text(@click="emit([item.category], idx)") {{item.category}}
        .btn.mdi.mdi-minus( @click="delCategory(item.category, idx)")

      ol.subcategory
        li.bd-1px-t(v-for="(subcategory, _idx) in item.subcategories")
          .second(:ref="`${idx}_${_idx}`"
            @mouseenter="addBtn(`${idx}_${_idx}`)"
            @mouseleave="delBtn(`${idx}_${_idx}`)"
            )
            .active(v-show="active[idx].subcategories[_idx]")
            .text(
              @click="emit([item.category, subcategory], idx, _idx)"
              ) {{subcategory}}
            .btn.mdi.mdi-minus(@click="delSubcategory(item.category, subcategory)")

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
