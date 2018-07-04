<template lang="pug">
  .dynamic
    pc-list(v-if="$isPc")
    tab(v-else)

    // tab-slot(:menu="menu")
      .wrap(
        v-for="(subAlbums, index) in albums"
        :slot="'slot-'+index"
        )
        ul.page-content
          p {{subAlbums}}
          li(v-for="album in subAlbums")
            card(:content="album")
</template>


<script>
const Tab = require('base/tab/tab')
const PcList = require('pc/pc-list/pc-list')
export default {
  name: 'dynamic',
  components: { Tab, PcList }
}
</script>
