<template lang="pug">
  #home
    .aside
      .menu
        .brand: span {{name || 'manager'}}
        .util: .mdi.mdi-18px.mdi-settings(@click="openSettings")
      adminAside(@clicked="getCategory")
    .container
      div.content(v-show="isContentShow")
        admin-header(:title="breadcrumb")
          // .mdi.mdi-plus(
            v-show="breadcrumb"
            @click="showPublish"
            )
        .card-wrapper(v-for="album in adminAlbums")
          card(
            :content="album"
            :btn="!''"
            :editable="cardEditable"
            )
        .blank-page(
          v-show="adminAlbums.length === 0"
          ) no Records


      div.publish(v-show="isPublishShow")
        publish(@close="closePublish")
      div.editor(v-show="isEditorShow")
        category-editor(@close="closeEditor")
      div.settings(v-show="isSettingsShow")
        settings(@close="closeSettings")
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './home.styl'
</style>
