<template lang="pug">
  .dynamic
    pc-list(v-if="$isPc")
    tab(v-else)
</template>


<script>
const Tab = require('base/tab/tab')
const PcList = require('pc/pc-list/pc-list')
export default {
  name: 'dynamic',
  components: { Tab, PcList }
}
</script>
