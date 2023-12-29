<template>
  <div class="limit-map-zoom">
    <div id="map"></div>
  </div>
</template>

<script lang="ts" setup>
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

onMounted(()=>{
  loadCssJs().then(_=>{
    // fixme 可以通过设置maxZoom和minZoom来限制地图的缩放级别
    getBasicMinemapConfig().createMap({maxZoom:8,minZoom:8})
  })
})
</script>

<style lang="scss" scoped>
.limit-map-zoom {
  height: 100%;

  #map {
    height: 100%;
  }
}
</style>

