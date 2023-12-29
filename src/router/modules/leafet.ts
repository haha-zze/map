export default {
  path: "/leafet",
  redirect: "/leafet/init",
  meta: {
    icon: "informationLine",
    title: "leafet",
    // showLink: false,
    rank: 11
  },
  children: [
    {
      path: "/leafet/init",
      name: "leafet-init",
      component: () => import("@/views/leafet/init.vue"),
      meta: {
        title: "创建地图",
      }
    },
    {
      path: "/leafet/shapeDrawer",
      name: "leafet-shapeDrawer",
      component: () => import("@/views/leafet/shapeDrawer.vue"),
      meta: {
        title: "绘制图形及打点",
      }
    },
    {
      path: "/leafet/mapTileLayer",
      name: "leafet-mapTileLayer",
      component: () => import("@/views/leafet/mapTileLayer.vue"),
      meta: {
        title: "切换地图",
      }
    },
    {
      path: "/leafet/serverDataLoader",
      name: "leafet-serverDataLoader",
      component: () => import("@/views/leafet/serverDataLoader.vue"),
      meta: {
        title: "加载本地(Geojson)数据",
      }
    },
    {
      path: "/leafet/loadIcon",
      name: "leafet-loadIcon",
      component: () => import("@/views/leafet/loadIcon.vue"),
      meta: {
        title: "加载图标",
      }
    },
  ]
} as RouteConfigsTable;
