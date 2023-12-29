<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import {createMap,createTitleLayer} from './utils/map'
let instace = reactive({})
/**
 * 获取地图实例
 * @param mapInstace
 */

onMounted(()=>{
  instace = createMap('map')
  createTitleLayer(instace)
  drawerCircel()
  drawerLine()
  drawerGon()
  addMarker()
})

/**
 * 绘制圆形
 */
const drawerCircel = () => {
  var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(instace);
}

/**
 * 绘制线
 */
const drawerLine = () => {
  var pl = L.polyline([
    [23.19459132, 113.36842907],
    [23.19426526, 113.36885914]
  ], {
    color: 'yellow'
  });
  pl.addTo(instace);
}

/**
 * 绘制多边形
 */
const drawerGon = () => {
  var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(instace);
}

/**
 * 地图打点
 */
const addMarker = () => {
// 创建一个新的Icon对象，指定图标路径和大小
  var customIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet/dist/images/marker-icon.png',
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet/dist/images/marker-shadow.png',
    iconSize: [25, 41], // 图标大小
    iconAnchor: [12, 41], // 图标锚点位置
    shadowSize: [41, 41], // 阴影大小
    shadowAnchor: [12, 41], // 阴影锚点位置
    popupAnchor: [1, -34] // 弹出框位置
  });
  // 使用自定义图标创建Marker
  let marker = L.marker([51.5, -0.09], {icon: customIcon}).addTo(instace);
  // 绑定弹出层 自动弹出
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}

</script>

<style lang="scss" scoped>
.shapeDrawer-container {
  height: 100%;
}
</style>

