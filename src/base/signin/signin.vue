<template lang="pug">
  .auth
    .signin.sign-form(v-show="isSigninShow")
      input.bd-1px(
        type="text",
        placeholder="username",
        v-model="inUsername"
        )
      input.bd-1px(
        type="password",
        placeholder="password",
        v-model="inPassword"
        @keyup.enter="signin"
        )
      .form-btn.bd-1px(:class="signBtnClass" @click="signin") signin
      .href(v-if="hasSignup" @click="showSignup") signup

    .signup.sign-form(v-if="hasSignup" v-show="!isSigninShow")
      input.bd-1px(
        type="text",
        placeholder="username",
        v-model="upUsername"
        )
      input.bd-1px(
        type="password",
        placeholder="password",
        v-model="upPassword"
        )
      input.bd-1px(
        type="password",
        placeholder="confirm"
        v-model="upConfirm"
        @keyup.enter="signup"
        )
      .form-btn.bd-1px(:class="signBtnClass" @click="signup") signup
      .href(@click="showSignin") signin
</template>

<script type="text/ecmascript-6">
  import { js } from './signin-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './signin.styl'
</style>
