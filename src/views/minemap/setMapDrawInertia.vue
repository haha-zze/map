<template>
  <div class="map-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-title">设置地图的拖拽参数</div>
      <div class="card-btn-group">
        <button @click="setDragpanToNoninertial" class="demo-btn" style="margin-right:12px;">设置地图拖动无惯性平移</button>
        <button @click="setDragpanToInertial" class="demo-btn" style="margin-right:12px;">设置地图拖动有惯性平移</button>
        <button @click="disableDragpan" class="demo-btn">禁用地图拖动</button>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref<any>()
onMounted(() => {
  loadCssJs().then(_ => {
    instance = getBasicMinemapConfig().createMap()
  })
})

/**
 * 设置地图拖动无惯性平移
 */
const setDragpanToNoninertial = () =>{
  instance.dragPan.enable({
    linearity: 0.1, //拖拽平移速度比例因子，注意：此参数不能为0
    maxSpeed: 0, //拖拽平移速度的最大值。
    deceleration: 2500, //拖拽动作结束后，地图惯性平移速度的速度衰减速率
  });
}

/**
 * 设置地图拖动有惯性平移
 */
const setDragpanToInertial = () =>{
  instance.dragPan.enable({
    linearity: 0.3,
    maxSpeed: 1400,
    deceleration: 2500,
  });
}

/**
 * 禁用地图拖动
 */
const disableDragpan = () =>{
  instance.dragPan.disable();
}
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 100%;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
