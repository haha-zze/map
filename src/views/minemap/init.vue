<script setup lang="ts">
import {loadCssJs} from "./utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";
defineOptions({
  name: "minemap-init"
});
onMounted(() => {
  loadCssJs().then(_ => {
    initMap()
  })
})

const initMap = () => {
  getBasicMinemapConfig().createMap()
}
</script>

<template>
  <div class="init-contaienr">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.init-contaienr{
  width: 100%;
  height: 100%;
  #map {
    height: 100%;
  }
}
</style>
