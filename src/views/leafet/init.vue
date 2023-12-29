<template>
  <MapView @postMapInstance="getMapInstace" />
</template>

<script setup lang="ts">
import MapView from "@/views/leafet/components/mapView.vue";

/**
 * 获取组件传过来的地图实例
 * @param mapInstace 地图实例
 */
const getMapInstace= (mapInstace) =>{
  addScaleControl(mapInstace)
}

/**
 * 添加地图比例尺
 * @param instace
 */
const addScaleControl = (instace) =>{
  var scale = L.control.scale({
    maxWidth: 100,  // 比例尺为1km
    metric: true,
    imperial: false
  }).addTo(instace);
}
</script>

<style lang="scss" scoped>

</style>
