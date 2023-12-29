<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import icon from "@/assets/user.jpg"
import {createMap,createTitleLayer} from './utils/map'
let instance = reactive({})
onMounted(() => {
  instance = createMap('map')
  createTitleLayer(instance)

    //mark 图标资源网站: https://www.easyicon.net/iconsearch/  但是我没打开
    var starIcon = L.icon({
      iconUrl: icon,
      iconSize: [20, 20], // 图标尺寸
      iconAnchor: [0, 0], // 图标偏移
    });

    L.marker([39.856, 116.435], {icon: starIcon}).addTo(instance);
})
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>

