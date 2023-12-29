<template>
  <div class="map-view-container">
    <!-- 地图容器 -->
    <div class="map" id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {loadCssJs} from "../utils/loadLeftJsAndCss";
let mapInstance = ref(null)

const emit = defineEmits(['postMapInstance'])
onMounted(() => {
  loadCssJs().then(_ => {
    initMap()
    // addScaleControl()
  })
})

// 初始化地图
const initMap = () =>{
  mapInstance = L.map('map').setView([51.505, -0.09], 13); // 创建地图实例，设置初始视图位置
  // 瓦片图层的 URL 地址。其中的 http 表示使用的是 HTTP 协议，{s} 表示子域名，{z} 表示缩放级别，{x} 和 {y} 表示瓦片的行列号。这个 URL 是用来加载地图瓦片的，瓦片是地图的基本组成单元，通过加载不同的瓦片可以组成完整的地图。
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(mapInstance); // 添加瓦片图层到地图实例
  emit('postMapInstance',mapInstance)
}

//添加比例尺  具体在页面上体现在左下角

</script>

<style lang="scss" scoped>
.map-view-container {
  height: 100%; // 设置容器高度为100%

  .map {
    height: 100%; // 设置地图容器高度为100%
  }
}
</style>
