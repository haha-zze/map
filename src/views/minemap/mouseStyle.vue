<template>
 <div class="mouse-style-container">
   <div class="card-btn-group card-btn-group-bottom">
     <button @click="switchDefault" class="demo-btn" style="margin-right:12px;">默认模式</button>
     <button @click="switchCommon" class="demo-btn" style="margin-right:12px;">普通模式</button>
     <button @click="switchEdit" class="demo-btn">编辑模式</button>
   </div>
   <div class="card-btn-group">
     <button @click="switchMove" class="demo-btn" style="margin-right:12px;">移动模式</button>
     <button @click="switchClick" class="demo-btn" style="margin-right:12px;">点击模式</button>
     <button @click="switchIcon" class="demo-btn">图标模式</button>
   </div>
   <div id="map"></div>
 </div>
</template>

<script setup lang="ts">
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref<any>({})
onMounted(() => {
  loadCssJs().then(_ => {
    instance = getBasicMinemapConfig().createMap()
  })
})

const switchDefault = () =>{
  instance.getCanvas().style.cursor = ''
}

const switchCommon = () =>{
  instance.getCanvas().style.cursor = 'default'
}

const switchEdit = () =>{
  instance.getCanvas().style.cursor = 'crosshair'
}

const switchMove = () =>{
  instance.getCanvas().style.cursor = 'move'
}

const switchClick = () =>{
  instance.getCanvas().style.cursor = 'pointer'
}

const switchIcon = () =>{
  instance.getCanvas().style.cursor = 'url("https://minedata.cn/nce-static/support/demo/js-api/zh/images/cursor_measure.cur"),default'
}
</script>

<style scoped lang="scss">
.mouse-style-container {
  width: 100%;
  height: 100%;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
