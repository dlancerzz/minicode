// miniprogram/pages/parap/parap.js
const app = getApp();
var utilMd5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    md5: 'md5',
    para2: null,
    para3: null,
    kxcategory: '',
    kxtext: '',
    para4: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == "" || !app.globalData.hanziInfo) {
      wx.navigateTo({
        url: '../index/index',
      })
    } else {
      var char = options.id;
      var md5 = utilMd5.md5(char)

      var swjz = null;
      try {
        if (app.globalData.hanziInfo.Paraphrase4) {
          swjz = JSON.parse(app.globalData.hanziInfo.Paraphrase4)
        }
      } catch (error) {
        console.log(error);
      }

      var wlsy = null;
      try {
        if (app.globalData.hanziInfo.Paraphrase2) {
          wlsy = JSON.parse(app.globalData.hanziInfo.Paraphrase2)
        }
      } catch (error) {
        console.log(error);
      }

      var kxzd = null;
      try {
        if (app.globalData.hanziInfo.Paraphrase3) {
          kxzd = JSON.parse(app.globalData.hanziInfo.Paraphrase3)
        }
      } catch (error) {
        console.log(error);
      }

      this.setData({
        md5: md5,
        para2: wlsy,
        para3: kxzd,
        para4: swjz
      })
    }
  },

})