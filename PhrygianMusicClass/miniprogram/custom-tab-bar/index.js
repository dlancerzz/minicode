Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "/pages/list/list",
      "iconPath": "/images/list_g.png",
      "selectedIconPath": "/images/list.png",
      "text": "主页"
    },
    {
      "pagePath": "/pages/myclass/myclass",
      "iconPath": "/images/class_g.png",
      "selectedIconPath": "/images/class.png",
      "text": "练习"
    },
    {
      "pagePath": "/pages/setting/setting",
      "iconPath": "/images/setting_g.png",
      "selectedIconPath": "/images/setting.png",
      "text": "设置"
    },
    {
      "pagePath": "/pages/user/user",
      "iconPath": "/images/user_g.png",
      "selectedIconPath": "/images/user.png",
      "text": "个人"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})