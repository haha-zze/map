<template>
  <div class="load-icon-containr">
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import icon from "@/assets/user.jpg"
import {loadCssJs} from "./utils/loadLeftJsAndCss";
let instance = reactive({})
onMounted(() => {
  loadCssJs().then(L => {
    instance = new L.Map('map', {
      center: new L.LatLng(39.86, 116.45),
      zoom: 10
    })

    // 加载地图底图
    L.tileLayer('https://api.mapabc.com/v3/tile?z={z}&x={x}&y={y}',{
      maxZoom:10
    }).addTo(instance)

    //mark 图标资源网站: https://www.easyicon.net/iconsearch/  但是我没打开
    var starIcon = L.icon({
      iconUrl: icon,
      iconSize: [20, 20], // 图标尺寸
      iconAnchor: [0, 0], // 图标偏移
    });

    L.marker([39.856,116.435], {icon: starIcon}).addTo(instance);
  })
})
</script>

<style lang="scss" scoped>
.load-icon-containr {
  height: 100%;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>

