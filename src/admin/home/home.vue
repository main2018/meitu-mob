<template lang="pug">
  .home
    .aside
      adminAside(@clicked="getCategory")
    .container
      .nav.bd-1px-b
        .crumb {{breadcrumb || '/'}}
        .add.add-publish(
          v-text="isPublishShow ? '×' : '+'"
          v-show="categories.length !== 0 && !isUpdatesShow"
          @click="showPublish"
          )
        .add.add-updates(
          v-text="isUpdatesShow ? '×' : null"
          v-show="categories.length !== 0 && isUpdatesShow"
          @click="closeUpdates"
          )
      .content(
        v-show="!isPublishShow && !isUpdatesShow && adminAlbums.length !== 0"
        )
        .card-wrapper(
          v-for="album in adminAlbums"
          )
          card(
            :content="album"
            :btn="!''"
            :editable="editable"
            )
      .blank-page(
        v-show="adminAlbums.length === 0 && !isPublishShow && !isUpdatesShow"
        ) no Records


      .publish(v-show="isPublishShow || isUpdatesShow")
        publish(:crumb="categories")
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './home.styl'
</style>
