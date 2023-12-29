<template>
  <div class="card-panel card-panel-top-right">
    <div class="card-btn-group" style="justify-content: space-around;">
      <button @click="addDefaultMarker" class="demo-btn" style="margin-right: 10px;">添加默认点标记</button>
      <button @click="addCustomerMarker" class="demo-btn" style="margin-right: 10px;">添加自定义点标记</button>
      <button @click="updateMarkerPosition" class="demo-btn" style="margin-right: 10px;">更新点标记位置并旋转点标记
      </button>
      <button @click="delMarker" class="demo-btn">删除点标记</button>
    </div>
  </div>
  <div id="map"></div>
</template>

<script setup lang="ts">
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";
import {$ref} from "vue/macros";

let instance = $ref({})
let markers = $ref([]);
let lnglat = $ref({})


onMounted(() => {
  loadCssJs().then(_ => {
    instance = getBasicMinemapConfig().createMap()
    lnglat = instance.getCenter()
  })
})


/**
 * 添加默认点标记
 */
const addDefaultMarker = () => {
  if (instance) {
    var _marker = new minemap.Marker({
      draggable: true, //可以在初始化的时候决定是否可以拖拽
      anchor: 'top-left',//锚点位置(默认值"top-left")，可选值有`'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`
      color: 'red',//默认marker标记的颜色
      rotation: 0, //marker的旋转角度，以锚点作为旋转中心点，顺时针为正
      pitchAlignment: 'map', //倾斜对齐参数(默认值是‘auto’)，此值决定marker标记是贴在地图平面上，还是立在地图平面上，当值为`map`时，marker标记贴在地图平面上，当值为`viewport`时，marker标记立在地图平面上，当值为 `auto`时，会根据 `rotationAlignment`参数的值，自动决定.
      rotationAlignment: 'map',//旋转对齐参数(默认值是‘auto’)，此值决定地图在旋转的时候，marker标记是否跟随旋转，当值为`map` 时，marker标记会固定在地图平面上，不会跟随地图的旋转而旋转；当值为`viewport`时，marker标记会跟随地图的旋转而旋转，保持正向面对观察者；当值为`auto`时，相当于值`viewport`.
      scale: 1 //只有默认标记有这个参数，将默认标记放大1.5倍
    })
      .setLngLat([lnglat.lng + 0.05, lnglat.lat])
      .addTo(instance)
    markers.push(_marker)
  }
}

/**
 * 添加自定义点标记
 */
const addCustomerMarker = () => {
  if (instance) {
    var el = document.createElement('div');
    el.id = 'marker';
    el.style["background-image"] = "url(https://minedata.cn/nce-static/support/demo/js-api/zh/images/park-blue2x.png)";
    el.style["background-size"] = "cover";
    el.style.width = "24px";
    el.style.height = "38px";
    el.style["border-radius"] = "20%";


    // Marker构造函数接收两个参数，一个为自定义的DOM元素，一个是Object参数，其中包括偏移量等
    // offset参数为标注点相对于其左上角偏移像素大小
    // 调用setLngLat方法指定Marker的坐标位置
    var _marker = new minemap.Marker(el, {offset: [-12, -38]}).setLngLat(lnglat).addTo(instance);
    markers.push(_marker);
  }
}

/**
 * 删除点标记
 */
const delMarker = () => {
  if (instance && markers.length !== 0) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].remove();
    }
  }
}

/**
 * 更新点标记位置并旋转点标记
 */
const updateMarkerPosition = () => {
  if (instance && markers.length !== 0) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setLngLat([lnglat.lng + (3 * i) / 100, lnglat.lat + (3 * i) / 100]);
      markers[i].setRotation(50 * i + 40)
    }
  }
}

</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
