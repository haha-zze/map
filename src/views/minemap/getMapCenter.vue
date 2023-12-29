<template>
  <div class="map-center-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-title">获取地图缩放级别与中心点</div>
      <div class="card-item">
        <p class="card-zoom">当前缩放级别：<span id="map-zoom">{{ mapInfo.zoom }}</span></p>
        <p class="card-zoom">当前中心点：<span id="map-center">{{ `${mapInfo.center.lng},${mapInfo.center.lat}` }}</span>
        </p>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script lang="ts" setup>
import {loadCssJs} from "./utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let mapInstance = ref(null)
let mapInfo = reactive({
  zoom: 0,
  center: {
    lat: 0,
    lng: 0,
  }
})
onMounted(() => {
  loadCssJs().then(_ => {
    mapInstance = getBasicMinemapConfig().createMap()
    bindEvent()
  })
})

const bindEvent = () => {
  // todo 监听地图加载完成
  mapInstance.on('load', showMapInfo)

// todo 监听移动地图
  mapInstance.on('moveend', showMapInfo)

  // todo 监听缩放地图
  mapInstance.on('zoomend', showMapInfo)
}

const showMapInfo = () => {
  // todo 获取地图缩放的中心点
  mapInfo.zoom = mapInstance.getZoom()
  // 获取地图当前的经纬度
  mapInfo.center = mapInstance.getCenter()
}
</script>

<style lang="scss" scoped>
.map-center-container {
  height: 100%;

  #map {
    height: 100%;
  }
}
</style>

