<template lang="pug">
  .category-editor
    .title
      span.txt Category editor
      span.mdi.mdi-close(@click="close")
    table.table
      tr
        th order
        th icon
        th category
        th name
        th operate
      tr(v-for="(category, idx) in categories" :ref="'' + idx")
        td.order(
          :contenteditable="status[idx]"
          :ref="`${idx}-${category.order}`"
          ) {{category.order}}
        td.icon(
          :ref="`${idx}-${category.icon}`"
          )
          span {{category.icon}}
          img-upload
        td.category(
          :contenteditable="status[idx]"
          :ref="`${idx}-${category.category}`"
          ) {{category.category}}
        td.name(
          :contenteditable="status[idx]"
          :ref="`${idx}-${category.name}`"
          ) {{category.name}}
        td.operator
          span(v-show="!status[idx]" @click="edit(idx)").mdi.mdi-pencil
          span(v-show="status[idx]" @click="cancel(idx)").mdi.mdi-close
          span(v-show="status[idx]" @click="check(idx)").mdi.mdi-check
          span(v-show="canDel[idx]" @click="del(idx)").mdi.mdi-minus
</template>

<script type="text/ecmascript-6">
  import { js } from './category-editor-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './category-editor.styl'
</style>
