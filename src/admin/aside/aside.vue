<template lang="pug">
  ul.aside
    li.category.bd-1px-b(v-for="(category, index) in categories")

      div.first(:ref="'' + index"
        @mouseenter="addBtn('' + index)"
        @mouseleave="delBtn('' + index)"
        )
        .text(@click="emit([category.category])") {{category.category}}
        .btn.mdi.mdi-minus( @click="delCategory(category.category, index)")

      ol.subcategory
        li.bd-1px-t(v-for="(subcategory, subIndex) in category.subcategories")
          .second(:ref="`${index}_${subIndex}`"
            @mouseenter="addBtn(`${index}_${subIndex}`)"
            @mouseleave="delBtn(`${index}_${subIndex}`)"
            )
            .text(@click="emit([category.category, subcategory])") {{subcategory}}
            .btn.mdi.mdi-minus(@click="delSubcategory(category.category, subcategory)")

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
