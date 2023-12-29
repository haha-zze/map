<template>
  <div class="mapTileLayer-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import {loadCssJs} from './utils/loadLeftJsAndCss'

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
  loadCssJs().then(_ => {
    instance = new L.Map('map', {
      center: new L.LatLng(39.86, 116.45),
      zoom: 10
    })

    // 渲染图层
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(instance);


    //todo 加载北京市的gelJSON的数据
    load_geojson().then(geoJSON=>{
      const myStyle = {
        "color": "green",
        "weight": 3,
        "opacity": 0.5,
      };
      // leaflet 加载 GeoJSON 统一默认使用 WGS84（有的说法是只能读取经纬度），若要使用投影坐标系要借助Proj4Leaflet  [链接]，或设置L.geoJson的coordsToLatLng属性

      /* 第一种加载形式*/
      L.geoJSON(geoJSON, {style: myStyle}).addTo(instance)
      /* 第二种加载形式*/
      // L.geoJson(geoJSON, {
      //   coordsToLatLng: coords => {
      //     console.log(coords,"coords",L.CRS,L.CRS.EPSG3857)
      //     //mark project 地理转平面坐标，unproject 平面转地理坐标
      //     return L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]));
      //   }
      // }).addTo(instance)
    })
  })
})

 // todo 本地json数据 数据来源：https://datav.aliyun.com/portal/school/atlas/area_selector#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5
 const load_geojson = async () => {
  let url = '/src/views/leafet/json/bgGeoJson.json';
  const response = await fetch(url);
  const json_obj = await response.json();
  console.log(json_obj,"json_obj");
  return json_obj;
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

