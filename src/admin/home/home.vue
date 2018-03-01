<template lang="pug">
  .home
    .aside
      adminAside(@clicked="getCategory")
    .container
      .nav.bd-1px-b
        .crumb {{breadcrumb || '/'}}
        input.add(
          type="button"
          :value="isPublishShow ? 'unpublish' : 'publish'"
          v-show="categories.length !== 0"
          @click="showPublish"
          )
      .content(
        v-show="!isPublishShow && adminAlbums.length !== 0"
        )
        .card-wrapper(
          v-for="album in adminAlbums"
          )
          card(:content="album")
      .blank-page(
        v-show="adminAlbums.length === 0"
        ) no Records


      .publish(v-show="isPublishShow")
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
