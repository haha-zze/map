<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import {createMap, createTitleLayer} from './utils/map'

onMounted(() => {
  let map = createMap('map')
  createTitleLayer(map)
  addScaleControl(map)
})

/**
 * 添加地图比例尺
 * @param instace
 */
const addScaleControl = (instace) => {
  var scale = L.control.scale({
    maxWidth: 100,  // 比例尺为1km
    metric: true,
    imperial: false
  }).addTo(instace);
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}

</style>
