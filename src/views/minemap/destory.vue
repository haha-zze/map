<script setup lang="ts">
import {loadCssJs} from "./utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";
defineOptions({
  name: "minemap-destory"
});
let mapInstance = ref(null)
onMounted(() => {
  loadCssJs().then(_ => {
    initMap()
  })
})

const initMap = () => {
  mapInstance = getBasicMinemapConfig().createMap()

}

// 创建地图
const createMap = () => {
  if (!mapInstance) {
    initMap()
  }
}

// 销毁地图
const destoryMap = () => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
}
</script>

<template>
  <div class="destory-container">
    <el-row>
      <el-button @click="createMap">创建地图</el-button>
      <el-button @click="destoryMap">销毁地图</el-button>
    </el-row>
    <div id="map"></div>
  </div>
</template>

<style scoped lang="scss">
.destory-container {
  height: 100%;
  #map {
    height: calc(100% - 30px);
  }
}
</style>

