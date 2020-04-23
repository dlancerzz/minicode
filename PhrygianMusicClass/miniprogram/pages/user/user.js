const app = getApp();
const db = wx.cloud.database({
  env: 'phrygianmusicclass-68xyd'
});
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          myUserInfo: {
            _id: app.globalData.openid,
            username: app.globalData.userInfo.nickName
          },
          hasUserInfo: true
        });
      }
    }
  },
  data: {
    userInfo: {},
    myUserInfo: {},
    hasUserInfo: false,
    errmessage: "",
    isTeacher:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      console.log(app.globalData);
      this.setData({
        userInfo: app.globalData.userInfo,
        myUserInfo: {
          _id: app.globalData.openid,
          username: app.globalData.userInfo.nickName
        },
        hasUserInfo: true
      });
    },
    radioChange: function (e){
      this.setData({
        isTeacher:e.detail.value =="teacher"
      });
    },
    bindViewTap:function(e){
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
          isTeacher:this.data.isTeacher,
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
      if(app.globalData.user){
        app.globalData.isTeacher=app.globalData.user.isTeacher
      }
    }
    }
  }
})