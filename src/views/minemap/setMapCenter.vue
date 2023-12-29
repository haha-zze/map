<template>
  <div class="map-center-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-title">设置地图中心点/级别</div>
      <div class="card-btn-group">
        <button @click="changeZoom()" class="demo-btn" style="margin-right:12px;">随机设置地图缩放级别</button>
        <button @click="changeCenter()" class="demo-btn">随机设置地图中心点</button>
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
  mapInstance.on('load', ()=>{
    console.log('地图加载完成了')
  })
}

const changeZoom = () =>{
  if(mapInstance) {
    mapInstance.setZoom(Math.floor(Math.random() * 14) + 3)
  }
}

const changeCenter = () =>{
  if(mapInstance) {
    const center = mapInstance.getCenter();
    const lng = center.lng + Math.floor(Math.random() * 589828) / 1e6;
    const lat = center.lat + Math.floor(Math.random() * 514923) / 1e6;
    mapInstance.setCenter([lng, lat]); //设置地图层级
  }
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

