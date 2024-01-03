// todo 封装创建地图的方法

// todo 引入地图及样式文件
import L from 'leaflet';
// todo 封装挂在地图的方法
export const createMap = (elementId, options = {}) => {
  // todo 设置地图的配置默认值
  const defaultOptions = {
    center: new L.LatLng(39.86, 116.45),
    zoom: 10
  }
  const mergeOptions = {...defaultOptions, ...options}
  let map: L.Map = new L.Map(elementId, mergeOptions)
  return map
}

// todo 封装创建图层的方法
export const createTitleLayer = (mapInstance, url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options = {}) => {
  if (!mapInstance) {
    throw new Error('mapInstance is required');
  }

  const defaultOptions = {maxZoom: 13}
  const mergeOptions = {...defaultOptions, ...options}
  let tileLayer = L.tileLayer(url, mergeOptions).addTo(mapInstance)
  return tileLayer
}

