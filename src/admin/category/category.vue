<template lang="pug">
  .wrapper
    .category
      .title
        span.txt category
        span.mdi.mdi-pencil(@click="showEditor")
      input.add-category(
        type="text"
        v-model="category"
        placeholder="category"
        )
      input.add-category(
        type="text"
        v-model="categoryName"
        placeholder="category ZH"
        )
      input.add-btn(
        type="button"
        value="+"
        @click="addCategory"
        )
      .title subcategory
      select.select(
        v-model="currCategory"
        )
        option(
          v-for="item in categories"
          :value="item.category"
          ) {{item.name || _2space(item.category)}}
      input.add-category(
        type="text"
        v-model="subcategory"
        placeholder="subcategory"
        )
      input.add-btn(
        type="button"
        value="+"
        @click="addSubcategory"
        )
</template>

<script type="text/ecmascript-6">
  import { js } from './category-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './category.styl'
</style>
