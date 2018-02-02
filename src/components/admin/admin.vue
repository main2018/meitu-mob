<template lang="pug">
  .admin
    .login(v-if="!isLogin")
      input(type="text" v-model="username")
      br
      input(type="password" v-model="password")
      br
      input(
        type="submit"
        value="submit"
        @click="test"
        )

    ul.category
      li
        label categoryName
        input(type="text", v-model="category")
      li
      input(type="button" value="add Category" @click="addCategory")
    br

    ul.subcategory
      li
        label category
        select(v-model="currCategory")
          option(
            v-for="item in categories"
            :value="item"
            ) {{item}}
      li
        label subcategoryName
        input(type="text", v-model="subcategory")
      li
      input(type="button" value="add subcategory" @click="addSubcategory")
    br

    ul.publish
      li
        label category
        input(type="text", v-model="album.category")
      li
        label subcategory
        input(type="text", v-model="album.subcategory")
      li
        label title
        input(type="text", v-model="album.title")
      li
        label text
        input(type="text", v-model="album.text")
      li
        input(type="button" value="add album" @click="addAlbum")
      li
        input(type="button" value="exit" @click="signout")

</template>

<script type="text/ecmascript-6">
  import { js } from './admin-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './admin.styl'
  label
    margin-right: 15px;
  .admin
    background: #eee;
</style>
