<template>
  <div class="mapmove-container">
    <div id="map"></div>

    <div class="card-panel card-panel-top-right">
      <div class="card-title"><span id="map-info">{{ mapStatus }}</span></div>

      <div class="card-item">
        <p>当前中心点：<span id="map-center">{{ `${center.lat},${center.lng}` }}</span></p>
      </div>
    </div>
    <div class="card-panel card-panel-bottom-right">
      <div class="card-title">地图移动事件</div>
      <div class="card-btn-group">
        <button @click="moveOn" class="demo-btn" style="margin-right:12px;">绑定事件</button>
        <button @click="moveOff" class="demo-btn">解绑事件</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref({})
let center = $ref({
  lat: 0,
  lng: 0
})
let mapStatus = ref('地图加载中')
onMounted(() => {
 if(!instance || !Object.keys(instance).length) {
   loadCssJs().then(_ => {
     instance = getBasicMinemapConfig().createMap()
     instance.on('load', getMapCenter)
   })
 }
})

const getMapCenter = () => {
  center = instance.getCenter()
}

const onMapMoveStart = () => {
  mapStatus = '地图开始移动'
  getMapCenter()
}

const onMapMove = () => {
  mapStatus = '地图正在移动'
  getMapCenter()
}

const onMapMoveEnd = () => {
  mapStatus = '地图移动结束'
  getMapCenter()
}

// 绑定事件
const moveOn = () => {
  instance.on('moveStart', onMapMoveStart)
  instance.on('move', onMapMove)
  instance.on('moveend', onMapMoveEnd)
}

// 解绑事件
const moveOff = () => {
  instance.off('moveStart', onMapMoveStart)
  instance.off('move', onMapMove)
  instance.off('moveend', onMapMoveEnd)
}


</script>

<style lang="scss" scoped>
.mapmove-container {
  height: 100%;

  #map {
    height: 100%;
  }
}
</style>

