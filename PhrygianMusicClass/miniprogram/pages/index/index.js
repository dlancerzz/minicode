//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database({
  env: 'phrygianmusicclass-68xyd'
});
Page({
  data: {
    userInfo: {},
    myUserInfo: {},
    hasUserInfo: false,
    errmessage: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    console.log(app.globalData);
    if (app.globalData.openid == "" || app.globalData.userInfo == null) {
      this.setData({
        errmessage: "登录错误请重新登录！"
      })
    } else {
      var user =db.collection("user").doc(app.globalData.openid)
      if (user) {
        user = {
          _id: app.globalData.openid,
          name:app.globalData.userInfo.nickName,
          url:app.globalData.userInfo.avatarUrl,
          isTeacher:false,
          isAdmin:false
        }
        db.collection("user").add({
          // data 字段表示需新增的 JSON 数据
          data: user,
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })
      }
      app.globalData.user=user;
      wx.setStorageSync('user', user)
    }
  },
  onLoad: function () {
    wx.reLaunch({
      url: '/pages/list/list'
    })
    console.log("pageindex")
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    setUserData(this);
  },
  setUserData:function (thisPage) {
    console.log(app.globalData);
    thisPage.setData({
      userInfo: app.globalData.userInfo,
      myUserInfo: {
        _id: app.globalData.openid,
        username: app.globalData.userInfo.nickName
      },
      hasUserInfo: true
    });
  }
})

