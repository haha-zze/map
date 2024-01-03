<template>
  <div class="card-panel card-panel-top-left">
    <div class="card-item">
      <div class="style-list">
        <div class="style-inner">
          <div>面颜色</div>
          <input type="color" name="fillColor" value="#6777FF"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>面不透明度</div>
          <input type="number" name="fillOpacity" value="0.1" max="1" min="0"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>面轮廓颜色</div>
          <input type="color" name="fillOutlineColor" value="#6777FF"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>面轮廓宽度</div>
          <input type="number" name="fillOutlineWidth" value="2" min="0"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>面轮廓是否虚线</div>
          <input type="text" name="fillOutlineDasharray" value="false"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>线颜色</div>
          <input type="color" name="lineColor" value="#6777FF"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>线宽度</div>
          <input type="number" name="lineWidth" value="2" min="0"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>线是否虚线</div>
          <input type="text" name="lineDasharray" value="false"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>点边框颜色</div>
          <input type="color" name="circleBorderColor" value="#ffffff"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>点边框宽度</div>
          <input type="number" name="circleBorderRadius" value="2" min="0"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>点颜色</div>
          <input type="color" name="circleColor" value="#6777FF"
                 @change="onStyleItemChange()">
        </div>
        <div class="style-inner">
          <div>点半径</div>
          <input type="number" name="circleRadius" value="4" min="0"
                 @change="onStyleItemChange()">
        </div>
      </div>
    </div>
    <div class="card-btn-group" style="justify-content: space-around; flex-direction: column">
      <button @click="onSetCustomStyleCli" class="demo-btn">选中图形使用以上样式</button>
      <!-- <button onclick="onCloseCustomStyleClick()" class="demo-btn">选中图形恢复默认样式</button> -->
    </div>
  </div>
  <div id="map">
    <div class="edit-ctrl-group">
      <div class="edit-btn" title="画点" @click="onEditBtnClick('point')"><span
        class="iconfont icon-draw-point"/></div>
      <div class="edit-btn" title="画线" @click="onEditBtnClick('line')"><span
        class="iconfont icon-draw-line"/></div>
      <div class="edit-btn" title="画圆弧" @click="onEditBtnClick('arc')"><span
        class="iconfont icon-draw-curve"/></div>
      <div class="edit-btn" title="画多边形" @click="onEditBtnClick('polygon')"><span
        class="iconfont icon-draw-polygon1"/></div>
      <div class="edit-btn" title="画矩形" @click="onEditBtnClick('rectangle')"><span
        class="iconfont icon-draw-square"/></div>
      <div class="edit-btn" title="画三角形" @click="onEditBtnClick('triangle')"><span
        class="iconfont icon-Triangle"/></div>
      <div class="edit-btn" title="画圆" @click="onEditBtnClick('circle')"><span
        class="iconfont icon-draw-circle"/></div>
      <div class="edit-btn" title="删除所选" @click="onEditBtnClick('trash')"><span
        class="iconfont icon-tool-delete"/></div>
      <div class="edit-btn" title="撤销上一步操作" @click="onEditBtnClick('undo')"><span
        class="iconfont icon-undo"/></div>
      <div class="edit-btn" title="重复上一步操作" @click="onEditBtnClick('redo')"><span
        class="iconfont icon-redo"/></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss.ts";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig.ts";
let instance = $ref({})
let edit = $ref({})
var styleOptions = {"custom_style": 'true'};

onMounted(()=>{
  loadCssJs().then(_=>{
    instance = getBasicMinemapConfig().createMap()
    getEdit()
    instance.on('load',echoData)
    instance.on("edit.record.create", onEditRecordCreate);
  })
})

const getEdit = () => {
  edit = new minemap.edit.init(instance, {
    boxSelect: true,
    touchEnabled: true,
    displayControlsDefault: true,
    showButtons: false
  });
}

/**
 *
 */
const echoData = () =>{
    //向编辑池增加数据
    var center = instance.getCenter();
    edit.setFeatures({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {type: 'Point', circleColor:'#6777FF', coordinates: [center.lng + 0.003, center.lat + 0.002]}
      }, {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          lineColor:'#6777FF',
          coordinates: [[center.lng - 0.005, center.lat + 0.005], [center.lng - 0.005, center.lat - 0.005]]
        }
      }, {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          fillColor:'#6777FF',
          coordinates: [[[center.lng, center.lat], [center.lng, center.lat + 0.003], [center.lng - 0.003, center.lat + 0.003], [center.lng - 0.003, center.lat], [center.lng, center.lat]]]
        }
      }]
    });
}
/**
 * 输入框change事件
 */
const onStyleItemChange = () =>{
  edit.setCustomStyle(styleOptions);
}

const onEditRecordCreate = (e) =>{
  e.record
}

const onSetCustomStyleCli = () =>{

}
/**
 * 工具栏操作
 */
const onEditBtnClick = (mode) =>{
  if (edit && mode) {
    edit.onBtnCtrlActive(mode);
  }
}

</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%
}
</style>
