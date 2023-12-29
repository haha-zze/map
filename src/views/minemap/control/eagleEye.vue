<template>
   <div id="map"></div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss.ts";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig.ts";

onMounted(()=>{
  loadCssJs().then(_=>{
    // 是否开启鹰眼，默认值为false
    getBasicMinemapConfig().createMap({  overviewMap: true })
  })
})
</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
