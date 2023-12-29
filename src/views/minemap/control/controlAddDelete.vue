<template>
  <div class="map-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-btn-group" style="flex-direction: column;">
        <button @click="toggleScaleControl" class="demo-btn" style="margin-bottom: 10px;" id="scale-btn"> 添加比例尺空间 </button>
        <button @click="toggleNavigationControl" class="demo-btn" style="margin-bottom: 10px;" id="navigation-btn">
          添加缩放旋转空间
        </button>
        <button @click="toggleFullscreenControl" class="demo-btn" id="fullscreen-btn">添加全屏查看空间</button>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref<any>({})
let scale = $ref(null)
let navigation = $ref(null)
let fullscreen = $ref(null)

/**
  * MineMap JS API通过addControl方法进行控件的初始化与添加。
* 位置参数有“top-left”、“top-right”、“bottom-left”、“bottom-right”，例如给缩放控件设置位置：
* 如：map.addControl(new minemap.Navigation(),"bottom-right");
*/

onMounted(() => {
  loadCssJs().then(() => {
    instance = getBasicMinemapConfig().createMap()
  })
})

/**
 * 添加比例尺空间
 */
const toggleScaleControl = () => {
  if (instance) {
    if (scale) {
      instance.removeControl(scale);
      scale = null;
      document.getElementById("scale-btn").innerText = '添加比例尺控件';
    } else {
      scale = new minemap.Scale();
      instance.addControl(scale, "bottom-left");
      document.getElementById("scale-btn").innerText = '删除比例尺控件';
    }
  }
}

/**
 * 添加缩放旋转控件
 */
const toggleNavigationControl = () => {
  if (instance) {
    if (navigation) {
      instance.removeControl(navigation);
      navigation = null;
      document.getElementById("navigation-btn").innerText = '添加缩放旋转控件';
    } else {
      navigation = new minemap.Navigation();
      instance.addControl(navigation, "bottom-right");
      document.getElementById("navigation-btn").innerText = '删除缩放旋转控件';
    }
  }
}

/**
 * 添加全屏查看空间
 */
const toggleFullscreenControl = () => {
  if (instance) {
    if (fullscreen) {
      instance.removeControl(fullscreen);
      fullscreen = null;
      document.getElementById("fullscreen-btn").innerText = '添加全屏查看控件';
    } else {
      fullscreen = new minemap.Fullscreen();
      instance.addControl(fullscreen, "top-left");
      document.getElementById("fullscreen-btn").innerText = '删除全屏查看控件';
    }
  }
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
