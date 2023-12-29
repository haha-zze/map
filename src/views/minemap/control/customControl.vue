<template>
  <div id="map">

  </div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref({})

onMounted(()=>{
  loadCssJs().then(()=>{
    instance =  getBasicMinemapConfig().createMap()
    // 将自定义控件添加到地图中
    instance.addControl(new HelloWorldControl(), "top-right");
  })
})

// fixme 自定义控件需要实现onAdd和onRemove方法
/**
 * 定义控件类名称
 * @constructor
 */
function HelloWorldControl() {
}

// 实现onAdd方法
HelloWorldControl.prototype.onAdd = function (map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'minemap-ctrl';
  this._container.style = 'font-size:14px; border:solid 1px #BEC2D5; color:#4B4B55; padding:6px 10px; background-color:#F1F2FA';
  this._container.textContent = '自定义控件：Hello, world';
  return this._container;
};

// 实现onRemove方法
HelloWorldControl.prototype.onRemove = function () {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};


</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
