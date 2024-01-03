export default {
  path: "/minemap",
  redirect: "/minemap/init",
  meta: {
    icon: "informationLine",
    title: "四维图新",
    // showLink: false,
    rank: 10
  },
  children: [
    {
      path: '/minemap/basics',
      name: 'minemap/basics',
      meta: {
        title: '地图基础'
      },
      children: [
        {
          path: "/minemap/basics/init",
          name: "minemap-basics-init",
          component: () => import("@/views/minemap/init.vue"),
          meta: {
            title: "创建地图"
          }
        },
        {
          path: "/minemap/basics/destory",
          name: "minemap-basics-destory",
          component: () => import("@/views/minemap/destory.vue"),
          meta: {
            title: "销毁地图"
          }
        },
      ]
    },
    {
      path: 'minemap/status',
      name: 'minemap-status',
      meta: {
        title: '地图状态'
      },
      children: [
        {
          path: "/minemap/status/getMapCenter",
          name: "minemap-status-getMapCenter",
          component: () => import("@/views/minemap/getMapCenter.vue"),
          meta: {
            title: "获取地图中心点/级别"
          }
        },
        {
          path: "/minemap/status/setMapCenter",
          name: "minemap-status-setMapCenter",
          component: () => import("@/views/minemap/setMapCenter.vue"),
          meta: {
            title: "设置地图中心点/级别"
          }
        },
        {
          path: "/minemap/status/limitMapZoom",
          name: "minemap-status-limitMapZoom",
          component: () => import("@/views/minemap/limitMapZoom.vue"),
          meta: {
            title: "限制地图中心点/级别"
          }
        },
        {
          path: "/minemap/status/bounds",
          name: "minemap-status-bounds",
          component: () => import("@/views/minemap/bounds.vue"),
          meta: {
            title: "根据边界框匹配地图"
          }
        },
        {
          path: "/minemap/status/mapmove",
          name: "minemap-status-mapmove",
          component: () => import("@/views/minemap/mapmove.vue"),
          meta: {
            title: "地图的平移"
          }
        },
        {
          path: "/minemap/status/mapFly",
          name: "minemap-status-mapFly",
          component: () => import("@/views/minemap/mapFly.vue"),
          meta: {
            title: "地图的飞行"
          }
        },
        {
          path: "/minemap/status/mouseStyle",
          name: "minemap-status-mouseStyle",
          component: () => import("@/views/minemap/mouseStyle.vue"),
          meta: {
            title: "鼠标样式"
          }
        },
        {
          path: "/minemap/status/setFontFamily",
          name: "minemap-status-setFontFamily",
          component: () => import("@/views/minemap/setFontFamily.vue"),
          meta: {
            title: "设置本地字体"
          }
        },
        {
          path: "/minemap/status/setZoomRate",
          name: "minemap-status-setZoomRate",
          component: () => import("@/views/minemap/setZoomRate.vue"),
          meta: {
            title: "设置地图缩放速率"
          }
        },
        {
          path: "/minemap/status/setMapDrawInertia",
          name: "minemap-status-setMapDrawInertia",
          component: () => import("@/views/minemap/setMapDrawInertia.vue"),
          meta: {
            title: "设置地图拖拽惯性"
          }
        },

      ]
    },
    {
      path: 'minemap/control',
      name: 'minemap-control',
      meta: {
        title: '地图控件'
      },
      children: [
        {
          path: "/minemap/control/control-add-delete",
          name: "minemap-control-controlAddDelete",
          component: () => import("@/views/minemap/control/controlAddDelete.vue"),
          meta: {
            title: "控件的添加和删除"
          }
        },
        {
          path: "/minemap/control/customControl",
          name: "minemap-control-customControl",
          component: () => import("@/views/minemap/control/customControl.vue"),
          meta: {
            title: "自定义控件"
          }
        },
        {
          path: "/minemap/control/darkControl",
          name: "minemap-control-darkControl",
          component: () => import("@/views/minemap/control/darkControl.vue"),
          meta: {
            title: "深色地图控件"
          }
        },
        {
          path: "/minemap/control/eagleEye",
          name: "minemap-control-eagleEye",
          component: () => import("@/views/minemap/control/eagleEye.vue"),
          meta: {
            title: "地图添加鹰眼"
          }
        },
        {
          path: "/minemap/control/mapScreenShot",
          name: "minemap-control-mapScreenShot",
          component: () => import("@/views/minemap/control/mapScreenShot.vue"),
          meta: {
            title: "地图截屏"
          }
        }
      ]
    },
    {
      path: 'minemap/customStyle',
      name: 'minemap-customStyle',
      meta: {
        title: '自定义地图样式'
      },
      children: [
        {
          path: '/minemap/customStyle/customStyle',
          name: 'minemap-customStyle-customStyle',
          component: () => import('@/views/minemap/customStyle/customStyle.vue'),
          meta: {
            title: '自定义地图样式'
          }
        },
        {
          path: '/minemap/customStyle/baseMapToggle',
          name: 'minemap-customStyle-baseMapToggle',
          component: () => import('@/views/minemap/customStyle/baseMapToggle.vue'),
          meta: {
            title: '底图样式切换'
          }
        }
      ]
    },
    {
      path: 'minemap/overlay',
      name: 'minemap-overlay',
      meta: {
        title: '覆盖物'
      },
      children: [
        {
          path: '/minemap/overlay/pointAddAndDelete',
          name: 'minemap-overlay-pointAddAndDelete',
          component: () => import("@/views/minemap/overlay/pointAddAndDelete.vue"),
          meta: {
            title: '点标记'
          }
        },
        {
          path: '/minemap/overlay/customPointContent',
          name: 'minemap-overlay-customPointContent',
          component: () => import("@/views/minemap/overlay/customPointContent.vue"),
          meta: {
            title: '自定义点标记内容'
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
