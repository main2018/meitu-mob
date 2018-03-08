<template lang="pug">
  .category-editor
    .title
      span.txt category editor
      span.mdi.mdi-close(@click="close")
    table.table
      tr
        th order
        th icon
        th category
        th name
        th operate
      tr(
        v-for="(category, index) in categories"
        )
        td {{category.order}}
        td {{category.icon}}
        td {{category.category}}
        td {{category.name}}
        td.operator
          span(v-show="!status[index]" @click="edit(index)").mdi.mdi-pencil
          span(v-show="status[index]" @click="cancel(index)").mdi.mdi-close
          span(v-show="status[index]").mdi.mdi-check
          span(v-show="canDel[index]").mdi.mdi-minus
</template>

<script type="text/ecmascript-6">
  import { js } from './category-editor-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './category-editor.styl'
</style>
