<template>
  <div class="card-panel card-panel-top-right" id="cardBtnPanel" style="display: block">
    <div class="card-btn-group card-btn-group-bottom" style="justify-content: space-around;">
      <button @click="view('png')" class="demo-btn btn-size" style="margin-right: 12px;">原尺寸浏览png图</button>
      <button @click="view('jpeg')" class="demo-btn btn-size">原尺寸浏览jpeg图</button>
    </div>
    <div class="card-btn-group card-btn-group-bottom" style="justify-content: space-around;">
      <button @click="download('png')" class="demo-btn btn-size" style="margin-right: 12px;">导出原尺寸png图</button>
      <button @click="download('jpeg')" class="demo-btn btn-size">导出原尺寸jpeg图</button>
    </div>
    <div class="card-btn-group" style="justify-content: space-around;">
      <button @click="view2('png',300,300)" class="demo-btn btn-size" style="margin-right: 12px;">自定义尺寸浏览png图</button>
      <button @click="view2('jpeg',300,300)" class="demo-btn btn-size">自定义尺寸jpeg图尺寸</button>
    </div>
  </div>
  <div class="img-panel" id="imgPanel" style="display: none;">
    <div class="img-box" id="imgBox">
      <img :src="src" alt="">
    </div>
    <button @click="closeViewPanel" class="demo-btn" style="margin-right: 10px;margin-top: 10px;">关闭浏览页面</button>
  </div>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { loadJs} from "@/utils/loadJsAndCss";
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";
import {$ref} from "vue/macros";
 let instance = $ref({})
let src = $ref('')
onMounted(()=>{
  loadCssJs().then(_=>{
    loadJs('https://minedata.cn/nce-static/support/demo/js-api/zh/js/canvas2image.js').then(res=>{
      // fixme 需要地图截屏是需要将 preserveDrawingBuffer 设置为true
      instance =  getBasicMinemapConfig().createMap({preserveDrawingBuffer:true})
    })
  })
})

const view = (mode)=>{
  if (instance.isStyleLoaded()) {//判断地图是否加载完成
    var c = instance.getCanvas();
    var w = c.width;
    var h = c.height;
    if (mode == 'png') {
      instance.triggerRepaint()
      var t = Canvas2Image.saveAsPNG(c, true);

      document.getElementById('cardBtnPanel').style.display = 'none';
      document.getElementById('imgPanel').style.display = 'block';
      document.getElementById('imgBox').innerHTML = '';
      document.getElementById('imgBox').appendChild(t);
    } else if (mode == 'jpeg') {
      instance.triggerRepaint()
      var t = Canvas2Image.saveAsJPEG(c, true);
      document.getElementById('cardBtnPanel').style.display = 'none';
      document.getElementById('imgPanel').style.display = 'block';
      document.getElementById('imgBox').innerHTML = '';
      document.getElementById('imgBox').appendChild(t);
    }
    console.log(t,"这是个啥")

  }
}

const download = (mode) =>{
  document.getElementById('imgPanel').style.display = 'none';
  if (instance.isStyleLoaded()) {//判断地图是否加载完成
    var c = instance.getCanvas();
    var w = c.width;
    var h = c.height;
    if (mode == 'png') {
      var img_data1 = Canvas2Image.saveAsPNG(c, true).getAttribute('src');
      saveFile(img_data1, 'instance.png');
    } else if (mode == 'jpeg') {
      var img_data1 = Canvas2Image.saveAsJPEG(c, true).getAttribute('src');
      saveFile(img_data1, 'instance.jpg');
    }
  }
}

const view2 = (mode,width,height)=>{
  if (instance && instance.isStyleLoaded()) {//判断地图是否加载完成
    var c = instance.getCanvas();
    var w = c.width;
    var h = c.height;
    if (mode == 'png') {
      instance.triggerRepaint()
      var t = Canvas2Image.saveAsPNG(c, true, width, height);//设置尺寸
      document.getElementById('cardBtnPanel').style.display = 'none';
      document.getElementById('imgPanel').style.display = 'block';
      document.getElementById('imgBox').innerHTML = '';
      document.getElementById('imgBox').appendChild(t);
    } else if (mode == 'jpeg') {
      instance.triggerRepaint()
      var t = Canvas2Image.saveAsJPEG(c, true, width, height);//设置尺寸
      document.getElementById('cardBtnPanel').style.display = 'none';
      document.getElementById('imgPanel').style.display = 'block';
      document.getElementById('imgBox').innerHTML = '';
      document.getElementById('imgBox').appendChild(t);
    }
  }
}

const closeViewPanel = () =>{
  document.getElementById('imgPanel').style.display = 'none';
  document.getElementById('imgBox').innerHTML = '';
  document.getElementById('cardBtnPanel').style.display = 'flex';
}

const saveFile = (data, filename) => {
  var save_link = document.createElement('a');
  save_link.href = data;
  save_link.download = filename;
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  save_link.dispatchEvent(event);
};

</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}

.img-panel {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
}

.img-panel img-box {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.img-panel img-box img {
  width: 100%;
  height: 100%;
}

.img-panel button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
.btn-size {
  width:160px;
  font-size:14px;
}
.card-btn-group {
  padding: 0;
}
</style>
