<template>
  <div class="mapTileLayer-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import {createMap} from "@/views/leafet/utils/map";

let baseLayers = reactive({})
let instance = reactive({})
// TODO leaflet有两种类型的图层：
// TODO（1）base layer：互斥的图层（在地图上同一时间只能有一个图层可见），比如tile layers；
// TODO（2）overlayers：在base layer之上放置的其他东西。
// var baseLayers = {
//   "Mapbox": mapbox,
//   "OpenStreetMap": osm
// };
//
// var overlays = {
//   "Marker": marker,
//   "Roads": roadsLayer
// };


onMounted(() => {
  instance = createMap('map')

  // TODO 创建基础图层
  baseLayers = reactive({
    'Sputnik': L.tileLayer('http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png', {
      maxZoom: 18
    }),

    "CartoDB Positron": L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      maxZoom: 18
    }),

    // todo 设置默认加载：addTo(instance),
    "OSM": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(instance),

    "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }),

    "高德路网": L.tileLayer('https://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8<ype=11', {
      maxZoom: 18
    }),

    "高德影像": L.tileLayer('https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
      maxZoom: 18
    }),

    "高德矢量": L.tileLayer('http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}', {
      maxZoom: 18
    }),

    "谷歌矢量": L.tileLayer('http://mt2.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}', {
      maxZoom: 18
    }),

    "谷歌路网": L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
      maxZoom: 18
    }),

    "谷歌影像：": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      maxZoom: 18
    }),

    "街景地图": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    })
  });

  // todo 创建一个图层控制器 提供给用户切换图层
  var layerControl = L.control.layers(baseLayers, {}, {
    // todo 指定图层控制器的位置
    position: 'topleft',
    // todo collapsed为布尔值 为true时代表图层控制器会以折叠的形式显示在地图上 只有用户点击时才展开 false时时自动展开
    collapsed: false
  }).addTo(instance)

  drawerLayerGroup()
})

/**
 * 一次在地图上绘制多个点
 */
const drawerLayerGroup = () => {
  var customIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet/dist/images/marker-icon.png',
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet/dist/images/marker-shadow.png',
    iconSize: [25, 41], // 图标大小
    iconAnchor: [12, 41], // 图标锚点位置
    shadowSize: [41, 41], // 阴影大小
    shadowAnchor: [12, 41], // 阴影锚点位置
    popupAnchor: [1, -34] // 弹出框位置
  });
  //  todo 创建多个点 并绘制弹出层
  const bj = L.marker([39.92, 116.46], {icon: customIcon}).bindPopup('这里是北京');
  const sh = L.marker([31.213, 121.445], {icon: customIcon}).bindPopup('这里是上海');
  const gz = L.marker([23.16, 113.23], {icon: customIcon}).bindPopup('这里是广州');
  // todo 将多个点通过layerGroup方法一次绘制在地图上
  var cities = L.layerGroup([bj, sh, gz]).addTo(instance);
}

</script>

<style lang="scss" scoped>
.mapTileLayer-container {
  height: 100%;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>

