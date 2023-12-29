<template>
  <div class="map-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-title">设置地图的缩放速率</div>
      <div class="card-btn-group">
        <button @click="setZoomRateToWhole" class="demo-btn" style="margin-right:12px;">设置地图整级缩放</button>
        <button @click="setZoomRateToContinuously" class="demo-btn">设置地图无级缩放</button>
      </div>
      <div class="card-item">
        <p class="card-zoom">当前缩放级别：<span id="map-zoom">{{ zoomRate }}</span></p>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let zoomRate = $ref('')
let instance = $ref<any>({})

onMounted(() => {
  loadCssJs().then(_ => {
    instance = getBasicMinemapConfig().createMap()
    instance.on('load',showMapCenterInfo)
    instance.on('zoomend',showMapCenterInfo)
  })
})

const showMapCenterInfo = () =>{
  zoomRate = instance.getZoom()
}

/**
 * 设置地图整级缩放
 */
const setZoomRateToWhole = () =>{
  instance?.scrollZoom?.setWheelZoomRate(1); //设置鼠标滚轮滚动一下的缩放比例
  instance?.scrollZoom?.setZoomRate(1); //设置触摸屏的缩放比例，最大值为1
}

/**
 * 设置地图无级缩放
 */
const setZoomRateToContinuously = () =>{
  instance.scrollZoom.setWheelZoomRate(1 / 600); //速率值越小，地图的缩放越细腻
}

/**
 * 绑定地图移动与缩放事件
 */


</script>


<style scoped lang="scss">

</style>
