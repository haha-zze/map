declare const minemap: any;  // 配置这个的目的是解决ts识别不了minemap全局变量的问题

// fixme Partial来指定 config 参数是可选的，并且可以部分地匹配 MapConfig 接口的属性。这样，当其他地方调用 createMap 函数时，TypeScript 将会提示可以传入哪些配置。
interface MapFunctions {
  createMap: (config?: Partial<MapConfig>) => any
  destroyMap: () => void;
}

interface MapConfig {
  container?: string;
  style?: string;
  center?: [number, number];
  zoom?: number;
  maxZoom?: number;
  minZoom?: number;
  localIdeographFontFamily?:string
}

export default function (): MapFunctions {
  /* global minemap */
  // 地图的基础配置信息
  minemap.domainUrl = 'https://minedata.cn'
  minemap.dataDomainUrl = 'https://datahive04.minedata.cn'
  minemap.spriteUrl = 'https://minedata.cn/minemapapi/v2.1.0/sprite/sprite'
  minemap.serviceUrl = 'https://mineservice.minedata.cn/service/'
  minemap.appKey = '16be596e00c44c86bb1569cb53424dc9'
  minemap.solution = 12877

  let mapInstance = null

  return {
    createMap: (config: MapConfig = {}) => {
      const defaultConfig:MapConfig = {
        container: 'map', // 地图容器 对应 template 中，id 等于 map 的 div
        style: 'https://mineservice.minedata.cn/service/solu/style/id/12877', // 地图主题
        center: [116.46, 39.92],
        zoom: 10, // 地图初始化默认比例
        maxZoom: 17, // 最大比例
        minZoom: 3, // 最小比例
      }
      const mergeConfig:MapConfig = {...defaultConfig, ...config}
      mapInstance = new minemap.Map(mergeConfig)
      return mapInstance
    },
    destroyMap: () => {
      if (mapInstance) {
        mapInstance.remove()
        mapInstance = null
      }
    }
  }
}
