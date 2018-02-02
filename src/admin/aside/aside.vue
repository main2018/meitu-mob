<template lang="pug">
  .aside
    ul.category
      li.bd-1px-b(v-for="(item, index) in categories")
        .first
          .text(@click="emit([ item.category ])") {{item.category}}
          .btn
            .mdi.mdi-pencil
          .btn(
            @click="delCategory(item.category, index)"
            )
            .mdi.mdi-minus
        ol.subcategory
          li.bd-1px-t(v-for="subcategory in item.subcategories")
            .second
              .text(
                @click="emit([ item.category, subcategory ])"
                ) {{subcategory}}
              .btn
                .mdi.mdi-pencil
              .btn(@click="delSubcategory(item.category, subcategory)")
                .mdi.mdi-minus

    .control
      input.add-category(
        type="text"
        v-model="category"
        placeholder="category name"
        )
      input.add-btn(
        type="button"
        value="+"
        @click="addCategory"
        )
      select.select(
        v-model="currCategory"
        )
        option(
          v-for="item in categories"
          :value="item.category"
          ) {{item.category}}
      input.add-category(
        type="text"
        v-model="subcategory"
        placeholder="subcategory name"
        )
      input.add-btn(
        type="button"
        value="+"
        @click="addSubcategory"
        )

</template>

<script type="text/ecmascript-6">
  import { js } from './aside-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './aside.styl'
</style>
