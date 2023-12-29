<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { loadCssJs } from "@/views/minemap/utils/loadMinemapJsAndCss";
import getBasicMinemapConfig from "@/views/minemap/utils/getBasicMinemapConfig";

let instance = $ref(null)
// todo   /* 本地字体设置 */
// MineMap API 默认使用本地字体
// 调整本地字体需要设置localIdeographFontFamily参数，默认值为"PingFang SC,Microsoft YaHei,微软雅黑,Arial,sans-serif,黑体"
// 如果使用线上字体需要设置localIdeographFontFamily参数为""
onMounted(()=>{
  loadCssJs().then(_=>{
    instance = getBasicMinemapConfig().createMap({localIdeographFontFamily: "PingFang SC,Microsoft YaHei,微软雅黑,Arial,sans-serif,黑体"})
  })
})

// conUnmounted(()=>{
//   getBasicMinemapConfig().destoryMap
// })


</script>


<style scoped lang="scss">

</style>
