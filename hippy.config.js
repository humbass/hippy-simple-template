module.exports = {
  pages: {
    //首页
    index: "pages/index.vue",
  },
  tabBar: {
    color: "#777777",
    selectedColor: "#00b4cb",
    backgroundColor: "#fafafa",
    borderColor: "#dfe1eb",
    list: [
      {
        pagePath: "/pages/demo/router/tabbarItem1.js",
        text: "首页",
        icon: "bmlocal://assets/TabBar_Item1@2x.png",
        selectedIcon: "bmlocal://assets/TabBar_Item1_Selected@2x.png",
        navShow: "true",
        navTitle: "首页"
      },
      {
        pagePath: "/pages/demo/router/tabbarItem2.js",
        text: "联系人",
        icon: "bmlocal://assets/TabBar_Item2@2x.png",
        selectedIcon: "bmlocal://assets/TabBar_Item2_Selected@2x.png",
        navShow: "true",
        navTitle: "联系人"
      },
      {
        pagePath: "/pages/demo/router/tabbarItem3.js",
        text: "个人中心",
        icon: "bmlocal://assets/TabBar_Item3@2x.png",
        selectedIcon: "bmlocal://assets/TabBar_Item3_Selected@2x.png",
        navShow: "true",
        navTitle: "我"
      }
    ]
  }
};
