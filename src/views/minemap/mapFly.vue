<template>
  <div class="map-fly-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-btn-group card-btn-group-bottom">
        <button @click="jumpAction" class="demo-btn">jumpTo方法飞行示例</button>
      </div>
      <div class="card-btn-group card-btn-group-bottom">
        <button @click="flyAction" class="demo-btn">flyTo方法飞行示例</button>
      </div>
      <div class="card-btn-group">
        <button @click="easeAction" class="demo-btn">easeTo方法飞行示例</button>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";
import {$ref} from "vue/macros";

let instance = $ref<any>({})

onMounted(() => {
  loadCssJs().then(_ => {
    instance = getBasicMinemapConfig().createMap()
  })
})

/**
 * jumpTo方法飞行示例
 */
const jumpAction = () => {
  /**
   * jumpTo方法，采用立即变换的形式进行中心点、缩放级别、旋转角、倾角的改变
   *
   * 参数项说明：
   * center：表示飞行结束后的地图中心坐标值；
   * zoom：表示飞行结束后的地图缩放等级；
   * bearing：表示飞行结束后的地图旋转等级；
   * pitch：表示飞行结束后的地图倾斜等级；
   * duration：表示飞行时长，单位为毫秒；
   */
  const center = instance.getCenter();
  instance.jumpTo({
    center: [center.lng + (Math.random() - 0.5) * 20,
      center.lat + (Math.random() - 0.5) * 20],
    pitch: 10,
    duration: 2500
  });
}

/**
 * flyTo方法飞行示例
 */
const flyAction = () => {
  /**
   * flyTo方法，在一个弧线上采用动画的形式进行中心点、缩放级别、旋转角、倾角的改变
   *
   * 参数项说明：
   * center：表示飞行结束后的地图中心坐标值；
   * zoom：表示飞行结束后的地图缩放等级；
   * bearing：表示飞行结束后的地图旋转等级；
   * pitch：表示飞行结束后的地图倾斜等级；
   * duration：表示飞行时长，单位为毫秒；
   */
  const center = instance.getCenter();
  instance.flyTo({
    center: [center.lng + (Math.random() - 0.5) * 0.2,
      center.lat + (Math.random() - 0.5) * 0.2],
    zoom: 14,
    bearing: 10,
    pitch: 90,
    duration: 4000
  });
}

/**
 * easeTo方法飞行示例
 */
const easeAction = () => {
  /**
   * easeTo方法，以bezier曲线的方式采用动画的形式进行中心点、缩放级别、旋转角、倾角的改变
   *
   * 参数项说明：
   * center：表示飞行结束后的地图中心坐标值；
   * zoom：表示飞行结束后的地图缩放等级；
   * bearing：表示飞行结束后的地图旋转等级；
   * pitch：表示飞行结束后的地图倾斜等级；
   * duration：表示飞行时长，单位为毫秒；
   */
  const center = instance.getCenter();
  instance.easeTo({
    center: [center.lng + (Math.random() - 0.5) * 0.3,
      center.lat + (Math.random() - 0.5) * 0.3],
    zoom: 14,
    bearing: 0,
    pitch: 180,
    duration: 4000
  });
}

</script>

<style lang="scss" scoped>
.map-fly-container {
  width: 100%;
  height: 100%;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>

