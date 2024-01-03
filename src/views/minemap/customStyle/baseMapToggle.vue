<template>
  <div class="card-inp card-panel-top-left">
    <input
      class="input-text"
      id="format_name"
      placeholder="请搜索"
      type="text"
      autocomplete="off"
      oninput="queryPoiSearchResult(event)"
    />
    <!-- 搜索结果 -->
    <div class="serch-result other-around-result">
      <!-- <h3 class="geo-title">搜索结果</h3> -->
      <ul id="result-panel" class="result-panel hidden-scrollbar"></ul>
      <div class="pagination"></div>
      <p class="no-result">无结果警告</p>
    </div>
  </div>
  <div class="card-panel card-panel-top-right">
    <div class="card-title">标准地图样式</div>
    <div class="card-btn-group">
      <button
        @click="toggleStyle(11001)"
        class="demo-btn"
      >
        标准地图
      </button>
      <button
        @click="toggleStyle(11003)"
        class="demo-btn"
      >
        极夜蓝
      </button>
      <button
        @click="toggleStyle(11002)"
        class="demo-btn"
      >
        都市黑夜
      </button>
      <button
        @click="toggleStyle(11004)"
        class="demo-btn"
      >
        淡雅白
      </button>
    </div>
    <p class="zoom">缩放级别：<span id="map-zoom">{{zoom.toFixed(2)}}</span></p>
  </div>
  <div class="reset" onclick="flyToCenter([116.46,39.92])"></div>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss.ts";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig.ts";
let instance = $ref({})
let zoom = $ref({})

onMounted(()=>{
  loadCssJs().then(()=>{
    instance =  getBasicMinemapConfig().createMap()
    console.log(minemap,"minemap")
    // instance.on('zoomend',showMapInfo)
    instance.on('load',()=>{
      showMapInfo()
      instance.addControl(new minemap.Scale(), "bottom-left");
      instance.addControl(new minemap.Navigation(), "bottom-right");
    })
  })
})

const showMapInfo = () =>{
  zoom = instance.getZoom() // 获取底图的缩放级别
}

// 联想搜索
// const queryPoiSearchResult = (e) =>{
//   if (markers.length > 0) {
//     for (var i = 0; i < markers.length; i++) {
//       markers[i].remove();
//     }
//     markers = [];
//   }
//   var keywords = document.getElementById("format_name").value;
//   minemap.service.autocompleteData({
//     keywords,
//     city:'北京市',
//   })
//     .then(function (response) {
//       // 是否有搜索结果
//       if (response.data.suggestion) {
//         let infos = response.data.suggestion; // 地址数组
//         allResultList = infos;
//         let searchHeight = document.querySelector(".card-panel").clientHeight;
//         let wrapHeight = document.querySelector("#map").scrollHeight;
//         let searchLisHeight = wrapHeight - searchHeight - 20 - 16 - 54 - 40 - 28;
//         let pageMaxNum = Math.floor(searchLisHeight / 47);
//         if (Math.floor(pageMaxNum) < infos.length) {
//           pageMaxNum = Math.floor((searchLisHeight - 25) / 47);
//         }
//         pageMaxSize = pageMaxNum;
//         infos = allResultList.slice(0, pageMaxNum);
//         // 循环加点
//         for (let i = 0; i < infos.length; i++) {
//           addCustomerMarker(infos[i].location, infos[i].address, i + 1)
//         }
//         showSearchResult(infos);
//       } else {
//         showSearchResult(infos);
//         document.querySelector(".pagination").innerHTML = "";
//       }
//     })
// }
//
// // 关键字搜索
// const queryKeywordSearch = () => {
//   let keywords = document.getElementById("format_name").value;
//   let resultBoxElem = document.querySelector('.serch-result'); // 搜索结果元素
//   resultBoxElem.style.display = "none";
//   minemap.service.placeSearchKeywordData({
//     keywords,
//     city: "北京市",
//   })
//     .then(function (response) {
//       // 是否有搜索结果
//       if (response.data.pois) {
//         let infos = response.data.pois;
//         // 循环加点
//         for (let i = 0; i < infos.length; i++) {
//           addCustomerMarker(infos[i].location, infos[i].address, i + 1)
//         }
//       }
//     })
// }


const toggleStyle = () =>{

}
</script>


<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
.card-panel {
  width: 190px;
}
.card-title {
  margin-bottom: 5px;
}
.card-btn-group {
  justify-content: space-between;
}
.demo-btn {
  width: 74px;
  margin-bottom: 6px;
}
.card-inp {
  position: absolute;
  top: 10px;
  z-index: 9999;
}
.serch-result {
  position: absolute;
  display: none;
  top: 45px;
  left: 3px;
  background: #fff;
  z-index: 6;
  width: 320px;
  box-shadow: 0px 4px 20px 0px rgba(94, 94, 94, 0.16);
  border-radius: 4px;
}

.other-around-result {
  /* max-height: calc(100% - 210px); */
}
/* 搜索结果 */
.serch-result .no-result {
  color: #ff0000;
  display: none;
}

.serch-result .result-panel {
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.serch-result .result-item {
  position: relative;
  list-style-type: none;
  border-top: 1px solid #dfdcdc;
  padding: 10px 0;
}

.serch-result .result-item p {
  padding-left: 20px;
  margin: 0;
}

.serch-result .result-item .result-item-index {
  position: absolute;
  top: 9px;
  left: 2px;
  font-size: 14px;
}

.serch-result .result-item .result-item-name {
  width: 100%;
  font-size: 14px;
  line-height: 14px;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}

.serch-result .result-item .result-item-address {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 14px;
  color: #bbbbbb;
}

.serch-result .result-item-active {
  background-color: rgba(15, 104, 250, 0.08);
}
.input-text {
  width: 100%;
  height: 40px !important;
  background: #ffffff;
  border-radius: 4px !important;
  border: 1px solid #d8d8d8;
  color: #333333;
  font-size: 14px !important;
  outline: none;
  margin: 0;
  padding: 0 5px;
  box-sizing: border-box;
  transition: border 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.input-text:focus {
  border-color: #475aff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.minemap-ctrl-bottom-left .minemap-ctrl {
  clear: none;
}
.minemap-ctrl-bottom-left .minemap-ctrl-scale {
  float: right;
}
.minemap-ctrl button.minemap-ctrl-zoom-in {
  background-size: 17px 16px !important;
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/add.png");
}
.minemap-ctrl button.minemap-ctrl-zoom-in:hover {
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/add-active.png");
}
.minemap-ctrl button.minemap-ctrl-zoom-out {
  background-size: 17px 16px !important;
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/reduce.png");
}
.minemap-ctrl button.minemap-ctrl-zoom-out:hover {
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/reduce-active.png");
}
.minemap-ctrl button.minemap-ctrl-compass .minemap-ctrl-compass-arrow {
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/compass.png");
  background-size: 24px 24px;
}
.minemap-ctrl-bottom-right .minemap-ctrl {
  margin: 0 16px 16px 0;
  box-shadow: none;
  border-radius: 2px;
}
.minemap-ctrl-bottom-right .minemap-ctrl .minemap-ctrl-icon {
  width: 24px !important;
  height: 32px;
  margin: 0px 4px !important;
  padding: 0 !important;
}
.reset {
  width: 32px;
  height: 32px;
  background: #363945;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  position: fixed;
  bottom: 122px;
  right: 16px;
  z-index: 1;
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/reset.png");
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: 50%;
  cursor: pointer;
}
.reset:hover {
  background-image: url("https://minedata.cn/nce-static/support/demo/js-api/zh//images/map-ctrl-icon/reset-active.png");
}
.zoom {
  font-size: 14px;
  line-height: 14px;
  color: #4b4b55 !important;
  margin-bottom: 0;
  margin-top: 5px;
}
</style>
