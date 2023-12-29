<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref({})

onMounted(()=>{
  loadCssJs().then(()=>{
    instance =  getBasicMinemapConfig().createMap()
    console.log(window.minemap,"Map created",minemap)
    /* 深色地图控件 引入minemap-dark.css */
    instance.addControl(new window.minemap.Navigation(), 'bottom-right');
    instance.addControl(new window.minemap.Fullscreen(), 'top-right');
    instance.addControl(new window.minemap.Attribution(), 'bottom-left');
    instance.addControl(new window.minemap.Scale(), 'top-left');
  })

})

</script>


<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
