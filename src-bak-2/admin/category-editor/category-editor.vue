<template lang="pug">
  .category-editor
    admin-header(
      title="Category editor"
      :btns="['close']"
      @close="$emit('close')"
      )
    .table
      ul.header
        li.order order
        li.icon icon
        li.category category
        li.name name
        li.page subpage
        li.type content type
        li.operator operator
      ul.content(v-for="(category, idx) in categories" :ref="'' + idx")
        li.order(
          :contenteditable="status[idx]"
          :ref="`${idx}-${category.order}`"
          ) {{category.order}}
        li.icon
          file-upload(
            ref="upload"
            v-show="!!status[idx] && !category.icon"
            :showBtn="showBtn"
            :fname="fname"
            accept="image/*"
            @changed="getFiles"
          )
          img.iconimg(
            v-show="!iconShowStatus[idx]"
            @click="updateImg(idx)"
            :style="imgStyle"
            :src="category.icon ? $qiniuUrl(category.icon) : ''"
            )
        li.category(
          :contenteditable="status[idx]"
          :ref="`${idx}-${category.category}`"
          ) {{category.category}}
        li.name(
          :contenteditable="status[idx]"
          :ref="`${idx}-${category.name}`"
          ) {{category.name}}
        li.page
          label: span.mdi.mdi-sitemap
            input(type="checkbox" v-model="category.isSubpage" :disabled="!status[idx]")
        li.type
          label: span.mdi.mdi-newspaper
            input(type="checkbox" v-model="category.hasArticle" :disabled="!status[idx]")
          label: span.mdi.mdi-image
            input(type="checkbox" v-model="category.hasImage" :disabled="!status[idx]")
          label: span.mdi.mdi-play-box-outline
            input(type="checkbox" v-model="category.hasVideo" :disabled="!status[idx]")
          label: span.mdi.mdi-link-variant
            input(type="checkbox" v-model="category.hasLink" :disabled="!status[idx]")
        li.operator
          span.mdi( @click="toggleStatus(idx)" :class = "category.status ? 'mdi-eye-off' : 'mdi-eye'")
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
