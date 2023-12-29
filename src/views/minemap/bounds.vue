<template>
  <div class="bounds-container">
    <div class="card-panel card-panel-top-right">
      <div class="card-title">根据边界框匹配地图</div>
      <div class="card-btn-group">
        <button @click="fitBoundingBox" class="demo-btn">匹配地图</button>&nbsp;&nbsp;<span>边界范围：[[116.40, 39.90],[116.49, 40.10]]</span>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script lang="ts" setup>
import {loadCssJs} from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";
let instance = reactive({})
onMounted(()=>{
  loadCssJs().then(_=>{
    instance =  getBasicMinemapConfig().createMap({zoom:17})
  })
})

const fitBoundingBox = () =>{
  if (instance) {
    // fixme 经纬度矩形边界为一个矩形的经纬度范围，用西南角和东北角的两个经纬度来描述，这两个经纬度分别代表边界的最小值和最大值；

    // todo fitBounds方法的作用是将地图视图调整到指定的边界框范围内，以便边界框的经纬度范围完全可见。它在以下场景中非常有用：

    // todo 1、地图初始化：在地图初始化时，可以使用fitBounds方法将地图视图调整到初始的边界框范围内，以确保用户一开始就能看到感兴趣的区域。
    // todo 2、数据展示：当有一组地理数据需要在地图上展示时，可以根据数据的经纬度范围计算出一个边界框，并使用fitBounds方法将地图视图调整到该边界框范围内，以确保所有数据点都可见。
    // todo 3、地图交互：当用户进行地图交互操作，如放大、缩小、平移等，可以使用fitBounds方法在特定的交互事件触发后，将地图视图调整到指定的边界框范围内，以保持用户关注区域的可见性
    const bounds = [[117.2000, 31.8000], [117.3000, 31.9000]];
    instance.fitBounds(bounds);
    instance.getBounds();//返回地图的当前地理边界框

    const geocoder = new minemap.Geocoder({
      apiKey: '16be596e00c44c86bb1569cb53424dc9' // 替换为你的API密钥
    });

    const address = '北京市朝阳区建国门外大街1号'; // 要查询的地址

    geocoder.search(address, function(result) {
      if (result.length > 0) {
        const location = result[0].location; // 获取第一个结果的经纬度
        console.log(location,"location"); // 输出经纬度
      } else {
        console.log('未找到该地址');
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.bounds-container {
  height: 100%;

  #map {
    height: 100%;
  }
}
</style>

