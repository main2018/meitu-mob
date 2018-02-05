<template lang="pug">
  .category
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
  import { js } from './category-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './category.styl'
.category
  margin-top 10px
  background: #ddd;
  padding 10px
.select
  margin: 1rem 0 .5rem 0;
  padding .2rem 5px
  width: 100%;
.add-category
  padding .2rem 2%
  display inlineblock
  width: 81%;
.add-btn
  padding .2rem 0
  width: 15%;
  background: #ccc;
</style>
